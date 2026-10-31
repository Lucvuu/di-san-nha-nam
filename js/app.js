/**
 * ====================================================================
 * DI SẢN VĂN HÓA XÃ NHÃ NAM - XỬ LÝ ỨNG DỤNG CHÍNH (APPLICATION LOGIC)
 * Xã Nhã Nam, tỉnh Bắc Ninh
 * Đơn vị khởi xướng & phối hợp: Trường THPT Nhã Nam
 * ====================================================================
 */

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
  quizAnswers: {},
  quizSubmitted: false,
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
  try { initAudioPlayerSettings(); } catch (e) { console.warn('initAudioPlayerSettings error:', e); }
}

let currentTrackIndex = 0;

function getActivePlaylist() {
  return (typeof MUSIC_PLAYLIST!== 'undefined' && MUSIC_PLAYLIST.length)? MUSIC_PLAYLIST: [
    {
      id: "nha-nam-trong-toi",
      title: "Nhã Nam trong tôi",
      artist: "Ca khúc truyền thống",
      src: "./nha-nam-trong-toi.mp3",
      fallbackSrc: "./assets/audio/nha-nam-trong-toi.mp3"
    },
    {
      id: "thpt-nha-nam",
      title: "THPT Nhã Nam",
      artist: "Trường THPT Nhã Nam",
      src: "./thpt-nha-nam.mp3",
      fallbackSrc: "./assets/audio/thpt-nha-nam.mp3"
    }
  ];
}

/**
 * Khởi tạo thiết lập âm lượng và danh sách phát nhạc (Playlist Loop)
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

    // Tự động chuyển bài khi kết thúc và lặp lại danh sách (Playlist Loop)
    bgMusic.onended = () => {
      nextTrack(true);
    };

    // Xử lý nếu tải lỗi file gốc thì thử sang fallbackSrc
    bgMusic.onerror = () => {
      const track = playlist[currentTrackIndex];
      if (track && track.fallbackSrc && bgMusic.src!== track.fallbackSrc) {
        bgMusic.src = track.fallbackSrc;
        if (state.isAudioPlaying) {
          bgMusic.play().catch(e => console.warn('Audio fallback play error:', e));
        }
      }
    };
  }

  updateMusicPlayerUI();
}

/**
 * Hiển thị các thông tin cấu hình từ SITE_CONFIG lên giao diện
 */
