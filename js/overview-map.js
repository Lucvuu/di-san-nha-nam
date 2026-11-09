/* Bản đồ toàn cảnh: mọi điểm di sản trên nền ảnh vệ tinh, bảng danh sách nổi, ghim có mã, gom cụm.
 * Tọa độ lấy từ item.map.embedUrl (q=lat,lng) trong data.js, không nhập lần hai.
 * Leaflet chỉ được tải khi người dùng cuộn tới khối bản đồ. */
(function () {
  const LAYERS = [
    { key: 'quoc-gia-dac-biet', label: 'Quốc gia đặc biệt', code: 'ĐB', color: '#8B1E1E' },
    { key: 'quoc-gia', label: 'Cấp quốc gia', code: 'QG', color: '#A16207' },
    { key: 'cap-tinh', label: 'Cấp tỉnh', code: 'T', color: '#1E3A8A' },
    { key: 'phi-vat-the', label: 'Phi vật thể', code: 'PV', color: '#047857' }
  ];
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/';

  // Vị trí ước lượng, chưa đo GPS tại thực địa. Chỉ đường Google của Đình Hả vẫn tra theo tên nên vẫn đúng chỗ.
  // Đình Hả: đặt trên ĐT294 thuộc xã Tân Trung cũ. Đền Cả Trọng: đặt đối xứng với đền Gốc Khế qua đồi Phủ.
  const HA = [21.4421, 106.123];
  const OVERRIDE = { 'vat-the-1': HA, 'phi-vat-the-1': HA, 'phi-vat-the-4': HA };
  const ESTIMATED = new Set(['vat-the-1', 'phi-vat-the-1', 'phi-vat-the-4', 'vat-the-10']);

  const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => (typeof removeVietnameseTones === 'function' ? removeVietnameseTones(s) : String(s).toLowerCase());

  function coordsOf(item) {
    const m = ((item.map && item.map.embedUrl) || '').match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    return m ? [+m[1], +m[2]] : null;
  }

  function load(tag, attrs) {
    return new Promise((resolve, reject) => {
      const el = document.createElement(tag);
      Object.assign(el, attrs, { crossOrigin: 'anonymous', onload: resolve, onerror: reject });
      document.head.appendChild(el);
    });
  }

  function popupHtml(e) {
    const it = e.it, dir = it.map && it.map.directionsUrl;
    return (it.thumbnail ? `<img class="ovm-pop-img" src="${esc(it.thumbnail)}" alt="" loading="lazy">` : '') +
      `<div class="ovm-pop-body">
        <span class="ovm-code" style="--c:${e.layer.color}">${e.code}</span>
        <strong class="ovm-pop-title">${esc(e.title)}</strong>
        <span class="ovm-pop-meta">${esc(it.rankName || it.categoryName)}</span>
        ${it.address ? `<span class="ovm-pop-addr">${esc(it.address)}</span>` : ''}
        ${e.est ? '<span class="ovm-pop-warn">Vị trí ước lượng, chưa đo GPS tại thực địa.</span>' : ''}
        <span class="ovm-pop-actions">
          <button type="button" class="ovm-pop-btn" data-id="${esc(it.id)}">Xem hồ sơ</button>
          ${dir ? `<a class="ovm-pop-link" href="${esc(dir)}" target="_blank" rel="noopener noreferrer">Chỉ đường ↗</a>` : ''}
        </span>
      </div>`;
  }

  function build() {
    const mapEl = document.getElementById('ovm-map');
    const list = document.getElementById('ovm-list');
    const search = document.getElementById('ovm-search');
    const countEl = document.getElementById('ovm-count');
    const wide = matchMedia('(min-width: 1024px)');

    const counters = {}, entries = [], missing = [];
    [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA].forEach(it => {
      const c = OVERRIDE[it.id] || coordsOf(it);
      if (!c) { missing.push(it); return; }
      const layer = LAYERS.find(l => l.key === (it.category === 'phi-vat-the' ? 'phi-vat-the' : it.rank)) || LAYERS[3];
      const code = layer.code + (counters[layer.key] = (counters[layer.key] || 0) + 1);
      const title = it.shortTitle || it.title;
      entries.push({ it, c, layer, code, title, est: ESTIMATED.has(it.id), hay: norm([title, it.title, it.address, code].join(' ')) });
    });

    const satellite = L.layerGroup([
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, maxNativeZoom: 18, attribution: 'Ảnh: &copy; Esri, Maxar, Earthstar Geographics'
      }),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19, maxNativeZoom: 18
      })
    ]);
    const streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: false, layers: [satellite] });
    L.control.zoom({ position: 'topright', zoomInTitle: 'Phóng to', zoomOutTitle: 'Thu nhỏ' }).addTo(map);
    L.control.layers({ 'Ảnh vệ tinh': satellite, 'Bản đồ đường': streets }, null, { position: 'topright' }).addTo(map);
    L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

    const cluster = L.markerClusterGroup({
      maxClusterRadius: 42,
      showCoverageOnHover: false,
      iconCreateFunction: cl => L.divIcon({
        className: '', iconSize: [54, 54],
        html: `<span class="ovm-cluster"><b>${cl.getChildCount()}</b>hồ sơ</span>`
      })
    }).addTo(map);

    let activeLi = null;
    entries.forEach(e => {
      e.marker = L.marker(e.c, {
        title: e.title, alt: e.title, keyboard: true,
        icon: L.divIcon({
          className: '', iconSize: [44, 28], iconAnchor: [22, 14], popupAnchor: [0, -12],
          html: `<span class="ovm-pin${e.est ? ' ovm-pin--est' : ''}" style="--c:${e.layer.color}">${e.code}</span>`
        })
      }).bindPopup(popupHtml(e), { maxWidth: 260, minWidth: 240, className: 'ovm-popup' });

      e.li = document.createElement('li');
      e.li.innerHTML = `<button type="button" class="ovm-card">
          <span class="ovm-code" style="--c:${e.layer.color}">${e.code}</span>
          <span class="ovm-card-body">
            <strong>${esc(e.title)}</strong>
            <span>${esc(e.it.rankName || e.it.categoryName)}${e.it.address ? ' · ' + esc(e.it.address.split(',')[0]) : ''}</span>
            <span class="ovm-card-coord">${e.c[0].toFixed(5)}, ${e.c[1].toFixed(5)}${e.est ? ' · ước lượng' : ''}</span>
          </span>
        </button>`;
      e.li.firstChild.addEventListener('click', () => {
        if (!wide.matches) mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cluster.zoomToShowLayer(e.marker, () => e.marker.openPopup());
      });
      e.marker.on('popupopen', () => {
        if (activeLi) activeLi.classList.remove('is-active');
        activeLi = e.li;
        e.li.classList.add('is-active');
        list.scrollTo({ top: e.li.offsetTop - list.offsetTop - 8, behavior: 'smooth' });
      });
      list.appendChild(e.li);
    });

    const active = new Set(LAYERS.map(l => l.key));
    function apply() {
      const q = norm(search.value.trim());
      const shown = entries.filter(e => active.has(e.layer.key) && (!q || e.hay.includes(q)));
      cluster.clearLayers();
      cluster.addLayers(shown.map(e => e.marker));
      entries.forEach(e => { e.li.hidden = !shown.includes(e); });
      countEl.textContent = `${String(shown.length).padStart(2, '0')} / ${entries.length} hồ sơ trên bản đồ`;
    }

    const fs = document.getElementById('ovm-layers');
    LAYERS.forEach(l => {
      const label = document.createElement('label');
      label.className = 'ovm-chip';
      label.style.setProperty('--c', l.color);
      label.innerHTML = `<input type="checkbox" checked><span class="ovm-swatch"></span>${l.label}<span class="ovm-chip-n">${entries.filter(e => e.layer === l).length}</span>`;
      label.firstChild.addEventListener('change', ev => { ev.target.checked ? active.add(l.key) : active.delete(l.key); apply(); });
      fs.appendChild(label);
    });
    search.addEventListener('input', apply);
    apply();

    map.fitBounds(L.latLngBounds(entries.map(e => e.c)), {
      paddingTopLeft: [wide.matches ? 400 : 24, 24], paddingBottomRight: [24, 24]
    });

    mapEl.addEventListener('click', ev => {
      const btn = ev.target.closest('.ovm-pop-btn');
      if (btn && typeof openDetailModal === 'function') openDetailModal(btn.dataset.id);
    });

    const parts = ['Ghim viền đứt nét: vị trí ước lượng, chưa đo GPS tại thực địa.'];
    if (missing.length) parts.push('Chưa có tọa độ: ' + missing.map(m => m.shortTitle || m.title).join('; ') + '.');
    document.getElementById('ovm-note').textContent = parts.join(' ');
  }

  function start() {
    const mapEl = document.getElementById('ovm-map');
    if (!mapEl || typeof TANGIBLE_HERITAGE_DATA === 'undefined') return;
    Promise.all([
      load('link', { rel: 'stylesheet', href: CDN + 'leaflet/1.9.4/leaflet.min.css', integrity: 'sha384-c6Rcwz4e4CITMbu/NBmnNS8yN2sC3cUElMEMfP3vqqKFp7GOYaaBBCqmaWBjmkjb' }),
      load('link', { rel: 'stylesheet', href: CDN + 'leaflet.markercluster/1.5.3/MarkerCluster.css', integrity: 'sha384-pmjIAcz2bAn0xukfxADbZIb3t8oRT9Sv0rvO+BR5Csr6Dhqq+nZs59P0pPKQJkEV' }),
      load('script', { src: CDN + 'leaflet/1.9.4/leaflet.min.js', integrity: 'sha384-NElt3Op+9NBMCYaef5HxeJmU4Xeard/Lku8ek6hoPTvYkQPh3zLIrJP7KiRocsxO' })
        .then(() => load('script', { src: CDN + 'leaflet.markercluster/1.5.3/leaflet.markercluster.js', integrity: 'sha384-eXVCORTRlv4FUUgS/xmOyr66XBVraen8ATNLMESp92FKXLAMiKkerixTiBvXriZr' }))
    ])
      .then(build)
      .catch(() => {
        mapEl.innerHTML = '<p class="ovm-fail">Không tải được bản đồ nền (mạng chậm hoặc bị chặn). Danh sách di sản ở mục <a href="#heritage-explorer">Khám phá di sản</a> vẫn xem được đầy đủ.</p>';
      });
  }

  const target = document.getElementById('overview-map-block');
  if (!target) return;
  if (!('IntersectionObserver' in window)) { start(); return; }
  const io = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { io.disconnect(); start(); }
  }, { rootMargin: '300px' });
  io.observe(target);
})();
