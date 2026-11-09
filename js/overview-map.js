/* Bản đồ toàn cảnh: vẽ mọi điểm di sản trên một bản đồ Leaflet, bật/tắt theo lớp xếp hạng.
 * Tọa độ lấy lại từ item.map.embedUrl (q=lat,lng) trong data.js, không nhập lần hai.
 * Leaflet chỉ được tải khi người dùng cuộn tới khối bản đồ. */
(function () {
  const LAYERS = [
    { key: 'quoc-gia-dac-biet', label: 'Quốc gia đặc biệt', color: '#8B1E1E' },
    { key: 'quoc-gia', label: 'Cấp quốc gia', color: '#B7791F' },
    { key: 'cap-tinh', label: 'Cấp tỉnh', color: '#1E3A8A' },
    { key: 'phi-vat-the', label: 'Di sản phi vật thể', color: '#047857' }
  ];
  const LEAFLET = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
  // Hai hồ sơ cùng một địa điểm thật: dùng chung tọa độ là đúng, không cảnh báo.
  // Đồi Phủ (vat-the-5) chính là khu Nghĩa địa Pháp (vat-the-9).
  const SAME_PLACE = [['vat-the-5', 'vat-the-9']];

  function coordsOf(item) {
    const m = ((item.map && item.map.embedUrl) || '').match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    return m ? [+m[1], +m[2]] : null;
  }

  function esc(s) {
    return String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function load(tag, attrs) {
    return new Promise((resolve, reject) => {
      const el = document.createElement(tag);
      Object.assign(el, attrs, { crossOrigin: 'anonymous', onload: resolve, onerror: reject });
      document.head.appendChild(el);
    });
  }

  function build() {
    const mapEl = document.getElementById('ovm-map');
    const note = document.getElementById('ovm-note');
    const items = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];
    const layerOf = it => (it.category === 'phi-vat-the' ? 'phi-vat-the' : it.rank);

    const placed = [], missing = [], seen = {};
    items.forEach(it => {
      const c = coordsOf(it);
      if (!c) { missing.push(it); return; }
      const k = c.join(',');
      (seen[k] = seen[k] || []).push(it);
      placed.push({ it, c, k });
    });

    // Di tích vật thể khác nhau mà trùng hệt tọa độ: gần như chắc là tọa độ mượn, cần đo lại.
    const suspect = new Set();
    Object.values(seen).forEach(group => {
      const tangible = group.filter(g => g.category === 'vat-the');
      const sameSite = SAME_PLACE.some(p => tangible.every(g => p.includes(g.id)));
      if (tangible.length > 1 && !sameSite) tangible.forEach(g => suspect.add(g.id));
    });

    const map = L.map(mapEl, { scrollWheelZoom: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const groups = {};
    LAYERS.forEach(l => { groups[l.key] = L.layerGroup().addTo(map); });

    const used = {};
    placed.forEach(({ it, c, k }) => {
      const layer = LAYERS.find(l => l.key === layerOf(it)) || LAYERS[3];
      // Điểm trùng tọa độ: xếp vòng quanh tâm ~20 m để bấm được từng điểm.
      const n = seen[k].length, i = (used[k] = (used[k] || 0) + 1) - 1;
      const pos = n > 1 ? [c[0] + 0.00018 * Math.cos(2 * Math.PI * i / n), c[1] + 0.00018 * Math.sin(2 * Math.PI * i / n)] : c;
      const title = it.shortTitle || it.title;
      const icon = L.divIcon({
        className: '',
        html: `<span class="ovm-dot${suspect.has(it.id) ? ' ovm-dot--suspect' : ''}" style="background:${layer.color}"></span>`,
        iconSize: [18, 18], iconAnchor: [9, 9]
      });
      const warn = suspect.has(it.id) ? '<p class="ovm-pop-warn">Tọa độ đang trùng với di tích khác, vị trí chỉ gần đúng.</p>' : '';
      L.marker(pos, { icon, title, alt: title, keyboard: true })
        .bindPopup(`<strong>${esc(title)}</strong><br><span>${esc(it.rankName || it.categoryName)}</span>` +
          (it.address ? `<br><small>${esc(it.address)}</small>` : '') + warn +
          `<br><button type="button" class="ovm-pop-btn" data-id="${esc(it.id)}">Xem hồ sơ</button>`)
        .addTo(groups[layer.key]);
    });

    map.fitBounds(L.latLngBounds(placed.map(p => p.c)), { padding: [24, 24] });

    mapEl.addEventListener('click', e => {
      const btn = e.target.closest('.ovm-pop-btn');
      if (btn && typeof openDetailModal === 'function') openDetailModal(btn.dataset.id);
    });

    const fs = document.getElementById('ovm-layers');
    LAYERS.forEach(l => {
      const count = placed.filter(p => (layerOf(p.it) || 'phi-vat-the') === l.key).length;
      const label = document.createElement('label');
      label.className = 'ovm-chip';
      label.innerHTML = `<input type="checkbox" checked><span class="ovm-swatch" style="background:${l.color}"></span>${l.label} (${count})`;
      label.firstChild.addEventListener('change', e => e.target.checked ? groups[l.key].addTo(map) : groups[l.key].remove());
      fs.appendChild(label);
    });

    const parts = [];
    if (missing.length) parts.push('Chưa có tọa độ đo đạc, chưa hiện trên bản đồ: ' + missing.map(m => m.shortTitle || m.title).join('; ') + '.');
    if (suspect.size) parts.push('Viền đứt nét: di tích đang dùng chung tọa độ với di tích khác, cần đo lại tại thực địa.');
    note.textContent = parts.join(' ');
  }

  function start() {
    const mapEl = document.getElementById('ovm-map');
    if (!mapEl || typeof TANGIBLE_HERITAGE_DATA === 'undefined') return;
    load('link', { rel: 'stylesheet', href: LEAFLET + 'leaflet.min.css', integrity: 'sha384-c6Rcwz4e4CITMbu/NBmnNS8yN2sC3cUElMEMfP3vqqKFp7GOYaaBBCqmaWBjmkjb' })
      .then(() => load('script', { src: LEAFLET + 'leaflet.min.js', integrity: 'sha384-NElt3Op+9NBMCYaef5HxeJmU4Xeard/Lku8ek6hoPTvYkQPh3zLIrJP7KiRocsxO' }))
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