function renderConfigElements() {
  const adminNameEls = document.querySelectorAll('.site-admin-name');
  adminNameEls.forEach(el => el.textContent = SITE_CONFIG.adminName);

  const adminPhoneEls = document.querySelectorAll('.site-admin-phone');
  adminPhoneEls.forEach(el => el.textContent = SITE_CONFIG.adminPhone);

  const adminRoleEls = document.querySelectorAll('.site-admin-role');
  adminRoleEls.forEach(el => el.textContent = SITE_CONFIG.adminRole);

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
    "Đình - chùa Hả",
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
    <button type="button" class="quick-tag px-3 py-1.5 text-xs font-medium rounded-full bg-[#F5EFE6] text-[#5C5248] border border-[#EADECF] hover:bg-[#8B1E1E] hover:text-white transition duration-200" data-tag="${tag}">
      # ${tag}
    </button>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = tag;
        state.searchQuery = tag;
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
  }

  state.filteredItems = items;
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
        <span class="w-2 h-2 rounded-full bg-[#8B1E1E]"></span>
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
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  gridContainer.innerHTML = items.map(item => {
    const isVatThe = item.category === 'vat-the';
    const locationIcon = isVatThe 
? `<svg class="w-4 h-4 text-[#8B1E1E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
: `<svg class="w-4 h-4 text-[#C59B27] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`;

    const locationLabel = isVatThe? 'Địa chỉ': 'Phạm vi';
    const locationValue = isVatThe? item.address: item.scope;

    const isFav = state.favorites.includes(item.id);

    return `
      <article class="heritage-card rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition duration-300 group">
        <!-- Ảnh đại diện -->
        <div class="relative h-56 sm:h-64 overflow-hidden bg-[#EADECF] cursor-pointer" onclick="openDetailModal('${item.id}')">
          ${item.hasRealPhoto && item.thumbnail? `
            <img 
              src="${item.thumbnail}" 
              alt="${escapeHtml(item.title)}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onerror="handleImageError(this)"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
          `: `
            <div class="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF5EE] via-[#F3ECE0] to-[#EAE0D0] overflow-hidden">
              <img 
                src="./assets/trong-dong-ngoc-lu-real.png" 
                alt="" 
                aria-hidden="true"
                class="absolute -right-10 -bottom-10 w-44 h-44 opacity-[0.14] pointer-events-none select-none mix-blend-multiply" 
              />
              <div class="relative z-10 flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-white/90 border border-[#C59B27]/40 shadow-xs flex items-center justify-center text-xl mb-1.5 text-[#8B1E1E]">
                  ${ic('landmark','w-6 h-6')}
                </div>
                <span class="max-w-[15rem] px-3 py-1.5 rounded-xl bg-white/95 border border-[#C59B27]/40 shadow-xs text-[11px] leading-snug font-semibold text-[#8B1E1E]">
                  Ảnh tư liệu thực tế tại di tích đang được Ban biên tập cập nhật
                </span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>
          `}
          
          <!-- Huy hiệu phân loại -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${isVatThe? 'bg-[#8B1E1E] text-white': 'bg-[#8B6914] text-white'}">
              ${escapeHtml(item.badge || item.categoryName)}
            </span>
            ${item.relicType? `
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-sm text-white/95 border border-white/20">
                ${escapeHtml(item.relicType)}
              </span>
            `: ''}
          </div>

          <!-- Nút Yêu thích / Lưu lại -->
          <button 
            type="button" 
            onclick="event.stopPropagation(); toggleFavorite('${item.id}');" 
            title="${isFav? 'Bỏ lưu': 'Lưu lại di tích này'}"
            aria-label="${isFav? 'Bỏ lưu di tích ' + escapeHtml(item.title): 'Lưu lại di tích ' + escapeHtml(item.title)}"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#8B1E1E] hover:bg-white transition shadow">
            <svg class="w-5 h-5 ${isFav? 'text-[#8B1E1E] fill-[#8B1E1E]': 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <!-- Tên di tích nằm đè góc ảnh -->
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h3 class="font-heritage-serif font-bold text-lg leading-snug drop-shadow-md group-hover:text-[#F6E05E] transition-colors">
              ${escapeHtml(item.title)}
            </h3>
          </div>
        </div>

        <!-- Thân Card -->
        <div class="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <!-- Quyết định xếp hạng (nếu có) -->
            ${item.decision? `
              <div class="mb-2.5 px-2.5 py-1.5 rounded-lg bg-[#FFF5F5] border border-[#FED7D7] text-xs font-medium text-[#8B1E1E] flex items-center gap-1.5">
                <span class="font-bold flex-shrink-0 inline-flex items-center gap-1">${ic('scroll','w-3.5 h-3.5')} QĐ:</span>
                <span class="line-clamp-1" title="${escapeHtml(item.decision)}">${escapeHtml(item.decision)}</span>
              </div>
            `: ''}

            <!-- Đối tượng thờ (nếu có) -->
            ${item.worship? `
              <div class="mb-2.5 px-2.5 py-1.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#78350F]">
                <strong class="font-semibold text-[#8B1E1E]">Thờ phụng:</strong> ${escapeHtml(item.worship)}
              </div>
            `: ''}

            <!-- Địa chỉ / Phạm vi thực hành -->
            <div class="flex items-start gap-2 text-xs text-[#5C5248] mb-3 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EADECF]/60">
              ${locationIcon}
              <div class="leading-relaxed">
                <div><strong class="font-semibold text-[#2A2521]">${locationLabel}:</strong> ${escapeHtml(locationValue)}</div>
                ${item.oldAddress? `<div class="text-[11px] text-[#786C5E] mt-0.5"><span class="font-medium text-[#5C5248]">Trước 01/7/2025:</span> ${escapeHtml(item.oldAddress)}</div>`: ''}
              </div>
            </div>

            <!-- Tóm tắt -->
            <p class="text-sm text-[#5C5248] line-clamp-3 leading-relaxed mb-4">
              ${escapeHtml(item.overview)}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${(item.tags || []).slice(0, 3).map(t => `
                <span class="text-[11px] px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#786C5E] font-medium">#${escapeHtml(t)}</span>
              `).join('')}
            </div>
          </div>

          <!-- Dải biểu tượng đa phương tiện (Nhiệm vụ 3) -->
          <div class="mb-3 pt-2.5 border-t border-[#EADECF]/70 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
            <span class="font-semibold text-[#8B1E1E] flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]"></span>
              Đa phương tiện:
            </span>
            <div class="flex items-center gap-1 flex-wrap">
              <span class="px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#2A2521] border border-[#EADECF] font-medium" title="Ảnh tư liệu thực tế">
                ${ic('image','w-3.5 h-3.5')} ${item.hasRealPhoto? 'Ảnh thực tế': 'Ảnh đang cập nhật'}
              </span>
              <span class="px-2 py-0.5 rounded-md bg-[#FFF5F5] text-[#8B1E1E] border border-[#FED7D7] font-medium" title="Thuyết minh âm thanh tự động">
                ${ic('volume','w-3.5 h-3.5')} Thuyết minh
              </span>
              <span class="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-medium" title="Bản đồ Google Maps & Dẫn đường">
                ${ic('map','w-3.5 h-3.5')} Bản đồ
              </span>
              <span class="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] font-medium" title="Tải file Word (.docx) bài giới thiệu">
                ${ic('file-text','w-3.5 h-3.5')} File giới thiệu
              </span>
            </div>
          </div>

          <!-- Nút hành động xem chi tiết & video -->
          <div class="pt-3 border-t border-[#EADECF]/60 flex flex-col gap-2">
            ${item.id === 'vat-the-1' ? `
              <button 
                type="button" 
                onclick="event.stopPropagation(); openDetailModal('${item.id}'); setTimeout(() => document.getElementById('modal-video-section')?.scrollIntoView({behavior: 'smooth'}), 350);"
                class="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition shadow-xs" 
                aria-label="Xem video Lễ tế cờ Đề Nắm">
                <span>🎬 Xem video Lễ tế cờ Đề Nắm</span>
              </button>
            ` : (item.video ? `
              <button 
                type="button" 
                onclick="event.stopPropagation(); openDetailModal('${item.id}'); setTimeout(() => document.getElementById('modal-video-section')?.scrollIntoView({behavior: 'smooth'}), 350);"
                class="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition shadow-xs" 
                aria-label="Xem video tư liệu ${escapeHtml(item.title)}">
                <span>🎬 Xem video tư liệu</span>
              </button>
            ` : '')}

            <div class="flex items-center justify-between gap-2">
              <button 
                type="button" 
                onclick="openDetailModal('${item.id}')"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white ${isVatThe? 'bg-[#8B1E1E] hover:bg-[#6F1515]': 'bg-[#8B6914] hover:bg-[#6F540F]'} transition shadow-sm hover:shadow">
                <span>Xem chi tiết & bản đồ</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>

              <a 
                href="${item.map.directionsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Chỉ đường trên Google Maps"
                class="p-2.5 rounded-xl border border-[#EADECF] hover:border-[#8B1E1E] text-[#5C5248] hover:text-[#8B1E1E] transition-colors"
                aria-label="Chỉ đường đến ${escapeHtml(item.title)}">
                <svg class="w-5 h-5 text-[#8B1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              </a>
            </div>
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
        <p class="text-base text-[#4A4036] font-medium leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#8B1E1E]/15">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Giá trị và ý nghĩa lịch sử vẻ vang:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.historicalSignificance || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Đặc trưng kiến trúc và điêu khắc:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.architecture || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.studyNote? `
          <div class="mt-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-sm">
            <div class="font-bold flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              Góc học tập và giáo dục truyền thống (Trường THPT Nhã Nam):
            </div>
            <p class="leading-relaxed">${escapeHtml(item.content.studyNote)}</p>
          </div>
        `: ''}
      </div>
    `;
  } else {
    section3Html = `
      <div class="space-y-4 text-[#2A2521] leading-relaxed">
        <p class="text-base text-[#4A4036] font-medium leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#C59B27]/30">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Nguồn gốc và ý nghĩa văn hóa:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.originAndMeaning || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Nghi thức, hoạt động và thực hành:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.ritualsAndActivities || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.preservationValue? `
          <div class="mt-4 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-sm">
            <div class="font-bold flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              Giá trị bảo tồn và giáo dục thế hệ trẻ (Trường THPT Nhã Nam):
            </div>
            <p class="leading-relaxed">${escapeHtml(item.content.preservationValue)}</p>
          </div>
        `: ''}
      </div>
    `;
  }

  state.lightboxImages = item.gallery || [];

  container.innerHTML = `
    <!-- Thanh điều hướng và nút thao tác trên modal -->
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#EADECF]">
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold ${isVatThe? 'bg-[#8B1E1E] text-white': 'bg-[#8B6914] text-white'}">
          ${item.categoryName}
        </span>
        <span class="text-xs text-[#786C5E] font-medium">Mã số: #${item.id}</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          onclick="copyToClipboard('${getHeritageShareUrl(item.id)}', 'Đã sao chép liên kết di tích!')"
          title="Sao chép liên kết mở thẳng hồ sơ này"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5EFE6] text-[#5C5248] hover:bg-[#EADECF] transition-colors">
          ${ic('link')}
          <span>Sao chép liên kết</span>
        </button>

        <!-- Nút in tài liệu học tập -->
        <button 
          type="button" 
          onclick="window.print()" 
          title="In tài liệu này"
          class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5EFE6] text-[#5C5248] hover:bg-[#EADECF] transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span>In tài liệu</span>
        </button>

        <!-- Nút đóng modal -->
        <button 
          type="button" 
          onclick="closeDetailModal()" aria-label="Đóng hồ sơ di tích"
          class="w-8 h-8 rounded-full bg-[#F5EFE6] text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#EADECF] flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>

    <!-- ================================================================
         NỘI DUNG CHÍNH XÁC 5 PHẦN THEO YÊU CẦU BẮT BUỘC
         ================================================================ -->
    <div class="space-y-8">
      
      <!-- PHẦN 1: TÊN DI TÍCH / TÊN DI SẢN -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <h2 class="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#8B1E1E] leading-tight">
          ${escapeHtml(item.title)}
        </h2>
        ${item.badge? `
          <div class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]">
            <svg class="w-4 h-4 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ${item.badge}
          </div>
        `: ''}

        <!-- RICH MEDIA BAR: ĐIỀU HƯỚNG NHANH 5 ĐỊNH DẠNG ĐA PHƯƠNG TIỆN -->
        <div class="rich-media-bar mt-4 flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#FAF5EE] border border-[#EADECF] text-xs">
          <button type="button" onclick="document.getElementById('audioguide-section')?.scrollIntoView({behavior: 'smooth'})" class="px-3 py-1.5 rounded-lg font-semibold bg-white text-[#8B1E1E] border border-[#EADECF] hover:bg-[#F5EFE6] transition flex items-center gap-1.5 shadow-xs">
            ${ic('volume', 'w-3.5 h-3.5')} <span>Nghe thuyết minh</span>
          </button>
          ${item.docFile ? `
            <a href="${item.docFile.path}" download="${escapeHtml(item.docFile.fileName)}" class="px-3 py-1.5 rounded-lg font-semibold bg-white text-[#1E40AF] border border-[#EADECF] hover:bg-[#EFF6FF] transition flex items-center gap-1.5 shadow-xs">
              ${ic('download', 'w-3.5 h-3.5')} <span>Tải file chữ (.docx)</span>
            </a>
          ` : ''}
          ${item.video ? `
            <button type="button" onclick="document.getElementById('modal-video-section')?.scrollIntoView({behavior: 'smooth'})" class="px-3 py-1.5 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1.5 shadow-xs">
              <span>🎬</span> <span>Xem video tư liệu</span>
            </button>
          ` : ''}
          <a href="${item.map.directionsUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg font-semibold bg-white text-[#166534] border border-[#EADECF] hover:bg-[#F0FDF4] transition flex items-center gap-1.5 shadow-xs">
            ${ic('map', 'w-3.5 h-3.5')} <span>Chỉ đường Google Maps</span>
          </a>
        </div>
      </section>

      <section id="audioguide-section" class="border-b border-[#EADECF]/80 pb-6">
      <!-- BẢN GHI ÂM THUYẾT MINH THỰC TẾ (NẾU CÓ) -->
      ${item.audioFile ? `
        <div class="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#FFFBEB] border border-[#C59B27]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              ${ic('volume', 'w-5 h-5')}
            </div>
            <div>
              <div class="text-xs font-bold text-[#8B1E1E] flex items-center gap-1.5">
                <span>Bản ghi âm thuyết minh tư liệu thực tế</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Âm thanh gốc</span>
              </div>
              <div class="text-[11px] text-[#5C5248] mt-0.5">${escapeHtml(item.audioFile.title)} (Tư liệu Trường THPT Nhã Nam)</div>
            </div>
          </div>
          <audio id="modal-real-audio" controls class="h-9 w-full sm:w-64 max-w-full rounded-lg" preload="none">
            <source src="${item.audioFile.src}" type="audio/mpeg">
            Trình duyệt không hỗ trợ nghe âm thanh.
          </audio>
        </div>
      ` : ''}
      <!-- NGHE THUYẾT MINH TỰ ĐỘNG (Web Speech API vi-VN) -->
      <div class="flex flex-col">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span id="audioguide-voice-info" class="text-xs text-[#92400E] font-medium flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse inline-block"></span>
                <span>Thuyết minh giọng tiếng Việt</span>
              </span>
            </div>

            <!-- Tùy chỉnh tốc độ đọc -->
            <div class="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-[#EADECF] text-xs">
              <span class="text-[11px] text-[#786C5E] px-1 font-semibold">Tốc độ:</span>
              <button type="button" onclick="changeAudioGuideRate(0.85)" id="speed-085" class="speed-selector-btn px-2 py-0.5 rounded font-bold text-[#5C5248] hover:bg-[#F5EFE6]">0.85x</button>
              <button type="button" onclick="changeAudioGuideRate(1.0)" id="speed-100" class="speed-selector-btn is-active px-2 py-0.5 rounded font-bold text-white bg-[#8B1E1E]">1.0x</button>
              <button type="button" onclick="changeAudioGuideRate(1.2)" id="speed-120" class="speed-selector-btn px-2 py-0.5 rounded font-bold text-[#5C5248] hover:bg-[#F5EFE6]">1.2x</button>
            </div>
          </div>

          <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-1">
            Nghe thuyết minh di tích
          </h3>
          <p class="text-xs text-[#5C5248] leading-relaxed mb-3">
            Bấm nút phát để nghe thuyết minh truyền cảm về lịch sử và văn hóa Nhã Nam. Đồng thời theo dõi bản ghi câu bên dưới (có thể bấm vào từng câu để nghe trực tiếp).
          </p>
        </div>

        <!-- Các nút điều khiển chính -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <!-- Nút Phát / Tạm dừng chính -->
          <button 
            id="btn-modal-audioguide"
            type="button" 
            onclick="toggleAudioGuideNarration()"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#8B1E1E] hover:bg-[#6F1515] text-white shadow-md transition active:scale-95">
            <span class="flex items-center gap-1" id="audioguide-wave">
              <span class="audio-wave-bar audio-wave-bar-1"></span>
              <span class="audio-wave-bar audio-wave-bar-2"></span>
              <span class="audio-wave-bar audio-wave-bar-3"></span>
              <span class="audio-wave-bar audio-wave-bar-4"></span>
            </span>
            <span id="audioguide-btn-label">Bật thuyết minh</span>
          </button>

          <!-- Nút Dừng lại -->
          <button 
            id="btn-audioguide-stop"
            type="button" 
            onclick="stopAudioGuideNarration()"
            title="Dừng thuyết minh và về câu đầu"
            class="px-3 py-2 rounded-xl font-semibold text-xs bg-white text-[#5C5248] hover:text-[#8B1E1E] border border-[#EADECF] hover:bg-[#F5EFE6] transition shadow-xs">
            ${ic('square','w-3.5 h-3.5')} Dừng
          </button>

          <!-- Nút Nghe lại từ đầu -->
          <button 
            id="btn-audioguide-restart"
            type="button" 
            onclick="restartAudioGuideNarration()"
            title="Đọc lại từ đầu"
            class="px-3 py-2 rounded-xl font-semibold text-xs bg-white text-[#5C5248] hover:text-[#8B1E1E] border border-[#EADECF] hover:bg-[#F5EFE6] transition shadow-xs">
            ${ic('rotate','w-3.5 h-3.5')} Đọc lại
          </button>

          <span id="audioguide-status-badge" class="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#EADECF] text-[#8B1E1E]">
            Sẵn sàng phát
          </span>
        </div>

        <!-- BẢN GHI LỜI THUYẾT MINH TƯƠNG TÁC (INTERACTIVE TRANSCRIPT BOX) -->
        <div class="bg-white rounded-xl border border-[#EADECF] p-3 shadow-inner">
          <div class="flex items-center justify-between text-[11px] font-bold text-[#8B1E1E] mb-1.5 pb-1 border-b border-[#F5EFE6]">
            <span class="inline-flex items-center gap-1">${ic('scroll','w-3.5 h-3.5')} Lời thuyết minh chi tiết (bấm câu bất kỳ để nghe):</span>
            <span class="text-[#786C5E] font-normal italic">Tự động đồng bộ</span>
          </div>
          <div id="audioguide-transcript-container" class="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs leading-relaxed">
            <!-- Render danh sách câu qua initAudioGuideForModal -->
          </div>
        </div>

      </div>
      </section>

      <!-- PHẦN 2: ĐỊA CHỈ / PHẠM VI -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2">${isVatThe? 'Địa chỉ cụ thể': 'Phạm vi thực hành di sản'}</h3>
        <div class="bg-[#FDFBF7] p-4 rounded-xl border border-[#EADECF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-[#8B1E1E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <div>
              <div class="text-xs text-[#786C5E] font-medium mb-0.5">${isVatThe? 'Địa chỉ': 'Địa bàn cộng đồng'}:</div>
              <div class="text-base font-semibold text-[#2A2521] leading-snug">
                ${escapeHtml(isVatThe? item.address: item.scope)}
              </div>
            </div>
          </div>
          <button 
            type="button" 
            onclick="copyToClipboard('${escapeHtml(isVatThe? item.address: item.scope)}', 'Đã sao chép địa chỉ!')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5C5248] border border-[#EADECF] hover:bg-[#F5EFE6] transition-colors flex items-center gap-1.5 flex-shrink-0">
            <svg class="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Sao chép
          </button>
        </div>
      </section>

      <!-- PHẦN 3: NỘI DUNG VỀ DI TÍCH / NỘI DUNG DI SẢN -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-3">${isVatThe? 'Nội dung về di tích': 'Nội dung di sản'}</h3>
        ${section3Html}
      </section>

      <!-- PHẦN 4: CHỈ DẪN ĐI ĐẾN ĐÓ BẰNG GOOGLE MAP -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-3">Chỉ dẫn đường đi bằng Google Maps</h3>
        
        <div class="rounded-2xl overflow-hidden border border-[#EADECF] shadow-sm bg-[#F5EFE6]">
          <div class="relative w-full h-72 sm:h-80 bg-gray-200">
            <iframe 
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

          <div class="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EADECF]">
            <div class="text-xs text-[#5C5248] text-center sm:text-left">
              <span class="font-bold text-[#8B1E1E]">Địa điểm:</span> ${escapeHtml(item.map.locationName || item.title)}
            </div>
            
            <a 
              href="${item.map.directionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#8B1E1E] hover:bg-[#6F1515] shadow-md hover:shadow-lg transition duration-200">
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
            <p class="text-xs text-[#786C5E] mt-1">Thầy cô, học sinh có ảnh chụp thật tại di tích xin gửi qua Zalo cô Mến 0962.629.650.</p>
          </div>
        `}

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${(item.gallery || []).map((img, idx) => `
            <div 
              class="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-[#EADECF] bg-[#F5EFE6]"
              onclick="openLightbox(${idx})">
              <img 
                src="${img.url}" 
                alt="${escapeHtml(img.caption || item.title)}" 
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      <section class="border-t border-[#EADECF]/80 pt-5">
        <h3 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-3">Tài liệu giới thiệu</h3>
        <div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div class="font-semibold text-[#2A2521]">${escapeHtml(item.docFile.title)}</div>
              <div class="text-xs text-[#5C5248]">${escapeHtml(item.docFile.fileName)} • ${escapeHtml(item.docFile.size || '')}</div>
            </div>
            <a href="${item.docFile.path}" download="${escapeHtml(item.docFile.fileName)}"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-[#8B1E1E] hover:bg-[#6F1515] shadow-sm transition-colors">
              ${ic('download')} Tải file chữ giới thiệu (.docx)
            </a>
          </div>
          <h4 class="font-semibold text-[#2A2521] mb-2 flex items-center gap-2">${ic('book','w-4 h-4 text-[#8B1E1E]')} Nội dung chi tiết về di tích</h4>
          <div id="doc-fulltext" class="doc-fulltext bg-[#FDFBF7] rounded-xl border border-[#EADECF] p-4 sm:p-5 max-h-[32rem] overflow-y-auto text-sm leading-relaxed text-[#2A2521]">
            <p class="text-[#786C5E] italic">Đang tải nội dung…</p>
          </div>
        </div>
      </section>
      `: ''}

    </div>
  `;

  if (item.docFile) renderDocFullText(item.docFile.fileName);

  if (modal.classList.contains('hidden')) state.lastFocus = document.activeElement;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  container.querySelector('button[onclick="closeDetailModal()"]')?.focus({ preventScroll: true });
  initAudioGuideForModal(item);
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
      s.src = './js/doc-texts.js?v=3.0.1';
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
    if (!el || state.selectedItem?.docFile?.fileName !== fileName) return;
    const paras = texts[fileName] || [];
    if (!paras.length) {
      el.innerHTML = '<p class="text-[#786C5E] italic">Chưa trích được nội dung, vui lòng tải file .docx ở trên.</p>';
      return;
    }
    el.innerHTML = paras.map(t => {
      const letters = t.replace(/[^\p{L}]/gu, '');
      const isHeading = t.length < 140 && letters.length > 3 && (letters === letters.toUpperCase() || /^[IVX]+\.\s/.test(t));
      if (isHeading) return `<h5 class="font-bold text-[#8B1E1E] mt-4 mb-1">${escapeHtml(t)}</h5>`;
      if (/^[•\-+]\s/.test(t)) return `<p class="pl-4 -indent-3 mb-1.5">${escapeHtml(t)}</p>`;
      return `<p class="mb-3 text-justify">${escapeHtml(t)}</p>`;
    }).join('');
  }).catch(() => {
    const el = box();
    if (el) el.innerHTML = '<p class="text-[#786C5E] italic">Không tải được nội dung. Vui lòng tải file .docx ở trên.</p>';
  });
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

  // Dừng bản ghi âm thực tế nếu đang phát
  const realAudio = modal.querySelector('#modal-real-audio');
  if (realAudio) {
    try {
      realAudio.pause();
      realAudio.currentTime = 0;
    } catch (e) {}
  }

  modal.classList.add('hidden');
  document.body.style.overflow = '';
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

  // Xây dựng nội dung bài thuyết minh giàu cảm xúc và truyền cảm
  let story = `Chào mừng quý thầy cô và các bạn học sinh đến với ${item.title}. `;
  story += `${item.categoryName} tiêu biểu của xã Nhã Nam, tỉnh Bắc Ninh. `;
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
        <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse inline-block"></span>
        <span>Giọng tiếng Việt (${escapeHtml(voiceInfo.name || 'Chuẩn')})</span>
      `;
    } else {
      voiceInfoEl.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
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
function toggleAudioGuideNarration() {
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
  }
}

