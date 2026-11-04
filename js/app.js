
/**
 * Quản lý khóa cuộn trang nền và bù trừ thanh cuộn (Tránh giật giật ngang khi mở modal/lightbox)
 */
let openModalsCount = 0;

function lockScroll() {
  openModalsCount++;
  if (openModalsCount === 1) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      const fixedHeader = document.querySelector('header');
      if (fixedHeader) fixedHeader.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }
}

function unlockScroll(force = false) {
  if (force) {
    openModalsCount = 0;
  } else {
    openModalsCount = Math.max(0, openModalsCount - 1);
  }
  if (openModalsCount === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    const fixedHeader = document.querySelector('header');
    if (fixedHeader) fixedHeader.style.paddingRight = '';
    document.body.classList.remove('modal-open');
  }
}

/**
 * ====================================================================
 * DI SẢN VĂN HÓA XÃ NHÃ NAM - XỬ LÝ ỨNG DỤNG CHÍNH (APPLICATION LOGIC)
 * Xã Nhã Nam, thành phố Bắc Ninh
 * Dự án nghiên cứu khoa học của học sinh THPT
 * ====================================================================
 */

// Phiếu góp ý Google Biểu mẫu: link báo lỗi từng di tích tự điền sẵn tên di tích.
// entry.299450819 = câu "Bạn đã xem những di tích nào?" (giá trị phải trùng đúng lựa chọn trong form),
// entry.1121841917 = câu "Chỗ nào trong nội dung chưa chính xác?".
const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd8dhq3sS6yTca3nX9z0V0CJdj3SkRFUXYmcUsmLCJvDf0rCA/viewform';
const FEEDBACK_FORM_OPTIONS = {
  'vat-the-1': 'Khu di tích đình – chùa Hả', 'vat-the-2': 'Chùa Tứ Giáp', 'vat-the-3': 'Chùa Đồng Điều',
  'vat-the-4': 'Đền Gốc Khế', 'vat-the-5': 'Đồi Phủ', 'vat-the-6': 'Đình làng Chuông',
  'vat-the-7': 'Chùa Nam Thiên (chùa Phố)', 'vat-the-8': 'Đền Đề Truật', 'vat-the-9': 'Nghĩa địa Pháp',
  'vat-the-10': 'Đền thờ Cả Trọng', 'vat-the-11': 'Đình Dương Lâm', 'vat-the-12': 'Đình Cầu Thượng',
  'vat-the-13': 'Đình Sậy', 'vat-the-14': 'Đình Nẻo', 'vat-the-15': 'Chùa Dương Sơn', 'vat-the-16': 'Đình làng Sặt',
  'phi-vat-the-1': 'Lễ hội khởi nghĩa Yên Thế', 'phi-vat-the-2': 'Hát chèo truyền thống',
  'phi-vat-the-3': 'Nghề làm bánh khảo, kẹo lạc', 'phi-vat-the-4': 'Tập quán tưởng niệm Lương Văn Nắm và Hoàng Hoa Thám',
  'phi-vat-the-5': 'Trò chơi dân gian và võ cổ truyền', 'phi-vat-the-6': 'Làng nói phét Dương Sơn',
};
function feedbackUrl(item) {
  const p = new URLSearchParams({ usp: 'pp_url', 'entry.1121841917': `[${item.title}] ` });
  if (FEEDBACK_FORM_OPTIONS[item.id]) p.set('entry.299450819', FEEDBACK_FORM_OPTIONS[item.id]);
  return `${FEEDBACK_FORM_URL}?${p}`;
}

// Trạng thái ứng dụng (Application State)
const state = {
  currentCategory: 'all', // 'all' | 'vat-the' | 'phi-vat-the'
  searchQuery: '',
  activeRouteFilter: null,
  allItems: [...TANGIBLE_HERITAGE_DATA,...INTANGIBLE_HERITAGE_DATA],
  filteredItems: [],
  selectedItem: null,
  lightboxImages: [],
  lightboxIndex: 0,
  favorites: JSON.parse(localStorage.getItem('nhanam_heritage_favorites') || '[]'),
  quizExam: null,
  isAudioPlaying: false,
  isAudioGuidePlaying: false
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const tangible = (typeof TANGIBLE_HERITAGE_DATA!== 'undefined' && Array.isArray(TANGIBLE_HERITAGE_DATA))? TANGIBLE_HERITAGE_DATA: [];
  const intangible = (typeof INTANGIBLE_HERITAGE_DATA!== 'undefined' && Array.isArray(INTANGIBLE_HERITAGE_DATA))? INTANGIBLE_HERITAGE_DATA: [];
  state.allItems = [...tangible,...intangible];

  try { renderConfigElements(); } catch (e) { console.warn('renderConfigElements error:', e); }
  try { renderQuickSearchTags(); } catch (e) { console.warn('renderQuickSearchTags error:', e); }
  try { updateCategoryCounts(); } catch (e) { console.warn('updateCategoryCounts error:', e); }
  try { applyFiltersAndRender(); } catch (e) { console.warn('applyFiltersAndRender error:', e); }
  try { setupEventListeners(); } catch (e) { console.warn('setupEventListeners error:', e); }
  try { renderQuiz(); } catch (e) { console.warn('renderQuiz error:', e); }
  try { checkUrlHash(); } catch (e) { console.warn('checkUrlHash error:', e); }
  // Bấm link #item=… khi trang đã mở: trình duyệt chỉ đổi phần sau dấu #, không tải lại trang
  window.addEventListener('hashchange', checkUrlHash);
  try { initAudioPlayerSettings(); } catch (e) { console.warn('initAudioPlayerSettings error:', e); }
  try { initVisitorCounter(); } catch (e) { console.warn('initVisitorCounter error:', e); }
}

let currentTrackIndex = 0;

function getActivePlaylist() {
  return (typeof MUSIC_PLAYLIST !== 'undefined' && MUSIC_PLAYLIST.length) ? MUSIC_PLAYLIST : [
    {
      id: "nha-nam-trong-toi",
      title: "Nhã Nam trong tôi",
      artist: "Ca khúc truyền thống quê hương",
      src: "./assets/audio/nha-nam-trong-toi.mp3"
    }
  ];
}

/**
 * Khởi tạo âm lượng; trang chỉ có một ca khúc nên phát lặp lại
 */
function initAudioPlayerSettings() {
  const bgMusic = document.getElementById('bg-music');
  const playlist = getActivePlaylist();
  
  if (bgMusic) {
    bgMusic.volume = 0.5; // Thiết lập âm lượng mặc định 50%
    const currentTrack = playlist[currentTrackIndex];
    if (currentTrack && (!bgMusic.src ||!bgMusic.src.includes(currentTrack.id))) {
      bgMusic.src = currentTrack.src;
    }

    bgMusic.loop = playlist.length === 1;
  }

  updateMusicPlayerUI();
}

/**
 * Hiển thị các thông tin cấu hình từ SITE_CONFIG lên giao diện
 */
function renderConfigElements() {
  const fbGroupNoteEls = document.querySelectorAll('.facebook-moderation-badge');
  fbGroupNoteEls.forEach(el => el.textContent = SITE_CONFIG.facebookGroupStatusNote);
}

/**
 * Hiển thị các thẻ gợi ý tìm kiếm nhanh dưới thanh tìm kiếm
 */
