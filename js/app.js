/**
 * ====================================================================
 * DI SẢN VĂN HÓA NHÃ NAM - XỬ LÝ ỨNG DỤNG CHÍNH (APPLICATION LOGIC)
 * Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang
 * ====================================================================
 */

// Trạng thái ứng dụng (Application State)
const state = {
  currentCategory: 'all', // 'all' | 'vat-the' | 'phi-vat-the'
  searchQuery: '',
  allItems: [...TANGIBLE_HERITAGE_DATA, ...INTANGIBLE_HERITAGE_DATA],
  filteredItems: [],
  selectedItem: null,
  lightboxImages: [],
  lightboxIndex: 0,
  favorites: JSON.parse(localStorage.getItem('nhanam_heritage_favorites') || '[]'),
  quizAnswers: {},
  quizSubmitted: false,
  isAudioPlaying: false
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderConfigElements();
  renderQuickSearchTags();
  updateCategoryCounts();
  applyFiltersAndRender();
  setupEventListeners();
  renderQuiz();
  checkUrlHash();
}

/**
 * Hiển thị các thông tin cấu hình từ SITE_CONFIG lên giao diện
 */
function renderConfigElements() {
  // Cập nhật thông tin Ban điều hành và số điện thoại
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

  container.innerHTML = QUICK_SEARCH_TAGS.map(tag => `
    <button type="button" class="quick-tag px-3 py-1.5 text-xs font-medium rounded-full bg-[#F5EFE6] text-[#5C5248] border border-[#EADECF] hover:bg-[#8B1E1E] hover:text-white transition-all duration-200" data-tag="${tag}">
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
 * Cập nhật số lượng di sản trên các Tab
 */
function updateCategoryCounts() {
  const totalCount = state.allItems.length;
  const vatTheCount = TANGIBLE_HERITAGE_DATA.length;
  const phiVatTheCount = INTANGIBLE_HERITAGE_DATA.length;

  const countAllEl = document.getElementById('count-all');
  if (countAllEl) countAllEl.textContent = totalCount;

  const countVatTheEl = document.getElementById('count-vat-the');
  if (countVatTheEl) countVatTheEl.textContent = vatTheCount;

  const countPhiVatTheEl = document.getElementById('count-phi-vat-the');
  if (countPhiVatTheEl) countPhiVatTheEl.textContent = phiVatTheCount;
}

/**
 * Lọc danh sách và hiển thị thẻ di sản
 */
function applyFiltersAndRender() {
  let items = state.allItems;

  // Lọc theo danh mục
  if (state.currentCategory === 'vat-the') {
    items = items.filter(item => item.category === 'vat-the');
  } else if (state.currentCategory === 'phi-vat-the') {
    items = items.filter(item => item.category === 'phi-vat-the');
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

    const locationLabel = isVatThe ? 'Địa chỉ' : 'Phạm vi';
    const locationValue = isVatThe ? item.address : item.scope;

    const isFav = state.favorites.includes(item.id);

    return `
      <article class="heritage-card rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 group">
        <!-- Ảnh đại diện -->
        <div class="relative h-56 sm:h-64 overflow-hidden bg-[#EADECF] cursor-pointer" onclick="openDetailModal('${item.id}')">
          <img 
            src="${item.thumbnail}" 
            alt="${escapeHtml(item.title)}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80';"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
          
          <!-- Huy hiệu phân loại -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${isVatThe ? 'bg-[#8B1E1E] text-white' : 'bg-[#C59B27] text-white'}">
              ${item.categoryName}
            </span>
            ${item.badge ? `
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-sm text-white/95 border border-white/20">
                ${item.badge}
              </span>
            ` : ''}
          </div>

          <!-- Nút Yêu thích / Lưu lại -->
          <button 
            type="button" 
            onclick="event.stopPropagation(); toggleFavorite('${item.id}');" 
            title="${isFav ? 'Bỏ lưu' : 'Lưu lại di tích này'}"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#8B1E1E] hover:bg-white transition-all shadow">
            <svg class="w-5 h-5 ${isFav ? 'text-[#8B1E1E] fill-[#8B1E1E]' : 'fill-none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <!-- Tên ngắn di tích nằm đè góc ảnh -->
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h3 class="font-heritage-serif font-bold text-lg leading-snug drop-shadow-md group-hover:text-[#F6E05E] transition-colors">
              ${escapeHtml(item.title)}
            </h3>
          </div>
        </div>

        <!-- Thân Card -->
        <div class="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <!-- Địa chỉ / Phạm vi thực hành -->
            <div class="flex items-start gap-2 text-xs text-[#5C5248] mb-3 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EADECF]/60">
              ${locationIcon}
              <div class="leading-relaxed">
                <strong class="font-semibold text-[#2A2521]">${locationLabel}:</strong> ${escapeHtml(locationValue)}
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

          <!-- Nút hành động xem chi tiết -->
          <div class="pt-3 border-t border-[#EADECF]/60 flex items-center justify-between gap-2">
            <button 
              type="button" 
              onclick="openDetailModal('${item.id}')"
              class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white ${isVatThe ? 'bg-[#8B1E1E] hover:bg-[#6F1515]' : 'bg-[#C59B27] hover:bg-[#A67C18]'} transition-all shadow-sm hover:shadow">
              <span>Xem chi tiết & Bản đồ</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

            <a 
              href="${item.map.directionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Chỉ đường trên Google Maps"
              class="w-10 h-10 rounded-xl border border-[#EADECF] flex items-center justify-center text-[#8B1E1E] hover:bg-[#F5EFE6] transition-colors flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * ====================================================================
 * CHI TIẾT DI TÍCH / DI SẢN (DETAIL MODAL)
 * Hiển thị chính xác 5 mục theo đúng yêu cầu:
 * 1. Tên di tích / di sản
 * 2. Địa chỉ / Phạm vi
 * 3. Nội dung về di tích / di sản
 * 4. Chỉ dẫn đi đến đó bằng Google Map (kèm iframe và button)
 * 5. Thư viện ảnh di tích / di sản (kèm lightbox preview)
 * ====================================================================
 */
function openDetailModal(itemId) {
  const item = state.allItems.find(i => i.id === itemId);
  if (!item) return;

  state.selectedItem = item;
  const isVatThe = item.category === 'vat-the';
  const modal = document.getElementById('heritage-detail-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  // Cập nhật URL Hash không làm reload trang
  history.replaceState(null, '', `#item=${item.id}`);

  // Tạo nội dung cho Mục 3 tùy theo loại di sản
  let section3Html = '';
  if (isVatThe) {
    // Di sản Vật thể: Giới thiệu, Ý nghĩa lịch sử, Kiến trúc nghệ thuật, Lưu ý học tập
    section3Html = `
      <div class="space-y-4 text-[#2A2521] leading-relaxed">
        <p class="text-base text-[#4A4036] font-medium leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border-l-4 border-[#8B1E1E]">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Giá trị & Ý nghĩa Lịch sử Vẻ vang:
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
            Đặc trưng Kiến trúc & Điêu khắc:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.architecture || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.studyNote ? `
          <div class="mt-4 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-sm">
            <div class="font-bold flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              Góc học tập & Giáo dục truyền thống:
            </div>
            <p class="leading-relaxed">${escapeHtml(item.content.studyNote)}</p>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    // Di sản Phi vật thể: Giới thiệu, Nguồn gốc & Ý nghĩa, Nghi thức & Hoạt động, Giá trị bảo tồn
    section3Html = `
      <div class="space-y-4 text-[#2A2521] leading-relaxed">
        <p class="text-base text-[#4A4036] font-medium leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border-l-4 border-[#C59B27]">
          ${escapeHtml(item.content.intro)}
        </p>

        <div>
          <h4 class="font-heritage-serif font-bold text-lg text-[#8B1E1E] mb-2 flex items-center gap-2">
            <svg class="w-5 h-5 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            Nguồn gốc & Ý nghĩa Văn hóa:
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
            Nghi thức, Hoạt động & Thực hành:
          </h4>
          <ul class="space-y-2 text-sm text-[#4A4036] list-disc list-inside pl-2">
            ${(item.content.ritualsAndActivities || []).map(point => `
              <li class="leading-relaxed">${formatMarkdownBold(point)}</li>
            `).join('')}
          </ul>
        </div>

        ${item.content.preservationValue ? `
          <div class="mt-4 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-sm">
            <div class="font-bold flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              Giá trị Bảo tồn & Giáo dục Thế hệ trẻ:
            </div>
            <p class="leading-relaxed">${escapeHtml(item.content.preservationValue)}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Chuẩn bị danh sách ảnh cho Lightbox
  state.lightboxImages = item.gallery || [];

  container.innerHTML = `
    <!-- Thanh điều hướng và nút thao tác trên modal -->
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#EADECF]">
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold ${isVatThe ? 'bg-[#8B1E1E] text-white' : 'bg-[#C59B27] text-white'}">
          ${item.categoryName}
        </span>
        <span class="text-xs text-[#786C5E] font-medium">Mã số: #${item.id}</span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Nút đọc văn bản cho học sinh -->
        <button 
          id="btn-tts-speaker"
          type="button" 
          onclick="handleSpeechRead()"
          title="Đọc tóm tắt văn bản"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5EFE6] text-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          <span id="tts-label">Nghe giới thiệu</span>
        </button>

        <!-- Nút in tài liệu học tập -->
        <button 
          type="button" 
          onclick="window.print()" 
          title="In tài liệu này"
          class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F5EFE6] text-[#5C5248] hover:bg-[#EADECF] transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span>In tài liệu</span>
        </button>

        <!-- Nút đóng modal -->
        <button 
          type="button" 
          onclick="closeDetailModal()"
          class="w-8 h-8 rounded-full bg-[#F5EFE6] text-[#5C5248] hover:text-[#8B1E1E] hover:bg-[#EADECF] flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>

    <!-- NỘI DUNG 5 PHẦN BẮT BUỘC -->
    <div class="space-y-8">
      
      <!-- PHẦN 1: TÊN DI TÍCH / TÊN DI SẢN -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-1">
          <span class="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs">1</span>
          ${isVatThe ? 'Tên Di Tích Lịch Sử' : 'Tên Di Sản Văn Hóa'}
        </div>
        <h2 class="font-heritage-serif text-2xl sm:text-3xl font-bold text-[#8B1E1E] leading-tight">
          ${escapeHtml(item.title)}
        </h2>
        ${item.badge ? `
          <div class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]">
            <svg class="w-4 h-4 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ${item.badge}
          </div>
        ` : ''}
      </section>

      <!-- PHẦN 2: ĐỊA CHỈ / PHẠM VI -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-2">
          <span class="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs">2</span>
          ${isVatThe ? 'Địa Chỉ Cụ Thể' : 'Phạm Vi Thực Hành Di Sản'}
        </div>
        <div class="bg-[#FDFBF7] p-4 rounded-xl border border-[#EADECF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-[#8B1E1E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <div>
              <div class="text-xs text-[#786C5E] font-medium mb-0.5">${isVatThe ? 'Địa chỉ' : 'Địa bàn cộng đồng'}:</div>
              <div class="text-base font-semibold text-[#2A2521] leading-snug">
                ${escapeHtml(isVatThe ? item.address : item.scope)}
              </div>
            </div>
          </div>
          <button 
            type="button" 
            onclick="copyToClipboard('${escapeHtml(isVatThe ? item.address : item.scope)}', 'Đã sao chép địa chỉ!')"
            class="px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-[#5C5248] border border-[#EADECF] hover:bg-[#F5EFE6] transition-colors flex items-center gap-1.5 flex-shrink-0">
            <svg class="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Sao chép
          </button>
        </div>
      </section>

      <!-- PHẦN 3: NỘI DUNG VỀ DI TÍCH / NỘI DUNG DI SẢN -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3">
          <span class="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs">3</span>
          ${isVatThe ? 'Nội Dung Về Di Tích' : 'Nội Dung Di Sản'}
        </div>
        ${section3Html}
      </section>

      <!-- PHẦN 4: CHỈ DẪN ĐI ĐẾN ĐÓ BẰNG GOOGLE MAP -->
      <section class="border-b border-[#EADECF]/80 pb-5">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3">
          <span class="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs">4</span>
          Chỉ Dẫn Đi Đến Đó Bằng Google Map
        </div>
        
        <div class="rounded-2xl overflow-hidden border border-[#EADECF] shadow-sm bg-[#F5EFE6]">
          <!-- Khung bản đồ iframe trực quan -->
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

          <!-- Nút bấm nổi bật mở chỉ đường ngoài trình duyệt -->
          <div class="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EADECF]">
            <div class="text-xs text-[#5C5248] text-center sm:text-left">
              <span class="font-bold text-[#8B1E1E]">Địa điểm:</span> ${escapeHtml(item.map.locationName || item.title)}
            </div>
            
            <a 
              href="${item.map.directionsUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#8B1E1E] hover:bg-[#6F1515] shadow-md hover:shadow-lg transition-all duration-200">
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
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27]">
            <span class="w-6 h-6 rounded-full bg-[#C59B27] text-white flex items-center justify-center text-xs">5</span>
            ${isVatThe ? 'Thư Viện Ảnh Về Di Tích' : 'Thư Viện Ảnh Di Tích / Di Sản'}
          </div>
          <span class="text-xs text-[#786C5E] font-medium">Nhấp vào ảnh để phóng to (Lightbox)</span>
        </div>

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
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80';"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white p-3">
                <span class="text-xs text-center font-medium line-clamp-2">${escapeHtml(img.caption || 'Phóng to ảnh')}</span>
              </div>
              <div class="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Đóng Modal chi tiết
 */
function closeDetailModal() {
  const modal = document.getElementById('heritage-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  stopTextToSpeech();
  // Xóa hash trên URL
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

/**
 * Xử lý giọng đọc tóm tắt di sản cho học sinh
 */
function handleSpeechRead() {
  if (!state.selectedItem) return;
  const item = state.selectedItem;
  const labelEl = document.getElementById('tts-label');

  const textToRead = `${item.title}. ${item.categoryName}. ${item.content.intro} ${item.overview}`;

  toggleTextToSpeech(textToRead, (isPlaying) => {
    if (labelEl) {
      labelEl.textContent = isPlaying ? 'Đang đọc...' : 'Nghe giới thiệu';
    }
    const btn = document.getElementById('btn-tts-speaker');
    if (btn) {
      if (isPlaying) {
        btn.classList.add('bg-[#8B1E1E]', 'text-white');
        btn.classList.remove('bg-[#F5EFE6]', 'text-[#8B1E1E]');
      } else {
        btn.classList.remove('bg-[#8B1E1E]', 'text-white');
        btn.classList.add('bg-[#F5EFE6]', 'text-[#8B1E1E]');
      }
    }
  });
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
  if (!current || !imgEl) return;

  imgEl.src = current.url;
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
  
  // Nếu url trống hoặc là "#", hiển thị thông báo thân thiện theo đúng yêu cầu
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
    // Fallback nếu modal chưa render
    showToastNotification(
      'Group Facebook hiện đang được Ban điều hành và Cô Mến thiết lập. Đường dẫn sẽ sớm được cập nhật!',
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
function renderQuiz() {
  const container = document.getElementById('quiz-questions-container');
  if (!container) return;

  container.innerHTML = QUIZ_DATA.map((q, qIndex) => `
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

      <div id="quiz-explanation-${q.id}" class="hidden mt-3 pl-10 text-xs p-3 rounded-xl bg-[#F5EFE6] text-[#5C5248] leading-relaxed border-l-2 border-[#C59B27]">
      </div>
    </div>
  `).join('');
}

function handleSelectQuizAnswer(questionId, optionIndex) {
  state.quizAnswers[questionId] = optionIndex;
}

function submitQuiz() {
  const totalQuestions = QUIZ_DATA.length;
  const answeredCount = Object.keys(state.quizAnswers).length;

  if (answeredCount < totalQuestions) {
    showToastNotification(`Bạn hãy hoàn thành đủ ${totalQuestions} câu hỏi nhé! (Đã làm: ${answeredCount}/${totalQuestions})`, 'warning');
    return;
  }

  let score = 0;
  QUIZ_DATA.forEach(q => {
    const userAnswer = state.quizAnswers[q.id];
    const explanationEl = document.getElementById(`quiz-explanation-${q.id}`);

    if (userAnswer === q.correctAnswer) {
      score++;
      if (explanationEl) {
        explanationEl.className = 'mt-3 pl-10 text-xs p-3 rounded-xl bg-green-50 text-green-800 leading-relaxed border-l-4 border-green-600 block';
        explanationEl.innerHTML = `<strong>Chính xác!</strong> ${escapeHtml(q.explanation)}`;
      }
    } else {
      if (explanationEl) {
        explanationEl.className = 'mt-3 pl-10 text-xs p-3 rounded-xl bg-red-50 text-red-800 leading-relaxed border-l-4 border-red-600 block';
        explanationEl.innerHTML = `<strong>Chưa đúng:</strong> Đáp án đúng là <em>"${escapeHtml(q.options[q.correctAnswer])}"</em>.<br>${escapeHtml(q.explanation)}`;
      }
    }
  });

  state.quizSubmitted = true;
  showQuizResultModal(score, totalQuestions);
}

function showQuizResultModal(score, total) {
  let badgeTitle = 'Nhà Tìm Hiểu Di Sản Nhã Nam';
  let message = 'Bạn hãy tiếp tục khám phá thêm các di tích lịch sử tuyệt đẹp tại Nhã Nam nhé!';
  
  if (score === 5) {
    badgeTitle = 'Xuất Sắc! Đại Sứ Di Sản Nhã Nam';
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
          ${score === 5 ? '🏆' : '🌟'}
        </div>
        <div class="text-xs uppercase font-bold tracking-wider text-[#C59B27] mb-1">Kết Quả Góc Học Tập</div>
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
            class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#6F1515] transition-colors">
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
  renderQuiz();
}

/**
 * ====================================================================
 * ÂM HƯỞNG TRUYỀN THỐNG (TRADITIONAL PENTATONIC AUDIO SYNTHESIZER)
 * Sử dụng Web Audio API tích hợp sẵn để tạo âm thanh ngũ cung du dương
 * ====================================================================
 */
let audioCtx = null;
let audioInterval = null;

function toggleTraditionalAudio() {
  const btn = document.getElementById('sound-toggle-btn');
  const label = document.getElementById('sound-toggle-label');

  if (state.isAudioPlaying) {
    stopTraditionalAudio();
    state.isAudioPlaying = false;
    if (btn) btn.classList.remove('playing');
    if (label) label.textContent = 'Bật nhạc truyền thống';
    showToastNotification('Đã tắt âm hưởng truyền thống', 'info');
  } else {
    startTraditionalAudio();
    state.isAudioPlaying = true;
    if (btn) btn.classList.add('playing');
    if (label) label.textContent = 'Đang phát nhạc dân gian';
    showToastNotification('Đang phát giai điệu truyền thống nhẹ nhàng', 'success');
  }
}

function startTraditionalAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Tần số thang ngũ cung Việt Nam (D4, E4, G4, A4, C5, D5, E5, G5)
    const pentatonicNotes = [293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

    function playNote() {
      if (!state.isAudioPlaying || !audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const note = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
      osc.type = 'sine'; // Âm thanh mềm mại tựa sáo trúc/đàn tranh
      osc.frequency.setValueAtTime(note, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.9);
    }

    playNote();
    audioInterval = setInterval(playNote, 1400);
  } catch (e) {
    console.warn('Audio API:', e);
  }
}

function stopTraditionalAudio() {
  if (audioInterval) {
    clearInterval(audioInterval);
    audioInterval = null;
  }
}

/**
 * ====================================================================
 * GẮN CÁC SỰ KIỆN TƯƠNG TÁC (EVENT LISTENERS)
 * ====================================================================
 */
function setupEventListeners() {
  // Thanh tìm kiếm
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

  // Các nút Tab lọc thể loại
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active', 'bg-[#8B1E1E]', 'text-white'));
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white');

      state.currentCategory = btn.getAttribute('data-category');
      applyFiltersAndRender();
    });
  });

  // Nút nhảy trực tiếp từ Hero Section
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

  // Nút cuộn lên đầu trang (Back to top)
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

  // Điều khiển bàn phím (ESC để đóng modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeLightbox();
      closeFacebookNoticeModal();
      closeQuizResultModal();
    } else if (e.key === 'ArrowLeft') {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox && !lightbox.classList.contains('hidden')) {
        prevLightboxImage();
      }
    } else if (e.key === 'ArrowRight') {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox && !lightbox.classList.contains('hidden')) {
        nextLightboxImage();
      }
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * Đặt danh mục lọc và đồng bộ trạng thái Tab
 */
function setCategoryFilter(category) {
  state.currentCategory = category;
  const tabButtons = document.querySelectorAll('.category-tab-btn');
  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active', 'bg-[#8B1E1E]', 'text-white');
    } else {
      btn.classList.remove('active', 'bg-[#8B1E1E]', 'text-white');
    }
  });
  applyFiltersAndRender();
}

/**
 * Cuộn mượt đến section
 */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Kiểm tra hash URL khi tải trang (ví dụ: #item=vat-the-1)
 */
function checkUrlHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#item=')) {
    const itemId = hash.replace('#item=', '');
    setTimeout(() => {
      openDetailModal(itemId);
    }, 200);
  }
}

/**
 * Định dạng Markdown đơn giản (chuyển **chữ đậm** thành <strong>)
 */
function formatMarkdownBold(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2A2521]">$1</strong>');
}

/**
 * Tránh lỗi XSS khi nhúng văn bản
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