/**
 * ====================================================================
 * FACEBOOK GROUP SECTION & MODAL THÔNG BÁO THÂN THIỆN
 * ====================================================================
 */
function handleJoinFacebookGroup() {
  const url = SITE_CONFIG.facebookGroupUrl;
  
  if (!url || url.trim() === '#' || url.trim() === '') {
    showFacebookComingSoonModal();
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function showFacebookComingSoonModal() {
  const modal = document.getElementById('facebook-notice-modal');
  if (modal) {
    modal.classList.remove('hidden');
  } else {
    showToastNotification(
      'Nhóm Facebook đang được ban điều hành và cô Mến thiết lập. Đường dẫn sẽ sớm được cập nhật!',
      'info',
      5000
    );
  }
}

function closeFacebookNoticeModal() {
  const modal = document.getElementById('facebook-notice-modal');
  if (modal) {
    modal.classList.add('hidden');
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
function getQuizList() {
  if (typeof QUIZ_DATA!== 'undefined' && Array.isArray(QUIZ_DATA) && QUIZ_DATA.length > 0) {
    return QUIZ_DATA;
  }
  if (typeof HERITAGE_QUIZ_DATA!== 'undefined' && Array.isArray(HERITAGE_QUIZ_DATA) && HERITAGE_QUIZ_DATA.length > 0) {
    return HERITAGE_QUIZ_DATA;
  }
  return [];
}

function renderQuiz() {
  const container = document.getElementById('quiz-questions-container');
  if (!container) return;

  const quizList = getQuizList();
  if (quizList.length === 0) {
    container.innerHTML = '<p class="text-xs text-[#5C5248]">Đang tải câu hỏi trắc nghiệm…</p>';
    return;
  }

  container.innerHTML = quizList.map((q, qIndex) => `
    <div class="p-5 rounded-2xl bg-white border border-[#EADECF] shadow-sm mb-4">
      <div class="flex items-start gap-3 mb-3">
        <span class="w-7 h-7 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
          ${qIndex + 1}
        </span>
        <h4 class="font-semibold text-base text-[#2A2521] leading-snug">
          ${escapeHtml(q.question)}
        </h4>
      </div>

      <div class="space-y-2 pl-10">
        ${q.options.map((opt, optIndex) => `
          <label class="quiz-option-label flex items-center gap-3 p-3 rounded-xl border border-[#EADECF] hover:bg-[#FDFBF7] cursor-pointer transition-colors text-sm text-[#4A4036]">
            <input 
              type="radio" 
              name="quiz-q-${q.id}" 
              value="${optIndex}" 
              onchange="handleSelectQuizAnswer(${q.id}, ${optIndex})"
              class="w-4 h-4 text-[#8B1E1E] focus:ring-[#8B1E1E] border-gray-300"
            />
            <span class="leading-relaxed">${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>

      <div id="quiz-explanation-${q.id}" class="hidden mt-3 pl-10 text-xs p-3 rounded-xl bg-[#F5EFE6] text-[#5C5248] leading-relaxed border border-[#C59B27]/30">
      </div>
    </div>
  `).join('');
}

function handleSelectQuizAnswer(questionId, optionIndex) {
  state.quizAnswers[questionId] = optionIndex;
}

function submitQuiz() {
  const quizList = getQuizList();
  const totalQuestions = quizList.length;
  const answeredCount = Object.keys(state.quizAnswers).length;

  if (answeredCount < totalQuestions) {
    showToastNotification(`Bạn hãy hoàn thành đủ ${totalQuestions} câu hỏi nhé! (Đã làm: ${answeredCount}/${totalQuestions})`, 'warning');
    return;
  }

  let score = 0;
  quizList.forEach(q => {
    const userAnswer = state.quizAnswers[q.id];
    const explanationEl = document.getElementById(`quiz-explanation-${q.id}`);

    if (userAnswer === q.correctAnswer) {
      score++;
      if (explanationEl) {
        explanationEl.className = 'mt-3 pl-10 text-xs p-3 rounded-xl bg-green-50 text-green-800 leading-relaxed border border-green-200 block';
        explanationEl.innerHTML = `<strong>Chính xác!</strong> ${escapeHtml(q.explanation)}`;
      }
    } else {
      if (explanationEl) {
        explanationEl.className = 'mt-3 pl-10 text-xs p-3 rounded-xl bg-red-50 text-red-800 leading-relaxed border border-red-200 block';
        explanationEl.innerHTML = `<strong>Chưa đúng:</strong> Đáp án đúng là <em>"${escapeHtml(q.options[q.correctAnswer])}"</em>.<br>${escapeHtml(q.explanation)}`;
      }
    }
  });

  state.quizSubmitted = true;
  showQuizResultModal(score, totalQuestions);
}

function showQuizResultModal(score, total) {
  let badgeTitle = 'Nhà tìm hiểu di sản Nhã Nam';
  let message = 'Bạn hãy tiếp tục khám phá thêm các di tích lịch sử tuyệt đẹp tại Nhã Nam nhé!';
  
  if (score === 5) {
    badgeTitle = 'Xuất sắc! Đại sứ di sản THPT Nhã Nam';
    message = 'Tuyệt vời! Bạn am hiểu rất sâu sắc về truyền thống lịch sử hào hùng quê hương Nhã Nam!';
  } else if (score >= 3) {
    badgeTitle = 'Khá Giỏi! Tự Hào Quê Hương Nhã Nam';
    message = 'Rất tốt! Bạn đã nắm được những nét đặc sắc nhất của di sản văn hóa địa phương.';
  }

  const resultContainer = document.getElementById('quiz-result-content');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="text-center py-4">
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-[#FFFBEB] border-2 border-[#C59B27] flex items-center justify-center text-3xl">
          ${ic(score === 5? 'trophy': 'star', 'w-8 h-8 text-[#8B6914]')}
        </div>
        <h3 class="font-heritage-serif text-2xl font-bold text-[#8B1E1E] mb-2">${badgeTitle}</h3>
        <div class="text-4xl font-extrabold text-[#2A2521] mb-2">
          ${score} / ${total}
        </div>
        <p class="text-sm text-[#5C5248] max-w-sm mx-auto mb-6 leading-relaxed">
          ${message}
        </p>
        <div class="flex items-center justify-center gap-3">
          <button 
            type="button" 
            onclick="resetQuiz()" 
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5EFE6] text-[#5C5248] hover:bg-[#EADECF] transition-colors">
            Làm lại bài kiểm tra
          </button>
          <button 
            type="button" 
            onclick="closeQuizResultModal()" 
            class="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#6F1515] transition-colors">
            Đóng
          </button>
        </div>
      </div>
    `;
  }

  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeQuizResultModal() {
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.classList.add('hidden');
}

function resetQuiz() {
  state.quizAnswers = {};
  state.quizSubmitted = false;
  closeQuizResultModal();
      closeRelicsInventoryModal();
  renderQuiz();
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
 * TRÌNH PHÁT NHẠC CA KHÚC QUÊ HƯƠNG ("NHÃ NAM TRONG TÔI" & "THPT NHÃ NAM")
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

  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.title = state.isAudioPlaying? `Tạm dừng: ${track.title}`: `Phát bài: ${track.title}`;
  }
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
      showToastNotification(`Đang phát ca khúc: ${track.title} (${track.artist || 'THPT Nhã Nam'})`, 'success');
    } catch (err) {
      console.warn('Playback error, trying fallback:', err);
      if (track.fallbackSrc) {
        bgMusic.src = track.fallbackSrc;
        try {
          await bgMusic.play();
          state.isAudioPlaying = true;
          updateMusicPlayerUI();
          showToastNotification(`Đang phát ca khúc: ${track.title}`, 'success');
        } catch (e2) {
          showToastNotification('Chạm vào màn hình để bắt đầu phát nhạc', 'info');
        }
      }
    }
  }
}

/**
 * Chuyển sang bài tiếp theo trong Playlist
 */
async function nextTrack(auto = false) {
  const bgMusic = document.getElementById('bg-music');
  const playlist = getActivePlaylist();
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  const track = playlist[currentTrackIndex];

  if (bgMusic) {
    bgMusic.src = track.src;
    bgMusic.currentTime = 0;
    try {
      await bgMusic.play();
      state.isAudioPlaying = true;
      updateMusicPlayerUI();
      if (!auto) {
        showToastNotification(`Đã chuyển bài: ${track.title}`, 'success');
      }
    } catch (err) {
      console.warn('Next track playback error:', err);
      if (track.fallbackSrc) {
        bgMusic.src = track.fallbackSrc;
        bgMusic.play().then(() => {
          state.isAudioPlaying = true;
          updateMusicPlayerUI();
        }).catch(e => console.warn(e));
      }
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
      closeDetailModal();
      closeLightbox();
      closeFacebookNoticeModal();
      closeQuizResultModal();
      if (typeof closeRelicsInventoryModal === 'function') closeRelicsInventoryModal();
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
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', isHidden? 'false': 'true');
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
    const itemId = hash.replace('#item=', '');
    setTimeout(() => {
      openDetailModal(itemId);
    }, 200);
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
function openRelicsInventoryModal() {
  const modal = document.getElementById('relics-inventory-modal');
  if (!modal) return;
  renderRelicsInventoryModalContent();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('inventory-modal-search');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }
}

function closeRelicsInventoryModal() {
  const modal = document.getElementById('relics-inventory-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
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
      <div class="rounded-2xl border border-[#EADECF] p-4 bg-[#FDFBF7]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#EADECF]/80">
          <div class="flex items-center gap-2">
            <span class="text-[#8B1E1E]">${ic(group.icon, 'w-5 h-5')}</span>
            <div>
              <h4 class="font-heritage-serif font-bold text-base text-[#8B1E1E]">
                ${group.name}
              </h4>
              <span class="text-xs text-[#786C5E]">${group.subName}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${group.badgeClass} self-start sm:self-auto shadow-sm">
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
                  <span class="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0">
                    Trong danh mục
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

  // 2. Chuyển iframe bản đồ mượt mà
  updateMapFrame(route.mapEmbedUrl, `Bản đồ Tuyến ${route.number}: ${route.title} (${route.subtitle})`);

  // 3. Cập nhật nút dẫn đường
  const dirBtn = document.getElementById('heritage-route-directions-btn');
  const dirLabel = document.getElementById('route-directions-label');
  if (dirBtn && route.directionsUrl) {
    dirBtn.href = route.directionsUrl;
  }
  if (dirLabel && route.directionsText) {
    dirLabel.textContent = route.directionsText;
  }
}

function selectRouteRelic(relicId, event) {
  if (event) {
    event.stopPropagation();
  }

  // 1. Zoom iframe bản đồ vào đúng di tích
  const relic = (typeof TANGIBLE_HERITAGE_DATA!== 'undefined')? TANGIBLE_HERITAGE_DATA.find(r => r.id === relicId): null;
  if (relic && relic.map && relic.map.embedUrl) {
    updateMapFrame(relic.map.embedUrl, `${relic.title} - ${relic.address}`);

    const dirBtn = document.getElementById('heritage-route-directions-btn');
    const dirLabel = document.getElementById('route-directions-label');
    if (dirBtn && relic.map.directionsUrl) {
      dirBtn.href = relic.map.directionsUrl;
    }
    if (dirLabel) {
      dirLabel.textContent = `Dẫn đường đến ${relic.shortTitle || relic.title}`;
    }
  }

  // 2. Mở trực tiếp Modal thông tin chi tiết
  if (typeof openDetailModal === 'function') {
    openDetailModal(relicId);
  }
}

function resetToCommuneMap() {
  activeRouteId = null;

  // 1. Xóa trạng thái active của cả 3 tuyến
  ['tuyen-1', 'tuyen-2', 'tuyen-3'].forEach(id => {
    const card = document.getElementById(`route-card-${id}`);
    if (card) card.classList.remove('active');
  });

  // 2. Khôi phục iframe bản đồ toàn xã
  const defaultMap = (typeof DEFAULT_COMMUNE_MAP!== 'undefined')? DEFAULT_COMMUNE_MAP: {
    embedUrl: "https://www.google.com/maps?q=Nh%C3%A3+Nam,+B%E1%BA%AFc+Ninh&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=UBND+xã+Nhã+Nam,+tỉnh+Bắc+Ninh",
    directionsText: "Dẫn đường đến trung tâm xã Nhã Nam"
  };

  updateMapFrame(defaultMap.embedUrl, 'Bản đồ tổng thể xã Nhã Nam, tỉnh Bắc Ninh');

  // 3. Khôi phục nút dẫn đường
  const dirBtn = document.getElementById('heritage-route-directions-btn');
  const dirLabel = document.getElementById('route-directions-label');
  if (dirBtn) dirBtn.href = defaultMap.directionsUrl;
  if (dirLabel) dirLabel.textContent = defaultMap.directionsText;
}

function updateMapFrame(newUrl, captionText) {
  const iframe = document.getElementById('heritage-route-map-frame');
  const caption = document.getElementById('active-route-map-caption');
  const indicator = document.getElementById('map-loading-indicator');

  if (caption && captionText) {
    caption.textContent = captionText;
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