function renderQuickSearchTags() {
  const container = document.getElementById('quick-search-tags');
  if (!container) return;

  const defaultTags = [
    "Đình – chùa Hả",
    "Chùa Tứ Giáp",
    "Thôn Đồng Điều",
    "Đền Gốc Khế",
    "Đồi Phủ Nhã Nam",
    "Đình Nhã Nam",
    "Chùa Nam Thiên",
    "Đền Đề Truật",
    "Đề Nắm",
    "Khởi nghĩa Yên Thế",
    "Hát chèo",
    "Bánh khảo",
    "Kẹo lạc"
  ];

  const tags = (typeof QUICK_SEARCH_TAGS!== 'undefined' && Array.isArray(QUICK_SEARCH_TAGS) && QUICK_SEARCH_TAGS.length > 0)
? QUICK_SEARCH_TAGS
: defaultTags;

  container.innerHTML = tags.map(tag => `
    <button type="button" class="quick-tag ${state.searchQuery === tag ? 'is-active' : ''}" data-tag="${tag}">${tag}</button>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      const searchInput = document.getElementById('search-input');
      const clearBtn = document.getElementById('clear-search-btn');
      if (searchInput) {
        if (state.searchQuery === tag) {
          searchInput.value = '';
          state.searchQuery = '';
          if (clearBtn) clearBtn.classList.add('hidden');
        } else {
          searchInput.value = tag;
          state.searchQuery = tag;
          if (clearBtn) clearBtn.classList.remove('hidden');
        }
        applyFiltersAndRender();
        scrollToSection('heritage-explorer');
      }
    });
  });
}

/**
 * Cập nhật số lượng di sản trên các Tab & Trang chủ
 */
function updateCategoryCounts() {
  const totalCount = state.allItems.length;
  const vatTheCount = state.allItems.filter(i => i.category === 'vat-the').length;
  const phiVatTheCount = state.allItems.filter(i => i.category === 'phi-vat-the').length;
  const qgDacBietCount = state.allItems.filter(i => i.rank === 'quoc-gia-dac-biet' || (i.category === 'vat-the' && i.badge && i.badge.includes('đặc biệt'))).length;
  const qgCount = state.allItems.filter(i => i.rank === 'quoc-gia' || (i.category === 'vat-the' && i.badge && i.badge.includes('cấp quốc gia') &&!i.badge.includes('đặc biệt'))).length;
  const capTinhCount = state.allItems.filter(i => i.rank === 'cap-tinh' || (i.category === 'vat-the' && i.badge && i.badge.includes('cấp tỉnh'))).length;

  const countAllEl = document.getElementById('count-all');
  if (countAllEl) countAllEl.textContent = totalCount;

  const countVatTheEl = document.getElementById('count-vat-the');
  if (countVatTheEl) countVatTheEl.textContent = vatTheCount;

  const countPhiVatTheEl = document.getElementById('count-phi-vat-the');
  if (countPhiVatTheEl) countPhiVatTheEl.textContent = phiVatTheCount < 10? '0' + phiVatTheCount: phiVatTheCount;

  const countQgDacBietEl = document.getElementById('count-qg-dac-biet');
  if (countQgDacBietEl) countQgDacBietEl.textContent = qgDacBietCount < 10? '0' + qgDacBietCount: qgDacBietCount;

  const countQgEl = document.getElementById('count-quoc-gia');
  if (countQgEl) countQgEl.textContent = qgCount < 10? '0' + qgCount: qgCount;

  const countCapTinhEl = document.getElementById('count-cap-tinh');
  if (countCapTinhEl) countCapTinhEl.textContent = capTinhCount < 10? '0' + capTinhCount: capTinhCount;
}

/**
 * Lọc danh sách và hiển thị thẻ di sản
 */
function applyFiltersAndRender() {
  let items = state.allItems;

  // Lọc theo danh mục hoặc cấp xếp hạng
  if (state.currentCategory === 'vat-the') {
    items = items.filter(item => item.category === 'vat-the');
  } else if (state.currentCategory === 'quoc-gia-dac-biet') {
    items = items.filter(item => item.rank === 'quoc-gia-dac-biet' || (item.category === 'vat-the' && item.badge && item.badge.includes('đặc biệt')));
  } else if (state.currentCategory === 'quoc-gia') {
    items = items.filter(item => item.rank === 'quoc-gia' || (item.category === 'vat-the' && item.badge && item.badge.includes('cấp quốc gia') &&!item.badge.includes('đặc biệt')));
  } else if (state.currentCategory === 'cap-tinh') {
    items = items.filter(item => item.rank === 'cap-tinh' || (item.category === 'vat-the' && item.badge && item.badge.includes('cấp tỉnh')));
  } else if (state.currentCategory === 'phi-vat-the') {
    items = items.filter(item => item.category === 'phi-vat-the');
  }

  // Lọc theo tuyến hành trình (Interactive Heritage Route Explorer)
  if (state.activeRouteFilter && typeof HERITAGE_ROUTES!== 'undefined') {
    const route = HERITAGE_ROUTES.find(r => r.id === state.activeRouteFilter);
    if (route && Array.isArray(route.relicIds)) {
      items = items.filter(item => route.relicIds.includes(item.id));
    }
  }

  // Lọc theo từ khóa tìm kiếm (hỗ trợ có dấu và không dấu tiếng Việt)
  if (state.searchQuery && state.searchQuery.trim()) {
    items = items.filter(item => matchesSearchQuery(item, state.searchQuery));
    // Mục có tên chứa đúng cụm từ khóa lên đầu
    const norm = t => ' ' + removeVietnameseTones(t || '').replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
    const q = norm(state.searchQuery);
    const score = item => (norm(item.title).includes(q) || norm(item.shortTitle).includes(q)) ? 0 : 1;
    items = items.map((item, i) => [score(item), i, item]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]);
  }

  state.filteredItems = items;
  document.querySelectorAll('#quick-search-tags .quick-tag').forEach(btn => {
    btn.classList.toggle('is-active', Boolean(state.searchQuery) && btn.getAttribute('data-tag') === state.searchQuery);
  });
  renderHeritageGrid(items);
  updateResultsSummary(items.length);
}

/**
 * Cập nhật dòng thông báo số lượng kết quả tìm thấy
 */
function updateResultsSummary(count) {
  const summaryEl = document.getElementById('search-results-summary');
  if (!summaryEl) return;

  if (state.activeRouteFilter && typeof HERITAGE_ROUTES!== 'undefined') {
    const route = HERITAGE_ROUTES.find(r => r.id === state.activeRouteFilter);
    const routeName = route? `${route.name} (${route.title})`: 'Tuyến di sản';
    summaryEl.innerHTML = `<div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#8B1E1E]/30 text-xs sm:text-sm text-[#2A2521]">
      <div class="flex items-center gap-2">
                <span>Đang lọc hiển thị <strong class="text-[#8B1E1E] font-bold">${count}</strong> di tích thuộc <strong class="text-[#8B1E1E]">${escapeHtml(routeName)}</strong></span>
      </div>
      <button type="button" onclick="clearRouteFilter()" class="text-xs text-[#8B1E1E] underline hover:text-[#6F1515] font-semibold cursor-pointer">
        ${ic('x')} Bỏ lọc tuyến để xem tất cả di sản
      </button>
    </div>`;
    summaryEl.classList.remove('hidden');
    return;
  }

  if (state.searchQuery.trim()) {
    summaryEl.innerHTML = `Tìm thấy <strong class="text-[#8B1E1E] font-bold">${count}</strong> di sản phù hợp với từ khóa "<span class="italic">${escapeHtml(state.searchQuery)}</span>"`;
    summaryEl.classList.remove('hidden');
  } else {
    summaryEl.classList.add('hidden');
  }
}

/**
 * Hiển thị lưới thẻ di sản
 */
function renderHeritageGrid(items) {
  const gridContainer = document.getElementById('heritage-grid');
  const emptyState = document.getElementById('empty-search-state');
  if (!gridContainer) return;

  if (items.length === 0) {
    gridContainer.innerHTML = '';
    if (emptyState) { emptyState.hidden = false; emptyState.classList.remove('hidden'); }
    return;
  }

  if (emptyState) { emptyState.hidden = true; emptyState.classList.add('hidden'); }

  gridContainer.innerHTML = items.map(item => {
    const isVatThe = item.category === 'vat-the';
    const isFav = state.favorites.includes(item.id);
    const title = escapeHtml(item.title);
    // Nhãn xếp hạng kiểu chữ báo: "Quốc gia đặc biệt · 2012" / "Phi vật thể · Lễ hội truyền thống"
    const rankYear = isVatThe && item.decision ? (item.decision.match(/\d{4}/g) || []).pop() : '';
    const rankLabel = isVatThe
      ? [String(item.badge || '').replace(/^Di tích\s+/i, ''), rankYear].filter(Boolean).join(' · ')
      : ['Phi vật thể', item.badge].filter(Boolean).join(' · ');
    const openAudio = `event.stopPropagation(); openDetailModal('${item.id}'); setTimeout(() => playModalRealAudio(), 250);`;
    const openVideo = `event.stopPropagation(); openDetailModal('${item.id}'); setTimeout(() => document.getElementById('modal-video-section')?.scrollIntoView({behavior: 'smooth'}), 350);`;

    return `
      <article class="heritage-card rounded-lg overflow-hidden flex flex-col h-full">
        <div class="relative h-52 sm:h-56 overflow-hidden bg-[#EADECF] cursor-pointer" onclick="openDetailModal('${item.id}')">
          ${item.thumbnail ? `
            <img src="${cardThumb(item.thumbnail)}" alt="${title}" loading="lazy" decoding="async" width="720" height="405"
              style="object-position: ${item.imagePosition || 'center 30%'};" class="w-full h-full object-cover card-thumb-img"
              onerror="if (!this.dataset.full) { this.dataset.full = 1; this.src = '${item.thumbnail}'; } else handleImageError(this)" />
            ${item.hasRealPhoto ? '' : '<span class="absolute left-3 bottom-3 rounded-md bg-black/75 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-white shadow-xs">Ảnh minh họa</span>'}
          ` : `
            <div class="photo-pending-frame w-full h-full relative flex items-end p-4 overflow-hidden">
              <img src="./assets/images/share/trong-dong-360.webp" alt="" aria-hidden="true" loading="lazy" decoding="async"
                class="absolute -right-10 -bottom-10 w-44 h-44 opacity-[0.12] pointer-events-none select-none mix-blend-multiply" />
              <span class="relative eyebrow eyebrow-muted">Ảnh tư liệu đang được cập nhật</span>
            </div>
          `}
          <button type="button"
            onclick="event.stopPropagation(); toggleFavorite('${item.id}');"
            title="${isFav ? 'Bỏ lưu' : 'Lưu lại di tích này'}"
            aria-label="${isFav ? 'Bỏ lưu ' + title : 'Lưu lại ' + title}"
            class="absolute top-2.5 right-2.5 w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-[#FFFCF7]/90 hover:bg-[#FFFCF7] border border-[rgba(139,30,30,0.15)] flex items-center justify-center text-[#7A5C3E] hover:text-[#8B1E1E] transition-all shadow-xs cursor-pointer">
            <svg width="17" height="17" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" fill="${isFav ? 'currentColor' : 'none'}" class="${isFav ? 'text-[#8B1E1E]' : ''}" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <p class="eyebrow mb-2">${escapeHtml(rankLabel)}</p>
          <h3 class="font-heritage-serif font-bold text-lg leading-snug text-[#2A2521] mb-2" style="text-wrap: balance;">
            <button type="button" onclick="openDetailModal('${item.id}')" class="text-left hover:text-[#8B1E1E] transition-colors">${title}</button>
          </h3>
          <p class="text-sm text-[#5C5248] leading-relaxed line-clamp-2 mb-4">${escapeHtml(item.overview)}</p>

          <div class="mt-auto pt-3 border-t border-[rgba(44,30,24,0.1)] flex items-center justify-between gap-2">
            <div class="card-media flex flex-wrap items-center gap-1.5 text-[#7A5C3E]">
              ${item.audioFile ? `<button type="button" onclick="${openAudio}" title="Nghe ngay bản ghi âm thuyết minh" class="card-media-pill card-media-pill--audio hover:bg-[#8B1E1E] hover:text-white transition-colors cursor-pointer">${ic('volume', 'w-3.5 h-3.5')}<span>Thuyết minh</span></button>` : ''}
              ${item.video ? `<button type="button" onclick="${openVideo}" title="Xem video tư liệu" class="card-media-pill card-media-pill--video hover:border-[#8B6914] transition-colors cursor-pointer">${ic('video', 'w-3.5 h-3.5')}<span>Video</span></button>` : ''}
              ${item.docFile ? `<span title="Có hồ sơ tư liệu Word (.docx)" class="card-media-pill">${ic('file-text', 'w-3.5 h-3.5')}<span>Tư liệu</span></span>` : ''}
              <a href="${item.map.directionsUrl}" target="_blank" rel="noopener noreferrer" title="Chỉ đường trên Google Maps" aria-label="Chỉ đường đến ${title}" class="p-1 text-[#7A5C3E] hover:text-[#8B1E1E] transition-colors">${ic('map', 'w-4 h-4')}</a>
            </div>
            <button type="button" onclick="openDetailModal('${item.id}')" class="text-xs font-bold text-[#8B1E1E] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer">Xem hồ sơ →</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * ====================================================================
 * CHI TIẾT DI TÍCH / DI SẢN (DETAIL MODAL)
 * Bao gồm chính xác 5 mục bắt buộc:
 * 1. Tên di tích / di sản
 * 2. Địa chỉ / Phạm vi
 * 3. Nội dung về di tích / di sản
 * 4. Chỉ dẫn đi đến đó bằng Google Map (iframe + button)
 * 5. Thư viện ảnh di tích / di sản (kèm lightbox preview)
 * KÈM CÔNG CỤ TƯƠNG TÁC CAO CẤP:
 * - Thuyết minh tự động (Audio Guide)
 * - Sao chép liên kết chia sẻ di tích
 * ====================================================================
 */
/** Một khối video: tệp mp4 trên trang (localSrc) hoặc YouTube (embedUrl). */
function renderVideoBlock(v) {
  return `
        ${v.localSrc ? `
        <div class="relative w-full rounded-xl overflow-hidden bg-black">
          <video
            controls
            preload="metadata"
            class="w-full max-h-[460px] mx-auto"
            onplay="pauseModalMedia('video')">
            <source src="${v.localSrc}" type="video/mp4">
            Trình duyệt của bạn không hỗ trợ phát video trực tiếp.
          </video>
        </div>
        <p class="mt-2 text-xs text-[#5C5248]">${escapeHtml(v.title)}</p>
        ` : `
        <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src="${v.embedUrl}${v.embedUrl.includes('?') ? '&' : '?'}rel=0&enablejsapi=1"
            title="${escapeHtml(v.title)}"
            class="absolute inset-0 w-full h-full"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </div>
        <p class="mt-2 text-xs text-[#5C5248]">${escapeHtml(v.title)} •
          <a href="${v.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="text-[#8B1E1E] underline underline-offset-2">Mở trên YouTube</a>
        </p>
        `}
  `;
}

/** Ảnh thẻ di tích: bản nhỏ "-the.webp" (rộng 720 px) cạnh ảnh gốc; ảnh gốc dùng trong hồ sơ. */
function cardThumb(src) {
  return src ? src.replace(/\.(jpe?g|png|webp)$/i, '-the.webp') : src;
}

/** Biểu tượng SVG từ sprite #i-* trong index.html */
function ic(name, cls = 'w-4 h-4') {
  return `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function openDetailModal(itemId) {
  const item = state.allItems.find(i => i.id === itemId);
  if (!item) return;

  state.selectedItem = item;
  const isVatThe = item.category === 'vat-the';
  const modal = document.getElementById('heritage-detail-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal ||!container) return;

  history.replaceState(null, '', `#item=${item.id}`);

  let section3Html = '';
  if (isVatThe) {
    section3Html = `
      <div class="space-y-4 text-[#2A2521] leading-relaxed">
        <p class="modal-lede">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="modal-subhead">
            Giá trị lịch sử và câu chuyện
          </h4>
          <ul class="modal-list">
            ${(item.content.historicalSignificance || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="modal-subhead">
            Kiến trúc và điểm nhấn
          </h4>
          <ul class="modal-list">
            ${(item.content.architecture || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.studyNote? `
          <aside class="modal-aside">
            <div class="eyebrow mb-1">Ghi chú học tập</div>
            <p>${escapeHtml(item.content.studyNote)}</p>
          </aside>
        `: ''}
      </div>
    `;
  } else {
    section3Html = `
      <div class="space-y-4 text-[#2A2521] leading-relaxed">
        <p class="modal-lede">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="modal-subhead">
            Nguồn gốc và ý nghĩa
          </h4>
          <ul class="modal-list">
            ${(item.content.originAndMeaning || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="modal-subhead">
            Nghi thức và thực hành
          </h4>
          <ul class="modal-list">
            ${(item.content.ritualsAndActivities || item.content.practice || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.preservationValue? `
          <aside class="modal-aside">
            <div class="eyebrow mb-1">Bảo tồn và giáo dục</div>
            <p>${escapeHtml(item.content.preservationValue)}</p>
          </aside>
        `: ''}
      </div>
    `;
  }

  state.lightboxImages = item.gallery || [];

  container.innerHTML = `
    <!-- Thanh thao tác trên modal -->
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(44,30,24,0.1)]">
      <p class="eyebrow">${escapeHtml(item.categoryName)} <span class="hidden sm:inline"><span aria-hidden="true">·</span> <span class="eyebrow-muted">Mã ${item.id}</span></span></p>

      <div class="flex items-center gap-1">
        <button
          type="button"
          onclick="copyToClipboard('${getHeritageShareUrl(item.id)}', 'Đã sao chép liên kết di tích!')"
          title="Sao chép liên kết mở thẳng hồ sơ này" aria-label="Sao chép liên kết hồ sơ"
          class="inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#F5EFE6] transition-colors">
          ${ic('link')}
          <span class="hidden sm:inline">Sao chép liên kết</span>
        </button>
        <button
          type="button"
          onclick="window.print()"
          title="In tài liệu này"
          class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#F5EFE6] transition-colors">
          ${ic('file-text')}
          <span>In</span>
        </button>
        <button
          type="button"
          onclick="closeDetailModal()" aria-label="Đóng hồ sơ di tích"
          class="w-11 h-11 flex-shrink-0 rounded-md text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#F5EFE6] flex items-center justify-center transition-colors">
          ${ic('x', 'w-5 h-5')}
        </button>
      </div>
    </div>

    <div class="space-y-8">

      <!-- PHẦN 1: TÊN + BẢNG THÔNG MỤC (địa chỉ, quyết định, đối tượng thờ...) -->
      <section class="pb-2">
        <h2 class="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#8B1E1E] leading-tight mb-5" style="text-wrap: balance;">
          ${escapeHtml(item.title)}
        </h2>

        ${(() => {
          const parentRoute = (typeof HERITAGE_ROUTES !== 'undefined') ? HERITAGE_ROUTES.find(r => r.relicIds && r.relicIds.includes(item.id)) : null;
          const place = isVatThe ? item.address : item.scope;
          const rows = [
            [isVatThe ? 'Cấp xếp hạng' : 'Loại hình', item.badge],
            ['Loại hình di tích', isVatThe ? item.relicType : ''],
            ['Quyết định', item.decision],
            ['Đối tượng thờ', item.worship],
            [isVatThe ? 'Địa chỉ' : 'Phạm vi', place && !isVatThe ? escapeHtml(place) : place ? `${escapeHtml(place)} <button type="button" onclick="copyToClipboard('${escapeHtml(place)}', 'Đã sao chép địa chỉ!')" class="spec-action">Sao chép</button>` : '', true],
            ['Trước 01/7/2025', item.oldAddress],
            ['Tuyến tham quan', parentRoute ? `Tuyến ${parentRoute.number} · ${escapeHtml(parentRoute.title)} <button type="button" onclick="closeDetailModal(); selectRoute('${parentRoute.id}'); selectRouteRelic('${item.id}'); document.getElementById('heritage-map-section')?.scrollIntoView({behavior: 'smooth'});" class="spec-action">Xem trên bản đồ →</button>` : '', true]
          ].filter(r => r[1]);
          return `<dl class="spec-table">${rows.map(([k, v, raw]) => `<div><dt>${k}</dt><dd>${raw ? v : escapeHtml(v)}</dd></div>`).join('')}</dl>`;
        })()}

        <!-- Liên kết nhanh -->
        <div class="rich-media-bar mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#7A5C3E]">
          <button type="button" onclick="playModalRealAudio()" class="modal-link">${ic('volume')} <span>Nghe thuyết minh</span></button>
          ${item.video ? `<button type="button" onclick="document.getElementById('modal-video-section')?.scrollIntoView({behavior: 'smooth'})" class="modal-link">${ic('video')} <span>Video tư liệu</span></button>` : ''}
          ${item.docFile ? `<a href="${item.docFile.path}" download="${escapeHtml(item.docFile.fileName)}" class="modal-link">${ic('download')} <span>Tải file Word</span></a>` : ''}
          <a href="${item.map.directionsUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">${ic('map')} <span>Chỉ đường Google Maps</span></a>
          <a href="${escapeHtml(feedbackUrl(item))}" target="_blank" rel="noopener noreferrer" title="Mở phiếu góp ý, tên di tích đã điền sẵn" class="modal-link">${ic('pencil')} <span>Báo lỗi nội dung ↗</span></a>
        </div>
      </section>

      <section id="audioguide-section" class="border-b border-[rgba(44,30,24,0.1)] pb-6">
      ${item.audioFile ? `
        <!-- BẢN GHI ÂM THUYẾT MINH THỰC TẾ (ÂM THANH GỐC DO HỌC SINH / THẦY CÔ THỰC HIỆN) -->
        <div class="p-4 sm:p-5 rounded-lg bg-[#FFFCF7] border border-[rgba(139,30,30,0.12)] space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-md border border-[rgba(139,30,30,0.2)] text-[#8B1E1E] flex items-center justify-center flex-shrink-0">
                ${ic('volume', 'w-6 h-6')}
              </div>
              <div>
                <div class="text-sm font-bold text-[#8B1E1E] flex items-center gap-2">
                  <span>Bản ghi âm thuyết minh</span>
                  <span class="eyebrow eyebrow-muted whitespace-nowrap">Âm thanh gốc</span>
                </div>
                <div id="modal-audio-current-title" class="text-xs text-[#5C5248] mt-1 font-medium">${escapeHtml(item.audioFile.title)} (tư liệu thực tế do Ban biên tập thực hiện)</div>
              </div>
            </div>
            <audio id="modal-real-audio" onplay="pauseModalMedia('real'); this.volume = 1.0;" controls class="h-10 w-full sm:w-72 max-w-full rounded-xl shadow-xs" preload="none">
              <source src="${item.audioFile.src}" type="audio/mpeg">
              Trình duyệt không hỗ trợ nghe âm thanh.
            </audio>
          </div>

          ${item.audioTracks && item.audioTracks.length > 1 ? `
          <!-- DANH SÁCH BẢN THUYẾT MINH CHUYÊN ĐỀ (MULTI-TRACK SELECTOR) -->
          <div class="pt-3 border-t border-[rgba(44,30,24,0.1)]">
            <div class="text-[11px] font-bold text-[#786C5E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#8B1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>
              <span>Chọn bản ghi âm thuyết minh (${item.audioTracks.length} bản):</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${item.audioTracks.map((tr, tIdx) => `
                <button
                  type="button"
                  aria-pressed="${tIdx === 0}"
                  onclick="switchModalAudioTrack('${tr.src}', '${escapeHtml(tr.title)}', this)"
                  class="audio-track-pill flex items-center justify-between p-2.5 rounded-xl border text-left transition cursor-pointer ${tIdx === 0 ? 'bg-[#8B1E1E] text-white border-[#8B1E1E] shadow-xs is-active' : 'bg-white text-[#2A2521] border-[#EADECF] hover:bg-[#FAF5EE]'}"
                >
                  <div class="flex items-center gap-2.5 min-w-0 pr-2">
                    <span class="track-indicator flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${tIdx === 0 ? 'bg-white/20 text-white' : 'bg-[#FAF5EE] text-[#8B1E1E]'}">
                      ${tIdx + 1}
                    </span>
                    <div class="min-w-0 truncate">
                      <div class="text-xs font-bold truncate">${escapeHtml(tr.title)}</div>
                      <div class="text-[10px] opacity-80 truncate">${escapeHtml(tr.subtitle || '')}</div>
                    </div>
                  </div>
                  <span class="text-[11px] tabular-nums flex-shrink-0 opacity-80">
                    ${tr.duration || 'Âm thanh'}
                  </span>
                </button>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      ` : `
        <!-- DI TÍCH ĐANG TIẾP TỤC BỔ SUNG FILE GHI ÂM THỰC TẾ -->
        <div class="p-4 rounded-lg border border-[rgba(139,30,30,0.12)] text-xs flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-full bg-[#EADECF] text-[#8B1E1E] flex items-center justify-center flex-shrink-0">
            ${ic('volume', 'w-5 h-5')}
          </div>
          <div>
            <div class="font-bold text-[#8B1E1E]">Bản ghi âm thuyết minh thực tế</div>
            <div class="text-[11px] text-[#5C5248] mt-0.5">Ban biên tập đang ghi âm bản thuyết minh cho mục này.</div>
          </div>
        </div>
      `}
      </section>

      ${item.video ? `
      <!-- VIDEO TƯ LIỆU THỰC TẾ / YOUTUBE -->
      <section id="modal-video-section" class="border-b border-[rgba(44,30,24,0.1)] pb-6 scroll-mt-4">
        <h3 class="modal-section-title flex items-center gap-2">${ic('video', 'w-5 h-5')} Video tư liệu${item.moreVideos?.length ? ` (${item.moreVideos.length + 1})` : ''}</h3>
        ${[item.video, ...(item.moreVideos || [])].map((v, vi) => `<div class="${vi ? 'mt-6' : ''}">${renderVideoBlock(v)}</div>`).join('')}
      </section>
      ` : ''}

      <!-- PHẦN 3: NỘI DUNG VỀ DI TÍCH / NỘI DUNG DI SẢN -->
      <section class="border-b border-[rgba(44,30,24,0.1)] pb-5">
        <h3 class="modal-section-title">${isVatThe? 'Nội dung về di tích': 'Nội dung di sản'}</h3>
        ${section3Html}
      </section>

      ${renderVisitGuide(item)}

      ${renderMiniQuiz(item)}

      <!-- PHẦN 4: CHỈ DẪN ĐI ĐẾN ĐÓ BẰNG GOOGLE MAP -->
      <section class="border-b border-[rgba(44,30,24,0.1)] pb-5">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 class="modal-section-title !mb-0">Chỉ dẫn đường đi bằng Google Maps</h3>
          <div class="map-view-toggle" role="group" aria-label="Kiểu bản đồ">
            <button type="button" class="is-active" aria-pressed="true" onclick="setModalMapView(this, false)">Bản đồ</button>
            <button type="button" aria-pressed="false" onclick="setModalMapView(this, true)">Ảnh vệ tinh</button>
          </div>
        </div>
        
        <div class="rounded-lg overflow-hidden border border-[rgba(139,30,30,0.12)] bg-[#F5EFE6]">
          <div class="relative w-full h-72 sm:h-80 bg-gray-200">
            <iframe
              id="modal-map-frame"
              src="${item.map.embedUrl}" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Bản đồ Google Map chỉ đường đến ${escapeHtml(item.title)}">
            </iframe>
          </div>

          <div class="p-4 bg-[#FFFCF7] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[rgba(139,30,30,0.12)]">
            <div class="text-xs text-[#5C5248] text-center sm:text-left">
              <span class="font-bold text-[#8B1E1E]">Địa điểm:</span> ${escapeHtml(item.map.locationName || item.title)}
            </div>
            
            <a 
              href="${item.map.directionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm text-white bg-[#8B1E1E] hover:bg-[#6F1515] transition-colors duration-200">
              <svg class="w-5 h-5 text-[#F6E05E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              <span>Mở chỉ đường trên Google Maps</span>
              <svg class="w-4 h-4 ml-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- PHẦN 5: ẢNH VỀ DI TÍCH / DI SẢN -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E]">${isVatThe? 'Thư viện ảnh về di tích': 'Thư viện ảnh di tích và di sản'}</h3>
          ${(item.gallery || []).length? '<span class="text-xs text-[#786C5E] font-medium">Bấm vào ảnh để phóng to</span>': ''}
        </div>

        ${(item.gallery || []).length? '': `
          <div class="photo-pending-frame rounded-2xl p-8 text-center">
            <div class="mb-2 text-[#8B1E1E] flex justify-center">${ic('landmark','w-8 h-8')}</div>
            <p class="font-heritage-serif font-bold text-[#8B1E1E]">Ảnh tư liệu thực tế tại di tích đang được Ban biên tập cập nhật</p>
            <p class="text-xs text-[#786C5E] mt-1">Thầy cô, học sinh có ảnh chụp thật tại di tích xin gửi qua phiếu góp ý ẩn danh ở cuối trang.</p>
          </div>
        `}

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${(item.gallery || []).map((img, idx) => `
            <div 
              class="group relative h-48 rounded-md overflow-hidden cursor-pointer border border-[rgba(139,30,30,0.12)] bg-[#F5EFE6]"
              onclick="openLightbox(${idx})">
              <img 
                src="${img.url}" 
                alt="${escapeHtml(img.caption || item.title)}" 
                loading="lazy"
                loading="lazy" decoding="async" style="object-position: ${img.position || 'center 30%'};" class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                onerror="handleImageError(this)"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent text-white px-3 pt-6 pb-2 pr-10">
                <span class="text-xs font-medium line-clamp-2">${escapeHtml(img.caption || item.title)}</span>
              </div>
              <div class="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      ${item.docFile? `
      <!-- PHẦN 6: FILE CHỮ GIỚI THIỆU (.docx) + TOÀN VĂN -->
      <section class="border-t border-[rgba(44,30,24,0.1)] pt-5">
        <h3 class="modal-section-title">Tài liệu giới thiệu</h3>
        <div>
          <p class="text-xs text-[#786C5E] mb-3">Toàn văn: ${escapeHtml(item.docFile.title)}</p>
          <div id="doc-fulltext" class="doc-fulltext text-[0.9375rem] leading-relaxed text-[#2A2521]">
            <p class="text-[#786C5E] italic">Đang tải nội dung…</p>
          </div>

          ${item.relatedDocFiles && item.relatedDocFiles.length ? `
          <div class="mt-4 pt-4 border-t border-[#EADECF]/70">
            <h4 class="font-semibold text-sm text-[#8B1E1E] mb-2.5 flex items-center gap-1.5">
              ${ic('book', 'w-4 h-4')} Tư liệu và tài liệu đính kèm liên quan:
            </h4>
            <div class="space-y-2">
              ${item.relatedDocFiles.map(rel => `
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-[#FAF8F5] rounded-xl border border-[#EADECF] hover:border-[#8B1E1E]/40 transition shadow-2xs">
                  <div class="flex items-start sm:items-center gap-2.5">
                    <span class="p-2 rounded-lg ${rel.fileName.endsWith('.pdf') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} flex-shrink-0 mt-0.5 sm:mt-0">
                      ${ic('book', 'w-4 h-4')}
                    </span>
                    <div>
                      <div class="text-sm font-bold text-[#2A2521]">${escapeHtml(rel.title)}</div>
                      <div class="text-xs text-[#5C5248]">${escapeHtml(rel.fileName)} • ${escapeHtml(rel.size || '')}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    ${window.DOC_TEXTS && window.DOC_TEXTS[rel.fileName] ? `
                      <button type="button" onclick="renderDocFullText('${rel.fileName}'); document.getElementById('doc-fulltext')?.scrollIntoView({behavior: 'smooth'})" class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E1E] bg-[#8B1E1E]/10 hover:bg-[#8B1E1E]/20 transition">
                        Xem toàn văn
                      </button>
                    ` : ''}
                    <a href="${rel.path}" download="${escapeHtml(rel.fileName)}" class="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8B1E1E] hover:bg-[#6F1515] transition flex items-center gap-1.5 shadow-2xs">
                      ${ic('download', 'w-3.5 h-3.5')} <span>Tải file</span>
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          <div class="mt-5 pt-4 border-t border-[rgba(44,30,24,0.1)] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#786C5E]">
            <span>Dành cho thầy cô cần lấy tư liệu:</span>
            <a href="${item.docFile.path}" download="${escapeHtml(item.docFile.fileName)}" class="spec-action !ml-0 inline-flex items-center gap-1">${ic('download', 'w-3.5 h-3.5')} Tải file Word (${escapeHtml(item.docFile.size || '.docx')})</a>
          </div>
        </div>
      </section>
      `: ''}

    </div>
  `;

  if (item.docFile) renderDocFullText(item.docFile.fileName);

  if (modal.classList.contains('hidden')) state.lastFocus = document.activeElement;
  modal.classList.remove('hidden');
  modal.scrollTop = 0;
  container.scrollTop = 0;
  const progressBar = document.getElementById('modal-reading-progress');
  if (progressBar) {
    progressBar.style.transform = 'scaleX(0)';
    container.onscroll = () => {
      const max = container.scrollHeight - container.clientHeight;
      progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, container.scrollTop / max) : 0})`;
    };
  }
  lockScroll();
  container.querySelector('button[onclick="closeDetailModal()"]')?.focus({ preventScroll: true });
  initAudioGuideForModal(item);
}

function renderVisitGuide(item) {
  const g = (typeof VISIT_GUIDES !== 'undefined') && VISIT_GUIDES[item.id];
  if (!g) return '';
  return `
      <section class="visit-guide border-b border-[rgba(44,30,24,0.1)] pb-6">
        <h3 class="modal-section-title">Cẩm nang tham quan</h3>
        <dl class="spec-table">
          ${g.when ? `<div><dt>Thời điểm nên đến</dt><dd>${escapeHtml(g.when)}</dd></div>` : ''}
          <div><dt>Xem tận nơi</dt><dd><ul class="modal-list !text-[0.9375rem]">${g.see.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul></dd></div>
        </dl>
      </section>`;
}

/** Câu hỏi nhanh cuối hồ sơ: 1 câu tự sinh từ dữ liệu (cấp xếp hạng / loại hình) + câu bổ sung nếu có. */
function buildMiniQuiz(item) {
  const all = [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA];
  const name = item.shortTitle || item.title;
  const qs = [];
  if (item.category === 'vat-the') {
    const ranks = ['Di tích quốc gia đặc biệt', 'Di tích cấp quốc gia', 'Di tích cấp tỉnh', 'Chỉ có trong danh mục kiểm kê'];
    if (ranks.includes(item.badge)) qs.push({ q: `${name} được xếp hạng ở cấp nào?`, options: ranks, answer: ranks.indexOf(item.badge), explain: item.decision || '' });
  } else {
    const others = [...new Set(all.filter(x => x.category !== 'vat-the' && x.badge !== item.badge).map(x => x.badge))].slice(0, 3);
    const opts = [item.badge, ...others];
    const shift = item.id.length % opts.length;
    const rotated = opts.slice(shift).concat(opts.slice(0, shift));
    qs.push({ q: `${name} thuộc loại hình di sản nào?`, options: rotated, answer: rotated.indexOf(item.badge), explain: item.overview || '' });
  }
  const extra = (typeof MINI_QUIZ_EXTRA !== 'undefined' && MINI_QUIZ_EXTRA[item.id]) || [];
  return extra.length > 1 ? extra.slice(0, 2) : [...extra, ...qs].slice(0, 2);
}

function renderMiniQuiz(item) {
  const qs = buildMiniQuiz(item);
  if (!qs.length) return '';
  state.miniQuiz = qs;
  return `
      <section class="mini-quiz border-b border-[rgba(44,30,24,0.1)] pb-6">
        <h3 class="modal-section-title">Tự kiểm tra nhanh</h3>
        ${qs.map((q, i) => `
          <fieldset class="mini-quiz-q">
            <legend>${i + 1}. ${escapeHtml(q.q)}</legend>
            <div class="mini-quiz-options">
              ${q.options.map((o, j) => `<button type="button" onclick="answerMiniQuiz(${i}, ${j}, this)">${escapeHtml(o)}</button>`).join('')}
            </div>
            <p class="mini-quiz-feedback" id="mini-quiz-fb-${i}" aria-live="polite" hidden></p>
          </fieldset>`).join('')}
      </section>`;
}

function answerMiniQuiz(i, j, btn) {
  const q = state.miniQuiz && state.miniQuiz[i];
  if (!q) return;
  const buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach((b, k) => {
    b.disabled = true;
    if (k === q.answer) b.classList.add('is-correct');
    else if (k === j) b.classList.add('is-wrong');
  });
  const fb = document.getElementById(`mini-quiz-fb-${i}`);
  const ok = j === q.answer;
  fb.className = `quiz-explain mini-quiz-feedback ${ok ? 'quiz-explain-ok' : 'quiz-explain-wrong'}`;
  fb.innerHTML = `<strong>${ok ? 'Đúng.' : 'Chưa đúng.'}</strong> ${ok ? '' : `Đáp án: ${escapeHtml(q.options[q.answer])}. `}${escapeHtml(q.explain)}`;
  fb.hidden = false;
}

/** 21 di tích kiểm kê chưa có tọa độ riêng: tra theo tên kèm "Nhã Nam, Bắc Ninh". */
const inventoryQuery = name => encodeURIComponent(`${name}, Nhã Nam, Bắc Ninh`);
const inventoryDirectionsUrl = name => `https://www.google.com/maps/dir/?api=1&destination=${inventoryQuery(name)}`;

function showInventoryRelicOnMap(name) {
  closeRelicsInventoryModal();
  updateMapFrame(`https://www.google.com/maps?q=${inventoryQuery(name)}&z=16&output=embed`, `Vị trí: ${name} (di tích trong danh mục kiểm kê)`, inventoryDirectionsUrl(name), `Chỉ đường tới ${name} ↗`);
  document.getElementById('heritage-map-section')?.scrollIntoView({ behavior: 'smooth' });
}

function setModalMapView(btn, satellite) {
  const frame = document.getElementById('modal-map-frame');
  if (!frame) return;
  const base = frame.dataset.base || frame.src;
  frame.dataset.base = base;
  frame.src = satellite ? base.replace('&output=embed', '&t=k&z=18&output=embed') : base;
  btn.parentElement.querySelectorAll('button').forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
}

/**
 * Toàn văn file Word nằm trong js/doc-texts.js (~150KB), chỉ tải khi mở modal lần đầu.
 * Dùng thẻ <script> thay cho fetch để chạy được cả khi mở index.html trực tiếp (file://).
 */
function loadDocTexts() {
  if (window.DOC_TEXTS) return Promise.resolve(window.DOC_TEXTS);
  if (!loadDocTexts.promise) {
    loadDocTexts.promise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = './js/doc-texts.js?v=3.6.0';
      s.onload = () => resolve(window.DOC_TEXTS || {});
      s.onerror = () => { loadDocTexts.promise = null; reject(); };
      document.head.appendChild(s);
    });
  }
  return loadDocTexts.promise;
}

function renderDocFullText(fileName) {
  const box = () => document.getElementById('doc-fulltext');
  loadDocTexts().then(texts => {
    const el = box();
    const item = state.selectedItem;
    const isDocFile = item?.docFile?.fileName === fileName;
    const relDoc = item?.relatedDocFiles?.find(r => r.fileName === fileName);
    if (!el || (!isDocFile && !relDoc)) return;

    const paras = texts[fileName] || [];
    if (!paras.length) {
      el.innerHTML = '<p class="text-[#786C5E] italic">Chưa trích được nội dung, vui lòng tải file tài liệu ở trên.</p>';
      return;
    }

    const currentDocTitle = isDocFile ? item.docFile.title : (relDoc ? relDoc.title : fileName);
    const headerHtml = `
      <div class="mb-3.5 pb-2.5 border-b border-[#EADECF] flex flex-wrap items-center justify-between gap-2 text-xs">
        <span class="font-bold text-[#8B1E1E] flex items-center gap-1.5">
          ${ic('book', 'w-3.5 h-3.5')} Đang xem: ${escapeHtml(currentDocTitle)}
        </span>
        ${!isDocFile && item?.docFile ? `
          <button type="button" onclick="renderDocFullText('${item.docFile.fileName}')" class="font-semibold text-[#8B1E1E] hover:underline underline-offset-2">
            ← Quay lại ${escapeHtml(item.docFile.title)}
          </button>
        ` : ''}
      </div>
    `;

    let html = '', list = [];
    const flush = () => { if (list.length) { html += `<ul class="modal-list mb-3">${list.join('')}</ul>`; list = []; } };
    paras.forEach(t => {
      const letters = t.replace(/[^\p{L}]/gu, '');
      const isHeading = t.length < 140 && letters.length > 3 && (letters === letters.toUpperCase() || /^[IVX]+\.\s/.test(t) || /^\d+\.\s/.test(t));
      if (/^[•\-+]\s/.test(t)) { list.push(`<li>${escapeHtml(t.replace(/^[•\-+]\s+/, ''))}</li>`); return; }
      flush();
      html += isHeading ? `<h5 class="modal-subhead mt-5">${escapeHtml(t)}</h5>` : `<p class="mb-3">${escapeHtml(t)}</p>`;
    });
    flush();
    el.innerHTML = headerHtml + html;
  }).catch(() => {
    const el = box();
    if (el) el.innerHTML = '<p class="text-[#786C5E] italic">Không tải được nội dung. Vui lòng tải file tài liệu ở trên.</p>';
  });
}


/**
 * Phát bản ghi âm thuyết minh thực tế của di tích khi bấm nút "Nghe thuyết minh"
 */
function switchModalAudioTrack(src, title, btnEl) {
  const audio = document.getElementById('modal-real-audio');
  const titleEl = document.getElementById('modal-audio-current-title');
  if (audio) {
    audio.pause();
    audio.src = src;
    audio.volume = 1.0;
    audio.load();
    pauseModalMedia('real');
    audio.play().catch(e => console.warn('Audio play prevented:', e));
  }
  if (titleEl) {
    titleEl.textContent = `${title} (tư liệu thực tế do Ban biên tập thực hiện)`;
  }
  document.querySelectorAll('.audio-track-pill').forEach(btn => {
    btn.classList.remove('bg-[#8B1E1E]', 'text-white', 'border-[#8B1E1E]', 'shadow-xs', 'is-active');
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.add('bg-white', 'text-[#2A2521]', 'border-[#EADECF]');
    const ind = btn.querySelector('.track-indicator');
    if (ind) {
      ind.className = 'track-indicator flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#FAF5EE] text-[#8B1E1E]';
    }
  });
  if (btnEl) {
    btnEl.classList.remove('bg-white', 'text-[#2A2521]', 'border-[#EADECF]');
    btnEl.classList.add('bg-[#8B1E1E]', 'text-white', 'border-[#8B1E1E]', 'shadow-xs', 'is-active');
    btnEl.setAttribute('aria-pressed', 'true');
    const ind = btnEl.querySelector('.track-indicator');
    if (ind) {
      ind.className = 'track-indicator flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20 text-white';
    }
  }
}

function playModalRealAudio() {
  const section = document.getElementById('audioguide-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
  const realAudio = document.getElementById('modal-real-audio');
  if (realAudio) {
    realAudio.volume = 1.0;
    pauseModalMedia('real');
    realAudio.play().catch(e => console.warn('Cannot auto play real audio:', e));
  }
}

function closeDetailModal() {
  const modal = document.getElementById('heritage-detail-modal');
  if (!modal || modal.classList.contains('hidden')) return;

  // Dừng phát tất cả video YouTube bên trong modal bằng cách xóa src của iframe
  const iframes = modal.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (iframe.src && (iframe.src.includes('youtube') || iframe.src.includes('youtu.be'))) {
      iframe.src = '';
    }
  });

  // Dừng video tư liệu (tệp mp4 trên trang)
  modal.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} });

  // Dừng bản ghi âm thực tế nếu đang phát
  const realAudio = modal.querySelector('#modal-real-audio');
  if (realAudio) {
    try {
      realAudio.pause();
      realAudio.currentTime = 0;
    } catch (e) {}
  }

  modal.classList.add('hidden');
  const progressBar = document.getElementById('modal-reading-progress');
  if (progressBar) progressBar.style.transform = 'scaleX(0)';
  const container = document.getElementById('modal-dynamic-content');
  if (container) container.onscroll = null;
  unlockScroll();
  state.lastFocus?.focus?.({ preventScroll: true });
  state.lastFocus = null;
  stopAudioGuideNarration();
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

/**
 * ====================================================================
 * HỆ THỐNG THUYẾT MINH DI TÍCH (AUDIO GUIDE ENGINE CONTROLLER)
 * ====================================================================
 */

/**
 * Khởi tạo dữ liệu và giao diện Audio Guide cho Modal di tích
 */
function initAudioGuideForModal(item) {
  if (!item) return;

  // Dừng mọi thuyết minh tự động / Web Speech API nếu còn tồn tại
  if (typeof stopAudioGuideNarration === 'function') {
    stopAudioGuideNarration();
  }

  // Toàn bộ dự án ưu tiên 100% bản ghi âm tư liệu thực tế của Ban biên tập
  // Tuyệt đối không kích hoạt giọng đọc máy tự động ngoài (Web Speech API)
  return;

  // Xây dựng nội dung bài thuyết minh giàu cảm xúc và truyền cảm
  let story = `Chào mừng quý thầy cô và các bạn học sinh đến với ${item.title}. `;
  story += `${item.categoryName} tiêu biểu của xã Nhã Nam, thành phố Bắc Ninh. `;
  if (item.address) story += `Địa chỉ tại: ${item.address}. `;
  if (item.scope) story += `Phạm vi thực hành di sản tại: ${item.scope}. `;
  if (item.content && item.content.intro) story += `${item.content.intro} `;
  if (item.overview) story += `${item.overview} `;
  if (item.content && item.content.historicalSignificance && item.content.historicalSignificance.length > 0) {
    story += `Về ý nghĩa lịch sử vẻ vang: ${item.content.historicalSignificance[0]} `;
  }
  if (item.content && item.content.studyNote) {
    story += `Lời nhắn gửi tới học sinh trường Trung học phổ thông Nhã Nam: ${item.content.studyNote} `;
  }

  // Khởi tạo sentences thông qua engine
  const sentences = heritageAudioGuide.loadStory(
    story,
    // Callback tiến trình (được gọi khi bắt đầu đọc mỗi câu)
    (currentIdx, totalCount, currentText) => {
      updateAudioGuideProgressUI(currentIdx, totalCount);
    },
    // Callback thay đổi trạng thái phát
    (isPlaying, isPaused) => {
      updateAudioGuideStateUI(isPlaying, isPaused);
    }
  );

  // Hiển thị danh sách câu trong khung transcript
  const transcriptContainer = document.getElementById('audioguide-transcript-container');
  if (transcriptContainer) {
    transcriptContainer.innerHTML = sentences.map((sent, idx) => `
      <div 
        id="transcript-sent-${idx}" 
        onclick="jumpToAudioGuideSentence(${idx})"
        class="transcript-sentence-item flex items-start gap-2"
        title="Bấm để nghe câu này">
        <span class="w-5 h-5 rounded-full bg-[#F5EFE6] text-[#8B1E1E] flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">${idx + 1}</span>
        <span class="flex-1">${escapeHtml(sent)}</span>
      </div>
    `).join('');
  }

  // Cập nhật thông tin giọng đọc
  const voiceInfo = getBestVietnameseVoice();
  const voiceInfoEl = document.getElementById('audioguide-voice-info');
  if (voiceInfoEl) {
    if (voiceInfo.isVietnamese) {
      voiceInfoEl.innerHTML = `
        <span>Giọng tiếng Việt (${escapeHtml(voiceInfo.name || 'Chuẩn')})</span>
      `;
    } else {
      voiceInfoEl.innerHTML = `
        <span>Hỗ trợ đọc đa nền tảng</span>
      `;
    }
  }

  // Đặt lại trạng thái nút bấm
  updateAudioGuideStateUI(false, false);
}

/**
 * Cập nhật giao diện khi đọc tới câu thứ index
 */
function updateAudioGuideProgressUI(currentIdx, totalCount) {
  const statusBadge = document.getElementById('audioguide-status-badge');
  if (statusBadge) {
    if (currentIdx < totalCount) {
      statusBadge.textContent = `Đoạn ${currentIdx + 1} / ${totalCount}`;
    } else {
      statusBadge.textContent = 'Đã hoàn thành';
    }
  }

  // Cập nhật highlight cho từng câu trong transcript
  const allSentences = document.querySelectorAll('.transcript-sentence-item');
  allSentences.forEach((el, idx) => {
    if (idx === currentIdx) {
      el.classList.add('active-sentence');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      el.classList.remove('active-sentence');
    }
  });
}

/**
 * Cập nhật trạng thái các nút bấm Audio Guide
 */
function updateAudioGuideStateUI(isPlaying, isPaused) {
  state.isAudioGuidePlaying = isPlaying;

  const btnPlay = document.getElementById('btn-modal-audioguide');
  const btnLabel = document.getElementById('audioguide-btn-label');
  const wave = document.getElementById('audioguide-wave');
  const statusBadge = document.getElementById('audioguide-status-badge');

  if (isPlaying) {
    if (btnLabel) btnLabel.textContent = 'Tạm dừng';
    if (wave) wave.classList.add('is-speaking');
    if (btnPlay) {
      btnPlay.classList.add('bg-[#701A1A]');
    }
  } else if (isPaused) {
    if (btnLabel) btnLabel.textContent = 'Tiếp tục nghe';
    if (wave) wave.classList.remove('is-speaking');
    if (statusBadge) statusBadge.textContent = 'Đang tạm dừng';
  } else {
    if (btnLabel) btnLabel.textContent = 'Bật thuyết minh';
    if (wave) wave.classList.remove('is-speaking');
    if (btnPlay) {
      btnPlay.classList.remove('bg-[#701A1A]');
    }
    if (statusBadge && statusBadge.textContent && statusBadge.textContent.includes('Đoạn')) {
      statusBadge.textContent = 'Sẵn sàng phát';
    }
  }
}

/**
 * Bật / Tạm dừng thuyết minh
 */
/**
 * Chỉ cho một nguồn âm thanh chạy trong modal: bản ghi âm gốc, giọng đọc tự động
 * hoặc video YouTube. Nhạc nền của trang luôn được tạm dừng.
 */
function pauseModalMedia(keep) {
  const modal = document.getElementById('heritage-detail-modal');
  if (keep !== 'real') {
    const real = modal?.querySelector('#modal-real-audio');
    if (real && !real.paused) real.pause();
  }
  if (keep !== 'tts' && (heritageAudioGuide.isPlaying || heritageAudioGuide.isPaused)) stopAudioGuideNarration();
  if (keep !== 'video') {
    modal?.querySelectorAll('iframe[src*="youtube"]').forEach(f => {
      f.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
    modal?.querySelectorAll('video').forEach(v => {
      if (!v.paused) v.pause();
    });
  }
  const bg = document.getElementById('bg-music');
  if (bg && !bg.paused && typeof toggleMusicPlayback === 'function') toggleMusicPlayback();
}

function toggleAudioGuideNarration() {
  if (!heritageAudioGuide.isPlaying) pauseModalMedia('tts');
  if (heritageAudioGuide.isPlaying) {
    heritageAudioGuide.pause();
  } else if (heritageAudioGuide.isPaused) {
    heritageAudioGuide.play();
  } else {
    heritageAudioGuide.play(0);
  }
}

/**
 * Dừng hẳn thuyết minh
 */
function stopAudioGuideNarration() {
  heritageAudioGuide.stop();
  updateAudioGuideStateUI(false, false);
  const allSentences = document.querySelectorAll('.transcript-sentence-item');
  allSentences.forEach(el => el.classList.remove('active-sentence'));
  const statusBadge = document.getElementById('audioguide-status-badge');
  if (statusBadge) statusBadge.textContent = 'Đã dừng';
}

/**
 * Đọc lại từ đầu
 */
function restartAudioGuideNarration() {
  heritageAudioGuide.restart();
}

/**
 * Tua tới câu cụ thể do người dùng click
 */
function jumpToAudioGuideSentence(index) {
  heritageAudioGuide.jumpTo(index);
}

/**
 * Đổi tốc độ đọc
 */
function changeAudioGuideRate(rate) {
  heritageAudioGuide.setRate(rate);

  // Cập nhật style nút tốc độ
  const btn085 = document.getElementById('speed-085');
  const btn100 = document.getElementById('speed-100');
  const btn120 = document.getElementById('speed-120');

  [btn085, btn100, btn120].forEach(btn => {
    if (btn) {
      btn.classList.remove('is-active', 'bg-[#8B1E1E]', 'text-white');
      btn.classList.add('text-[#5C5248]');
    }
  });

  let activeBtn = btn100;
  if (rate === 0.85) activeBtn = btn085;
  if (rate === 1.2) activeBtn = btn120;

  if (activeBtn) {
    activeBtn.classList.add('is-active', 'bg-[#8B1E1E]', 'text-white');
    activeBtn.classList.remove('text-[#5C5248]');
  }
  showToastNotification(`Đã đổi tốc độ thuyết minh: ${rate}x`, 'info');
}

// Wrapper tương thích cũ
function handleAudioGuideNarrate() {
  toggleAudioGuideNarration();
}

/**
 * ====================================================================
 * THƯ VIỆN ẢNH PHÓNG TO (LIGHTBOX GALLERY)
 * ====================================================================
 */
function openLightbox(index) {
  if (!state.lightboxImages || state.lightboxImages.length === 0) return;
  state.lightboxIndex = index;
  
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;

  updateLightboxContent();
  lightbox.classList.remove('hidden');
  lockScroll();
}

function updateLightboxContent() {
  const imgEl = document.getElementById('lightbox-image');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');
  
  const current = state.lightboxImages[state.lightboxIndex];
  if (!current ||!imgEl) return;

  imgEl.src = current.url;
  imgEl.onerror = () => handleImageError(imgEl);
  imgEl.alt = current.caption || 'Hình ảnh di sản Nhã Nam';

  if (captionEl) captionEl.textContent = current.caption || '';
  if (counterEl) counterEl.textContent = `${state.lightboxIndex + 1} / ${state.lightboxImages.length}`;
}

(function enableLightboxSwipe() {
  const box = document.getElementById('lightbox-modal');
  if (!box) return;
  let x0 = null, y0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  box.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? nextLightboxImage : prevLightboxImage)();
  }, { passive: true });
})();

function prevLightboxImage() {
  if (state.lightboxImages.length <= 1) return;
  state.lightboxIndex = (state.lightboxIndex - 1 + state.lightboxImages.length) % state.lightboxImages.length;
  updateLightboxContent();
}

function nextLightboxImage() {
  if (state.lightboxImages.length <= 1) return;
  state.lightboxIndex = (state.lightboxIndex + 1) % state.lightboxImages.length;
  updateLightboxContent();
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (lightbox) {
    lightbox.classList.add('hidden');
    unlockScroll();
  }
}

/**
 * ====================================================================
 * FACEBOOK GROUP SECTION & MODAL THÔNG BÁO THÂN THIỆN
 * ====================================================================
 */
function handleJoinFacebookGroup(event) {
  const url = SITE_CONFIG.facebookGroupUrl;
  
  if (!url || url.trim() === '#' || url.trim() === '') {
    if (event) event.preventDefault();
    showFacebookComingSoonModal();
  } else {
    if (event && event.currentTarget && event.currentTarget.tagName === 'A') {
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function showFacebookComingSoonModal() {
  const modal = document.getElementById('facebook-notice-modal');
  if (modal) {
    state.lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    lockScroll();
    modal.querySelector('button, a')?.focus({ preventScroll: true });
  } else {
    showToastNotification(
      'Nhóm Facebook đang được Ban biên tập dự án di sản văn hóa xã Nhã Nam thiết lập. Đường dẫn sẽ sớm được cập nhật!',
      'info',
      5000
    );
  }
}

function closeFacebookNoticeModal() {
  const modal = document.getElementById('facebook-notice-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    unlockScroll();
    state.lastFocus?.focus?.({ preventScroll: true });
    state.lastFocus = null;
  }
}

/**
 * ====================================================================
 * LƯU YÊU THÍCH / DI TÍCH QUAN TÂM (BOOKMARK)
 * ====================================================================
 */
function toggleFavorite(itemId) {
  const index = state.favorites.indexOf(itemId);
  if (index > -1) {
    state.favorites.splice(index, 1);
    showToastNotification('Đã gỡ di tích khỏi danh sách đã lưu.', 'info');
  } else {
    state.favorites.push(itemId);
    showToastNotification('Đã lưu di tích vào danh sách quan tâm của bạn!', 'success');
  }

  localStorage.setItem('nhanam_heritage_favorites', JSON.stringify(state.favorites));
  applyFiltersAndRender();
}

/**
 * ====================================================================
 * GÓC HỌC TẬP - TRẮC NGHIỆM TÌM HIỂU DI SẢN NHÃ NAM
 * ====================================================================
 */
/** Fisher–Yates: trộn mảng tại chỗ. */
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QUIZ_SEEN_KEY = 'nhanam_quiz_seen_ids';
const QUIZ_LETTERS = ['A', 'B', 'C', 'D'];

function quizConflicts(id, chosen) {
  return (typeof QUIZ_CONFLICT_GROUPS !== 'undefined' ? QUIZ_CONFLICT_GROUPS : [])
    .some(g => g.includes(id) && g.some(x => chosen.includes(x)));
}

/**
 * Bốc đề 10 câu theo ma trận 2/3/3/2 từ ngân hàng 40 câu; ưu tiên câu chưa gặp ở các lượt trước,
 * không bốc chung các câu cùng nhóm (lộ đáp án của nhau). Đáp án đúng rải đều: mỗi chữ cái 2–3 lần.
 */
function generateQuizExam() {
  const bank = typeof QUIZ_BANK_40 !== 'undefined' ? QUIZ_BANK_40 : [];
  if (!bank.length) return null;
  let seen = [];
  try { seen = JSON.parse(localStorage.getItem(QUIZ_SEEN_KEY) || '[]'); } catch (e) { seen = []; }
  const chosen = [];
  Object.entries(QUIZ_MATRIX).forEach(([part, need]) => {
    const pool = bank.filter(q => String(q.part) === part).map(q => q.id);
    const fresh = shuffleInPlace(pool.filter(id => !seen.includes(id)));
    const old = shuffleInPlace(pool.filter(id => seen.includes(id)));
    if (fresh.length < need) seen = seen.filter(id => !pool.includes(id)); // hết câu mới của phần này: quay vòng
    let got = 0;
    for (const id of [...fresh, ...old]) {
      if (got >= need) break;
      if (!quizConflicts(id, chosen)) { chosen.push(id); got++; }
    }
  });
  try { localStorage.setItem(QUIZ_SEEN_KEY, JSON.stringify([...new Set([...seen, ...chosen])])); } catch (e) { /* bỏ qua */ }

  const targets = shuffleInPlace([0, 0, 1, 1, 2, 2, 3, 3, ...shuffleInPlace([0, 1, 2, 3]).slice(0, 2)]);
  const questions = chosen.map((id, i) => {
    const q = bank.find(x => x.id === id);
    const wrong = shuffleInPlace(q.options.filter((_, k) => k !== q.answer));
    const t = targets[i];
    return { ...q, options: [...wrong.slice(0, t), q.options[q.answer], ...wrong.slice(t)], answer: t };
  });
  return { code: String(1000 + Math.floor(Math.random() * 9000)), questions, picked: {} };
}

function updateQuizProgressStatus() {
  const statusEl = document.getElementById('quiz-progress-status');
  const exam = state.quizExam;
  if (!statusEl || !exam) return;
  const answered = Object.keys(exam.picked).length;
  const correct = exam.questions.filter((q, i) => exam.picked[i] === q.answer).length;
  statusEl.textContent = `Mã đề #${exam.code} • Đã làm ${answered}/10 câu • Đúng ${correct}`;
}

function renderQuiz() {
  const container = document.getElementById('quiz-questions-container');
  if (!container) return;
  if (!state.quizExam) state.quizExam = generateQuizExam();
  const exam = state.quizExam;
  if (!exam) {
    container.innerHTML = '<p class="text-xs text-[#5C5248]">Đang tải câu hỏi trắc nghiệm…</p>';
    return;
  }
  container.innerHTML = exam.questions.map((q, i) => `
    <fieldset class="mini-quiz-q p-5 sm:p-6 rounded-xl bg-heritage-surface border border-[rgba(139,30,30,0.12)]">
      <legend class="sr-only">Câu ${i + 1}</legend>
      <p class="text-[11px] sm:text-xs font-semibold text-[#8B6914] mb-2 leading-relaxed">
        Mã đề ngẫu nhiên #${exam.code} • Câu ${i + 1}/10 • Chủ đề: ${escapeHtml(QUIZ_PARTS[q.part])} (Ngân hàng 40 câu hỏi địa chí Nhã Nam)
      </p>
      <p class="font-semibold text-base text-[#2A2521] leading-snug mb-3">Câu ${i + 1}. ${escapeHtml(q.question)}</p>
      <div class="mini-quiz-options quiz-bank-options" data-quiz-q="${i}">
        ${q.options.map((opt, k) => `
          <button type="button" onclick="answerBankQuiz(${i}, ${k}, this)"><strong>${QUIZ_LETTERS[k]}.</strong> ${escapeHtml(opt)}</button>
        `).join('')}
      </div>
      <div id="quiz-explanation-${i}" class="hidden" aria-live="polite"></div>
    </fieldset>
  `).join('');
  updateQuizProgressStatus();
}

function answerBankQuiz(i, k, btn) {
  const exam = state.quizExam;
  if (!exam || exam.picked[i] !== undefined) return;
  exam.picked[i] = k;
  const q = exam.questions[i];
  const ok = k === q.answer;
  btn.closest('[data-quiz-q]').querySelectorAll('button').forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.answer) b.classList.add('is-correct');
    else if (idx === k) b.classList.add('is-wrong');
  });
  const ex = document.getElementById(`quiz-explanation-${i}`);
  ex.className = `quiz-explain ${ok ? 'quiz-explain-ok' : 'quiz-explain-wrong'} quiz-bank-explain`;
  ex.innerHTML = `<strong>${ok ? 'Đúng.' : `Chưa đúng. Đáp án ${QUIZ_LETTERS[q.answer]}.`}</strong>
    <span class="block mt-1"><em>Chú giải tư liệu địa phương:</em> ${escapeHtml(q.explain)}</span>`;
  updateQuizProgressStatus();
  if (Object.keys(exam.picked).length === exam.questions.length) {
    const score = exam.questions.filter((qq, idx) => exam.picked[idx] === qq.answer).length;
    setTimeout(() => showQuizResultModal(score, exam.questions.length), 600);
  }
}

function showQuizResultModal(score, total) {
  let badgeTitle = 'Cần đọc thêm hồ sơ di tích';
  let message = 'Em nên đọc lại các hồ sơ di tích trên cổng thông tin rồi làm một đề khác.';
  if (score >= 9) {
    badgeTitle = 'Nắm vững kiến thức';
    message = 'Em hiểu rõ lịch sử và di sản quê hương. Làm thêm đề khác để ôn hết ngân hàng 40 câu.';
  } else if (score >= 7) {
    badgeTitle = 'Khá vững';
    message = 'Xem lại chú giải dưới các câu làm sai, rồi làm đề khác để củng cố.';
  } else if (score >= 5) {
    badgeTitle = 'Đạt yêu cầu';
    message = 'Đọc kỹ chú giải tư liệu địa phương dưới các câu sai trước khi làm đề tiếp theo.';
  }
  const resultContainer = document.getElementById('quiz-result-content');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="text-center py-4">
        <p class="text-xs text-[#5C5248] mb-1">Mã đề #${state.quizExam ? state.quizExam.code : ''}</p>
        <h3 class="font-heritage-serif text-2xl font-bold text-[#8B1E1E] mb-2">${badgeTitle}</h3>
        <div class="font-heritage-serif text-4xl font-bold text-[#2A2521] tabular-nums mb-2">${score}/${total} điểm</div>
        <p class="text-sm text-[#5C5248] max-w-sm mx-auto mb-6 leading-relaxed">${message}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onclick="resetQuiz()"
            class="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#6F1515] transition-colors">
            Làm đề 10 câu ngẫu nhiên khác
          </button>
          <button type="button" onclick="closeQuizResultModal()"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5EFE6] text-[#5C5248] hover:bg-[#EADECF] transition-colors">
            Xem lại chú giải
          </button>
        </div>
      </div>
    `;
  }
  const modal = document.getElementById('quiz-result-modal');
  if (modal) {
    state.lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    lockScroll();
    modal.querySelector('button')?.focus({ preventScroll: true });
  }
}

function closeQuizResultModal() {
  const modal = document.getElementById('quiz-result-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    unlockScroll();
    state.lastFocus?.focus?.({ preventScroll: true });
    state.lastFocus = null;
  }
}

/** Tạo đề ngẫu nhiên mới (10 câu), ưu tiên các câu chưa gặp. */
function resetQuiz() {
  closeQuizResultModal();
  state.quizExam = generateQuizExam();
  renderQuiz();
  document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * ====================================================================
 * NHẠC NỀN CỔ TRUYỀN: "LƯU THỦY KIM TIỀN"
 * ====================================================================
 */
let audioCtx = null;
let synthTimer = null;
let currentSynthIndex = 0;

const LUU_THUY_KIM_TIEN_NOTES = [
  { note: 261.63, dur: 400 }, // Đô
  { note: 220.00, dur: 350 }, // Là
  { note: 261.63, dur: 400 }, // Đô
  { note: 293.66, dur: 400 }, // Rề
  { note: 349.23, dur: 600 }, // Pha
  { note: 392.00, dur: 400 }, // Son
  { note: 440.00, dur: 450 }, // Lá
  { note: 392.00, dur: 350 }, // Son
  { note: 349.23, dur: 700 }, // Pha
  { note: 261.63, dur: 400 }, // Đồ
  { note: 220.00, dur: 350 }, // Là
  { note: 261.63, dur: 400 }, // Đô
  { note: 293.66, dur: 400 }, // Rề
  { note: 349.23, dur: 750 }, // Pha
  { note: 392.00, dur: 380 }, // Son
  { note: 523.25, dur: 420 }, // Đố
  { note: 440.00, dur: 380 }, // Lá
  { note: 392.00, dur: 380 }, // Son
  { note: 349.23, dur: 550 }, // Pha
  { note: 440.00, dur: 380 }, // Lá
  { note: 392.00, dur: 380 }, // Son
  { note: 349.23, dur: 650 }, // Pha
  { note: 293.66, dur: 400 }, // Rề
  { note: 349.23, dur: 400 }, // Pha
  { note: 261.63, dur: 350 }, // Đồ
  { note: 293.66, dur: 400 }, // Rề
  { note: 349.23, dur: 800 }, // Pha

  { note: 349.23, dur: 320 }, // Pha
  { note: 392.00, dur: 320 }, // Son
  { note: 440.00, dur: 350 }, // Lá
  { note: 523.25, dur: 400 }, // Đố
  { note: 440.00, dur: 320 }, // Lá
  { note: 392.00, dur: 550 }, // Son
  { note: 349.23, dur: 320 }, // Pha
  { note: 293.66, dur: 320 }, // Rề
  { note: 261.63, dur: 350 }, // Đồ
  { note: 293.66, dur: 350 }, // Rề
  { note: 349.23, dur: 400 }, // Pha
  { note: 392.00, dur: 600 }, // Son
  { note: 440.00, dur: 320 }, // Lá
  { note: 523.25, dur: 400 }, // Đố
  { note: 440.00, dur: 320 }, // Lá
  { note: 392.00, dur: 350 }, // Son
  { note: 349.23, dur: 380 }, // Pha
  { note: 293.66, dur: 700 } // Rề
];

/**
 * ====================================================================
 * TRÌNH PHÁT NHẠC CA KHÚC QUÊ HƯƠNG ("NHÃ NAM TRONG TÔI")
 * ====================================================================
 */

/**
 * Cập nhật hiển thị giao diện trình phát nhạc trên thanh điều hướng
 */
function updateMusicPlayerUI() {
  const playlist = getActivePlaylist();
  const track = playlist[currentTrackIndex];
  if (!track) return;

  const labels = document.querySelectorAll('#sound-toggle-label,.sound-track-label');
  labels.forEach(label => {
    label.textContent = state.isAudioPlaying? `Đang phát: ${track.title}`: track.title;
  });

  const containers = document.querySelectorAll('.music-player-pill,.sound-player-btn');
  containers.forEach(container => {
    if (state.isAudioPlaying) {
      container.classList.add('playing');
    } else {
      container.classList.remove('playing');
    }
  });

  document.querySelectorAll('[onclick="toggleMusicPlayback()"]').forEach(btn => {
    btn.title = state.isAudioPlaying ? `Tạm dừng: ${track.title}` : `Phát bài: ${track.title}`;
    btn.setAttribute('aria-pressed', state.isAudioPlaying);
  });
}

/**
 * Bật / Tạm dừng phát bài hát hiện tại
 */
async function toggleMusicPlayback() {
  const bgMusic = document.getElementById('bg-music');
  const playlist = getActivePlaylist();
  const track = playlist[currentTrackIndex];

  if (!bgMusic) return;

  if (state.isAudioPlaying) {
    bgMusic.pause();
    state.isAudioPlaying = false;
    updateMusicPlayerUI();
    showToastNotification(`Đã tạm dừng: ${track.title}`, 'info');
  } else {
    // Đảm bảo trỏ đúng bài hát
    if (!bgMusic.src ||!bgMusic.src.includes(track.id)) {
      bgMusic.src = track.src;
    }
    bgMusic.volume = 0.5;

    try {
      await bgMusic.play();
      state.isAudioPlaying = true;
      updateMusicPlayerUI();
      showToastNotification(`Đang phát ca khúc: ${track.title}`, 'success');
    } catch (err) {
      console.warn('Playback error:', err);
      showToastNotification('Chạm vào màn hình để bắt đầu phát nhạc', 'info');
    }
  }
}

// Hàm tương thích cũ
function toggleTraditionalAudio() {
  toggleMusicPlayback();
}

function startSynthLuuThuy() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    currentSynthIndex = 0;

    function playNextNote() {
      if (!state.isAudioPlaying ||!audioCtx) return;

      const item = LUU_THUY_KIM_TIEN_NOTES[currentSynthIndex];
      playZitherPluck(item.note, item.dur);

      currentSynthIndex = (currentSynthIndex + 1) % LUU_THUY_KIM_TIEN_NOTES.length;
      synthTimer = setTimeout(playNextNote, item.dur);
    }

    playNextNote();
  } catch (e) {
    console.warn('Audio Synthesis Error:', e);
  }
}

function playZitherPluck(freq, durationMs) {
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const oscHarmonic = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  oscHarmonic.type = 'sine';
  oscHarmonic.frequency.setValueAtTime(freq * 2, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1800, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + (durationMs / 1000));

  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000) * 1.2);

  osc.connect(filter);
  oscHarmonic.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(now);
  oscHarmonic.start(now);
  osc.stop(now + (durationMs / 1000) * 1.3);
  oscHarmonic.stop(now + (durationMs / 1000) * 1.3);
}

function stopSynthLuuThuy() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

/**
 * ====================================================================
 * GẮN CÁC SỰ KIỆN TƯƠNG TÁC (EVENT LISTENERS)
 * ====================================================================
 */
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (state.searchQuery.trim()) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      applyFiltersAndRender();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        state.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        applyFiltersAndRender();
        searchInput.focus();
      }
    });
  }

  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active', 'bg-[#8B1E1E]', 'text-white'));
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white');

      state.currentCategory = btn.getAttribute('data-category');
      applyFiltersAndRender();
    });
  });

  const heroBtnVatThe = document.getElementById('hero-btn-vat-the');
  if (heroBtnVatThe) {
    heroBtnVatThe.addEventListener('click', () => {
      setCategoryFilter('vat-the');
      scrollToSection('heritage-explorer');
    });
  }

  const heroBtnPhiVatThe = document.getElementById('hero-btn-phi-vat-the');
  if (heroBtnPhiVatThe) {
    heroBtnPhiVatThe.addEventListener('click', () => {
      setCategoryFilter('phi-vat-the');
      scrollToSection('heritage-explorer');
    });
  }

  const backToTopBtn = document.getElementById('back-to-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Đang mở menu di động: Esc đóng menu trước
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenuIcon = document.getElementById('mobile-menu-icon');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        mobileMenuBtn?.setAttribute('aria-label', 'Mở thanh điều hướng');
        if (mobileMenuIcon) {
          mobileMenuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
        }
        return;
      }
      // Đang xem ảnh phóng to: Esc chỉ đóng ảnh, giữ nguyên hồ sơ bên dưới
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox && !lightbox.classList.contains('hidden')) { closeLightbox(); return; }
      closeDetailModal();
      closeFacebookNoticeModal();
      closeQuizResultModal();
      if (typeof closeRelicsInventoryModal === 'function') closeRelicsInventoryModal();
      if (typeof closeLegalPrivacyModal === 'function') closeLegalPrivacyModal();
      if (typeof closeCommuneEmblemModal === 'function') closeCommuneEmblemModal();
    } else if (e.key === 'Tab') {
      // Accessible Focus Trap for all open modal dialogs (WCAG 2.2 AA/AAA)
      const openModal = [
        document.getElementById('lightbox-modal'),
        document.getElementById('heritage-detail-modal'),
        document.getElementById('relics-inventory-modal'),
        document.getElementById('legal-privacy-modal'),
        document.getElementById('commune-emblem-modal'),
        document.getElementById('facebook-notice-modal'),
        document.getElementById('quiz-result-modal')
      ].find(m => m && !m.classList.contains('hidden'));

      if (openModal) {
        const focusable = openModal.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const focusableArr = Array.prototype.filter.call(focusable, el => el.offsetParent !== null);
        if (focusableArr.length > 0) {
          const first = focusableArr[0];
          const last = focusableArr[focusableArr.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first || !openModal.contains(document.activeElement)) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last || !openModal.contains(document.activeElement)) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[role="button"]:not(button)')) {
      // Thẻ tuyến / thẻ danh mục là <div role="button">: cho bấm bằng bàn phím
      e.preventDefault();
      e.target.click();
    } else if (e.key === 'ArrowLeft') {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox &&!lightbox.classList.contains('hidden')) {
        prevLightboxImage();
      }
    } else if (e.key === 'ArrowRight') {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox &&!lightbox.classList.contains('hidden')) {
        nextLightboxImage();
      }
    }
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      const expanded = !isHidden;
      mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      mobileMenuBtn.setAttribute('aria-label', expanded ? 'Đóng thanh điều hướng' : 'Mở thanh điều hướng');
      if (mobileMenuIcon) {
        mobileMenuIcon.innerHTML = expanded
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
      }
    });

    // Tự động đóng menu di động khi nhấn ra ngoài
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Mở thanh điều hướng');
        if (mobileMenuIcon) {
          mobileMenuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
        }
      }
    });
  }
}

function setCategoryFilter(category) {
  state.activeRouteFilter = null;
  state.currentCategory = category;
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-category') === category;
    if (isTarget) {
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active', 'bg-[#8B1E1E]', 'text-white');
      btn.setAttribute('aria-selected', 'false');
    }
  });
  applyFiltersAndRender();
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function checkUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#item=')) {
    // Chỉ lấy mã hồ sơ, bỏ phần ứng dụng chat có thể gắn thêm phía sau (vd. &fbclid=…)
    const itemId = (decodeURIComponent(hash.slice(6)).match(/^[a-z0-9-]+/) || [''])[0];
    setTimeout(() => {
      openDetailModal(itemId);
    }, 200);
  } else if (hash && hash.length > 1) {
    const targetId = (decodeURIComponent(hash.slice(1)).match(/^[a-z0-9-]+/) || [''])[0];
    if (targetId) {
      setTimeout(() => {
        scrollToSection(targetId);
      }, 200);
    }
  }
}

function formatMarkdownBold(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2A2521]">$1</strong>');
}


/**
 * ====================================================================
 * QUẢN LÝ MODAL BẢNG KIỂM KÊ 37 DI TÍCH LỊCH SỬ - VĂN HÓA XÃ NHÃ NAM
 * ====================================================================
 */
function openRelicsInventoryModal(targetGroupId = null) {
  const modal = document.getElementById('relics-inventory-modal');
  if (!modal) return;
  state.lastFocus = document.activeElement;
  renderRelicsInventoryModalContent();
  modal.classList.remove('hidden');
  lockScroll();
  const input = document.getElementById('inventory-modal-search');
  if (input) {
    input.value = '';
  }
  if (targetGroupId) {
    setTimeout(() => {
      const targetEl = document.getElementById(`inventory-group-${targetGroupId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.classList.add('ring-2', 'ring-[#C59B27]');
        setTimeout(() => targetEl.classList.remove('ring-2', 'ring-[#C59B27]'), 2500);
      }
    }, 250);
  } else if (input) {
    setTimeout(() => input.focus(), 100);
  }
}

function closeRelicsInventoryModal() {
  const modal = document.getElementById('relics-inventory-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    unlockScroll();
    state.lastFocus?.focus?.({ preventScroll: true });
    state.lastFocus = null;
  }
}

function openLegalPrivacyModal() {
  const modal = document.getElementById('legal-privacy-modal');
  if (!modal) return;
  state.lastFocus = document.activeElement;
  modal.classList.remove('hidden');
  lockScroll();
  modal.querySelector('button')?.focus({ preventScroll: true });
}

function closeLegalPrivacyModal() {
  const modal = document.getElementById('legal-privacy-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    unlockScroll();
    state.lastFocus?.focus?.({ preventScroll: true });
    state.lastFocus = null;
  }
}

function openCommuneEmblemModal() {
  const modal = document.getElementById('commune-emblem-modal');
  if (!modal) return;
  state.lastFocus = document.activeElement;
  modal.classList.remove('hidden');
  lockScroll();
  modal.querySelector('button')?.focus({ preventScroll: true });
}

function closeCommuneEmblemModal() {
  const modal = document.getElementById('commune-emblem-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    unlockScroll();
    state.lastFocus?.focus?.({ preventScroll: true });
    state.lastFocus = null;
  }
}

function filterInventoryModal(value) {
  renderRelicsInventoryModalContent(value);
}

function renderRelicsInventoryModalContent(keyword = '') {
  const container = document.getElementById('inventory-modal-content');
  if (!container) return;
  if (typeof OFFICIAL_COMMUNE_RELICS === 'undefined' ||!OFFICIAL_COMMUNE_RELICS.groups) return;

  const kw = (keyword || '').toLowerCase().trim();

  const groupsHtml = OFFICIAL_COMMUNE_RELICS.groups.map(group => {
    const filteredItems = group.items.filter(item => {
      if (!kw) return true;
      const name = (item.name || '').toLowerCase();
      const type = (item.type || '').toLowerCase();
      return name.includes(kw) || type.includes(kw);
    });

    if (kw && filteredItems.length === 0) return '';

    return `
      <div id="inventory-group-${group.id}" class="rounded-2xl border border-[#EADECF] p-4 bg-[#FDFBF7] transition-all duration-300">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[rgba(44,30,24,0.1)]">
          <div class="flex items-center gap-2">
            <span class="text-[#8B1E1E]">${ic(group.icon, 'w-5 h-5')}</span>
            <div>
              <h4 class="font-heritage-serif font-bold text-base text-[#8B1E1E]">
                ${group.name}
              </h4>
              <span class="text-xs text-[#786C5E]">${group.subName}</span>
            </div>
          </div>
          <span class="eyebrow self-start sm:self-auto">
            ${filteredItems.length} / ${group.count} di tích
          </span>
        </div>

        <p class="text-xs text-[#5C5248] mb-3 leading-relaxed">
          ${group.description}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${filteredItems.map((item, idx) => {
            const hasDetail =!!item.featuredId;
            return `
              <div class="p-2.5 rounded-xl bg-white border border-[#EADECF]/70 flex items-center justify-between gap-2 hover:border-[#8B1E1E]/50 transition-colors shadow-xs">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <span class="w-5 h-5 rounded-full bg-[#F5EFE6] text-[#8B1E1E] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      ${idx + 1}
                    </span>
                    <strong class="text-xs sm:text-sm text-[#2A2521] truncate font-semibold block">
                      ${escapeHtml(item.name)}
                    </strong>
                  </div>
                  ${item.type? `<span class="text-[11px] text-[#786C5E] block truncate pl-6">${escapeHtml(item.type)}</span>`: ''}
                </div>
                ${hasDetail? `
                  <button 
                    type="button" 
                    onclick="closeRelicsInventoryModal(); openDetailModal('${item.featuredId}');" 
                    class="px-2.5 py-1 rounded-lg bg-[#8B1E1E] hover:bg-[#6F1515] text-white text-[11px] font-bold transition-colors whitespace-nowrap flex-shrink-0 shadow-sm cursor-pointer"
                    title="Xem hồ sơ số hóa chi tiết">
                    Xem hồ sơ ${ic('arrow-right','w-3.5 h-3.5')}
                  </button>
                `: `
                  <span class="flex items-center gap-3 flex-shrink-0 text-xs">
                    <button type="button" class="spec-action !ml-0" onclick="showInventoryRelicOnMap('${escapeHtml(item.name)}')" title="Xem vị trí trên bản đồ của trang">Bản đồ</button>
                    <a class="spec-action !ml-0" href="${inventoryDirectionsUrl(item.name)}" target="_blank" rel="noopener noreferrer" title="Chỉ đường trên Google Maps">Chỉ đường ↗</a>
                  </span>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = groupsHtml || `
    <div class="text-center py-8 text-[#786C5E] text-xs bg-white rounded-2xl border border-[#EADECF]">
      Không tìm thấy di tích nào phù hợp với từ khóa "<strong>${escapeHtml(kw)}</strong>".
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#039;');
}

/**
 * ====================================================================
 * BẢN ĐỒ TUYẾN HÀNH TRÌNH TƯƠNG TÁC (INTERACTIVE HERITAGE ROUTES LOGIC)
 * ====================================================================
 */
let activeRouteId = null;

function selectRoute(routeId) {
  if (typeof HERITAGE_ROUTES === 'undefined') return;
  const route = HERITAGE_ROUTES.find(r => r.id === routeId);
  if (!route) return;

  activeRouteId = routeId;

  // 1. Cập nhật trạng thái active trên các thẻ Tuyến
  ['tuyen-1', 'tuyen-2', 'tuyen-3'].forEach(id => {
    const card = document.getElementById(`route-card-${id}`);
    if (card) {
      if (id === routeId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
  });

  // Bỏ active tất cả chip di tích đơn lẻ
  document.querySelectorAll('.route-relic-chip').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-[#8B1E1E]', 'bg-[#8B1E1E]', 'text-white');
  });

  // Ẩn thanh công cụ di tích đơn lẻ
  const singleToolbar = document.getElementById('route-single-relic-toolbar');
  if (singleToolbar) {
    singleToolbar.classList.add('hidden');
    singleToolbar.classList.remove('flex');
  }

  // 2. Chuyển iframe bản đồ hiển thị toàn bộ lộ trình liên hoàn của cụm di tích
  updateMapFrame(route.mapEmbedUrl, `Lộ trình tuyến ${route.number}: ${route.title} (${route.subtitle})`, route.directionsUrl, 'Mở Google Maps dẫn đường cả tuyến ↗');

  // 3. Cập nhật nút 1: Khởi hành từ vị trí của bạn (tới điểm đầu tuyến)
  const fromUserBtn = document.getElementById('route-from-user-directions-btn');
  const fromUserLabel = document.getElementById('route-from-user-directions-label');
  if (fromUserBtn && route.startDirectionsUrl) {
    fromUserBtn.href = route.startDirectionsUrl;
  }
  if (fromUserLabel && route.startDirectionsText) {
    fromUserLabel.textContent = route.startDirectionsText;
  }

  // 4. Cập nhật nút 2: Lộ trình liên hoàn cả tuyến
  const dirBtn = document.getElementById('heritage-route-directions-btn');
  const dirLabel = document.getElementById('route-directions-label');
  if (dirBtn && route.directionsUrl) {
    dirBtn.href = route.directionsUrl;
  }
  if (dirLabel && route.directionsText) {
    dirLabel.textContent = route.directionsText;
  }
}

let currentActiveRelicId = null;

function selectRouteRelic(relicId, event) {
  if (event) {
    event.stopPropagation();
  }

  // Nếu người dùng bấm lại vào đúng chip di tích đang được zoom chọn: mở ngay hồ sơ chi tiết!
  if (currentActiveRelicId === relicId) {
    openDetailModal(relicId);
    return;
  }
  currentActiveRelicId = relicId;

  // Tự động kích hoạt thẻ Tuyến cha nếu chưa chọn
  if (typeof HERITAGE_ROUTES !== 'undefined') {
    const parentRoute = HERITAGE_ROUTES.find(r => r.relicIds && r.relicIds.includes(relicId));
    if (parentRoute && activeRouteId !== parentRoute.id) {
      activeRouteId = parentRoute.id;
      ['tuyen-1', 'tuyen-2', 'tuyen-3'].forEach(id => {
        const card = document.getElementById(`route-card-${id}`);
        if (card) {
          if (id === parentRoute.id) card.classList.add('active');
          else card.classList.remove('active');
        }
      });
      const fromUserBtn = document.getElementById('route-from-user-directions-btn');
      const fromUserLabel = document.getElementById('route-from-user-directions-label');
      if (fromUserBtn && parentRoute.startDirectionsUrl) fromUserBtn.href = parentRoute.startDirectionsUrl;
      if (fromUserLabel && parentRoute.startDirectionsText) fromUserLabel.textContent = parentRoute.startDirectionsText;

      const dirBtn = document.getElementById('heritage-route-directions-btn');
      const dirLabel = document.getElementById('route-directions-label');
      if (dirBtn && parentRoute.directionsUrl) dirBtn.href = parentRoute.directionsUrl;
      if (dirLabel && parentRoute.directionsText) dirLabel.textContent = parentRoute.directionsText;
    }
  }

  // Cập nhật trạng thái active chip
  document.querySelectorAll('.route-relic-chip').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-[#8B1E1E]', 'bg-[#8B1E1E]', 'text-white');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('ring-2', 'ring-[#8B1E1E]', 'bg-[#8B1E1E]', 'text-white');
  }

  // 1. Zoom iframe bản đồ vào đúng vị trí tọa độ di tích được chọn
  const relic = (typeof TANGIBLE_HERITAGE_DATA !== 'undefined') ? TANGIBLE_HERITAGE_DATA.find(r => r.id === relicId) : null;
  if (relic && relic.map && relic.map.embedUrl) {
    let zoomUrl = relic.map.embedUrl;
    if (!zoomUrl.includes('&z=')) {
      zoomUrl = zoomUrl.replace('&output=embed', '&z=16&output=embed');
    }
    updateMapFrame(zoomUrl, `Vị trí di tích: ${relic.title} (${relic.address})`, relic.map.directionsUrl, `Chỉ đường tới ${relic.shortTitle || relic.title} ↗`);

    // 2. Hiển thị thanh công cụ dẫn đường riêng tới di tích này
    const singleToolbar = document.getElementById('route-single-relic-toolbar');
    const singleDirBtn = document.getElementById('route-single-relic-dir-btn');
    const singleDirLabel = document.getElementById('route-single-relic-dir-label');
    const openDocBtn = document.getElementById('route-relic-doc-btn');
    
    if (singleToolbar) {
      singleToolbar.classList.remove('hidden');
      singleToolbar.classList.add('flex');
    }
    if (singleDirBtn && relic.map.directionsUrl) {
      singleDirBtn.href = relic.map.directionsUrl;
    }
    if (singleDirLabel) {
      singleDirLabel.textContent = `Chỉ đường riêng đến ${relic.shortTitle || relic.title} (từ vị trí của bạn)`;
    }
    if (openDocBtn) {
      openDocBtn.style.display = 'inline-flex';
      openDocBtn.onclick = () => openDetailModal(relicId);
      openDocBtn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> <span>Xem hồ sơ ${escapeHtml(relic.shortTitle || relic.title)}</span>`;
    }

    // Cuộn nhẹ tới bản đồ trên thiết bị di động
    if (window.innerWidth < 1024) {
      const mapContainer = document.getElementById('heritage-route-map-frame');
      if (mapContainer) {
        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}

function restoreActiveRouteOverview() {
  currentActiveRelicId = null;
  const routeId = activeRouteId || 'tuyen-1';
  selectRoute(routeId);
}

function resetToCommuneMap() {
  currentActiveRelicId = null;
  const singleToolbar = document.getElementById('route-single-relic-toolbar');
  if (singleToolbar) {
    singleToolbar.classList.add('hidden');
    singleToolbar.classList.remove('flex');
  }
  document.querySelectorAll('.route-relic-chip').forEach(btn => {
    btn.classList.remove('ring-2', 'ring-[#8B1E1E]', 'bg-[#8B1E1E]', 'text-white');
  });
  activeRouteId = null;

  // 1. Xóa trạng thái active của cả 3 tuyến
  ['tuyen-1', 'tuyen-2', 'tuyen-3'].forEach(id => {
    const card = document.getElementById(`route-card-${id}`);
    if (card) card.classList.remove('active');
  });

  // 2. Khôi phục iframe bản đồ toàn xã
  const defaultMap = (typeof DEFAULT_COMMUNE_MAP !== 'undefined') ? DEFAULT_COMMUNE_MAP : {
    embedUrl: "https://www.google.com/maps?q=21.4404,106.0965&z=14&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4404,106.0965",
    directionsText: "Chỉ đường từ vị trí của bạn đến trung tâm xã Nhã Nam (UBND xã Nhã Nam)"
  };

  updateMapFrame(defaultMap.embedUrl, 'Bản đồ tổng thể vùng di sản xã Nhã Nam, thành phố Bắc Ninh', defaultMap.directionsUrl, 'Mở Google Maps chỉ đường ↗');

  // 3. Khôi phục các nút dẫn đường
  const fromUserBtn = document.getElementById('route-from-user-directions-btn');
  const fromUserLabel = document.getElementById('route-from-user-directions-label');
  if (fromUserBtn) fromUserBtn.href = defaultMap.directionsUrl;
  if (fromUserLabel) fromUserLabel.textContent = defaultMap.directionsText;

  const dirBtn = document.getElementById('heritage-route-directions-btn');
  const dirLabel = document.getElementById('route-directions-label');
  if (dirBtn) dirBtn.href = defaultMap.directionsUrl;
  if (dirLabel) dirLabel.textContent = "Chỉ đường tới trung tâm xã Nhã Nam";
}

function updateMapFrame(newUrl, captionText, directionsUrl, btnText) {
  const iframe = document.getElementById('heritage-route-map-frame');
  const caption = document.getElementById('active-route-map-caption');
  const indicator = document.getElementById('map-loading-indicator');
  const openDirectBtn = document.getElementById('open-map-direct-btn');

  if (caption && captionText) {
    caption.textContent = captionText;
  }
  if (openDirectBtn) {
    if (directionsUrl) openDirectBtn.href = directionsUrl;
    if (btnText) {
      const textSpan = openDirectBtn.querySelector('span');
      if (textSpan) textSpan.textContent = btnText;
    }
  }

  if (!iframe) return;

  iframe.style.opacity = '0.35';
  if (indicator) indicator.style.opacity = '1';

  setTimeout(() => {
    iframe.src = newUrl;
    iframe.onload = () => {
      iframe.style.opacity = '1';
      if (indicator) indicator.style.opacity = '0';
    };
    setTimeout(() => {
      iframe.style.opacity = '1';
      if (indicator) indicator.style.opacity = '0';
    }, 500);
  }, 150);
}

function filterRelicsByActiveRoute() {
  const routeId = activeRouteId || 'tuyen-1';
  // Nếu chưa chọn tuyến nào, tự động kích hoạt Tuyến 1
  if (!activeRouteId) {
    selectRoute('tuyen-1');
  }
  filterRelicsByRoute(routeId);
}

function filterRelicsByRoute(routeId) {
  state.activeRouteFilter = routeId;
  state.currentCategory = 'all';

  // Cập nhật giao diện các tab
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-category') === 'all';
    if (isTarget) {
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active', 'bg-[#8B1E1E]', 'text-white');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  applyFiltersAndRender();

  const explorerEl = document.getElementById('heritage-explorer');
  if (explorerEl) {
    explorerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function clearRouteFilter() {
  state.activeRouteFilter = null;
  applyFiltersAndRender();
}


/**
 * Đặt lại toàn bộ bộ lọc tìm kiếm và danh mục về mặc định (Tránh kẹt bộ lọc khi tìm kiếm rỗng)
 */
function resetAllFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  state.searchQuery = '';

  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.add('hidden');

  state.activeRouteFilter = null;
  state.currentCategory = 'all';

  // Cập nhật giao diện các tab danh mục
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    const cat = btn.getAttribute('data-category');
    if (cat === 'all') {
      btn.className = 'category-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 bg-[#8B1E1E] text-white border border-[#8B1E1E] is-active';
    } else {
      btn.className = 'category-tab-btn px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#F5EFE6] transition-all flex items-center gap-2 border border-[#EADECF] bg-white';
    }
  });

  applyFiltersAndRender();
  showToastNotification('Đã hiển thị lại toàn bộ kho tư liệu di sản!', 'info');
}


/**
 * Lọc trực tiếp theo cấp xếp hạng di tích từ 4 ô thống kê trên trang chủ
 */
function filterByRankDirect(rankCategory) {
  // Xóa bộ lọc tuyến và từ khóa để tập trung vào cấp xếp hạng
  state.activeRouteFilter = null;
  state.searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.add('hidden');

  setCategoryFilter(rankCategory);

  // Cuộn mượt mà đến khu vực danh sách di tích
  const explorerSection = document.getElementById('heritage-explorer');
  if (explorerSection) {
    explorerSection.scrollIntoView({ behavior: 'smooth' });
  }

  const rankNames = {
    'quoc-gia-dac-biet': '08 di tích quốc gia đặc biệt',
    'quoc-gia': '01 di tích cấp quốc gia (chùa Tứ Giáp)',
    'cap-tinh': '07 di tích cấp tỉnh'
  };
  const label = rankNames[rankCategory] || rankCategory;
  showToastNotification(`Đang hiển thị ${label}`, 'info');
}

/**
 * ====================================================================
 * BỘ ĐẾM LƯỢT TRUY CẬP (VISITOR COUNTER)
 * Công thức: Tổng hiển thị = Base count + Lượt truy cập thật
 * Chống F5 ảo: Mỗi phiên (tab) chỉ hit 1 lần, các lần sau gọi get
 * Fallback an toàn: Có mạng hay mất mạng đều hiển thị số mượt mà
 * ====================================================================
 */
function initVisitorCounter() {
  const displayEl = document.getElementById('visitor-counter-display');
  if (!displayEl) return;

  const cfg = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.visitorCounter)
    ? SITE_CONFIG.visitorCounter
    : {
        enabled: true,
        baseCount: 6241,
        namespace: "di-san-nha-nam-thpt-bac-ninh",
        endpoint: "https://countapi.mileshilliard.com/api/v1"
      };

  if (cfg.enabled === false) return;

  const base = cfg.baseCount || 6241;
  let cachedVal = null;
  try {
    cachedVal = localStorage.getItem('nhanam_cached_visitors');
  } catch (e) {
    // localStorage có thể bị tắt trên trình duyệt ẩn danh
  }
  const cachedNum = cachedVal ? parseInt(cachedVal, 10) : 0;
  const initialDisplay = (cachedNum >= base) ? cachedNum : base;

  // Hiển thị ngay số cached hoặc base để không bị trống hay giật giao diện
  displayEl.textContent = initialDisplay.toLocaleString('vi-VN');

  // Xác định phiên truy cập: mỗi phiên mở tab mới chỉ ghi nhận 1 lượt thật, F5 không tăng ảo
  const sessionKey = 'nhanam_visited_session';
  let hasVisitedThisSession = false;
  try {
    hasVisitedThisSession = !!sessionStorage.getItem(sessionKey);
  } catch (e) {}

  const action = hasVisitedThisSession ? 'get' : 'hit';
  const apiUrl = `${cfg.endpoint}/${action}/${cfg.namespace}`;

  if (typeof fetch === 'function') {
    fetch(apiUrl, { headers: { 'Accept': 'application/json' } })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.value === 'number') {
          try {
            if (!hasVisitedThisSession) {
              sessionStorage.setItem(sessionKey, '1');
            }
          } catch (e) {}
          const total = base + data.value;
          try {
            localStorage.setItem('nhanam_cached_visitors', total.toString());
          } catch (e) {}
          displayEl.textContent = total.toLocaleString('vi-VN');
        }
      })
      .catch(err => {
        // Fallback an toàn: nếu API bị chặn hoặc mất mạng, giữ nguyên số cached
        console.warn('Visitor counter API fallback:', err);
      });
  }
}
