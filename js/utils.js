/**
 * ====================================================================
 * DI SẢN VĂN HÓA NHÃ NAM - CÁC HÀM TIỆN ÍCH HỖ TRỢ (UTILITIES)
 * Hỗ trợ tìm kiếm tiếng Việt không dấu, định dạng, Audio Guide, QR Code, Fallback ảnh
 * ====================================================================
 */

/**
 * Ảnh SVG dự phòng Di Sản Văn Hóa Việt Nam (Data URI)
 * Không bao giờ bị lỗi mạng hay 404, luôn hiển thị hình tượng mái đình rêu phong và hoa sen cổ truyền
 */
const HERITAGE_FALLBACK_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A1010"/>
      <stop offset="50%" stop-color="#8B1E1E"/>
      <stop offset="100%" stop-color="#2A0B0B"/>
    </linearGradient>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F6E05E" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#C59B27" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  <circle cx="400" cy="250" r="220" fill="url(#goldGlow)"/>
  <circle cx="400" cy="250" r="180" fill="none" stroke="#C59B27" stroke-width="2" stroke-dasharray="6,4" opacity="0.4"/>
  <circle cx="400" cy="250" r="130" fill="none" stroke="#F6E05E" stroke-width="1.5" opacity="0.5"/>
  <path d="M260 290 L400 170 L540 290 Q400 270 260 290 Z" fill="#C59B27" opacity="0.85"/>
  <path d="M220 290 Q250 280 270 265 L400 150 L530 265 Q550 280 580 290 Q400 265 220 290 Z" fill="#D4AF37"/>
  <rect x="300" y="285" width="200" height="110" fill="#2A0B0B" opacity="0.75" rx="4"/>
  <rect x="360" y="315" width="80" height="80" fill="#C59B27" rx="40" opacity="0.6"/>
  <text x="400" y="445" font-family="serif" font-size="24" font-weight="bold" fill="#F6E05E" text-anchor="middle" letter-spacing="2">DI SẢN VĂN HÓA NHÃ NAM</text>
  <text x="400" y="475" font-family="sans-serif" font-size="14" fill="#EADECF" text-anchor="middle">Trường THPT Nhã Nam • Tân Yên • Bắc Giang</text>
</svg>
`);

/**
 * Xử lý khi ảnh tải lỗi: tự động đổi sang SVG Di sản Việt Nam
 */
function handleImageError(img) {
  if (!img) return;
  img.onerror = null;
  img.src = HERITAGE_FALLBACK_SVG;
}

/**
 * Chuẩn hóa chuỗi tiếng Việt thành chuỗi không dấu, chữ thường
 * Đảm bảo tìm kiếm tiếng Việt chính xác 100% dù người dùng gõ có dấu hay không dấu.
 */
function removeVietnameseTones(str) {
  if (!str || typeof str !== 'string') return '';

  let normalized = str.toLowerCase();
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  normalized = normalized
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/[đ]/g, 'd');

  normalized = normalized
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
    .replace(/\u02C6|\u0306|\u031B/g, '');

  return normalized.trim();
}

/**
 * Kiểm tra xem một mục di sản có khớp với từ khóa tìm kiếm hay không
 */
function matchesSearchQuery(item, rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return true;

  const queryClean = removeVietnameseTones(rawQuery);
  const queryTokens = queryClean.split(/\s+/).filter(Boolean);

  const searchableParts = [
    item.title || '',
    item.shortTitle || '',
    item.address || '',
    item.scope || '',
    item.overview || '',
    item.badge || '',
    (item.tags || []).join(' '),
    (item.content && item.content.intro) || '',
    (item.content && item.content.preservationValue) || ''
  ];

  const fullSearchableText = removeVietnameseTones(searchableParts.join(' '));

  return queryTokens.every(token => fullSearchableText.includes(token));
}

/**
 * Sao chép văn bản vào Clipboard với thông báo phản hồi
 */
async function copyToClipboard(text, successMessage = 'Đã sao chép vào bộ nhớ tạm!') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToastNotification(successMessage, 'success');
    return true;
  } catch (err) {
    console.error('Không thể sao chép:', err);
    showToastNotification('Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công.', 'warning');
    return false;
  }
}

/**
 * Hiển thị thông báo nhanh (Toast Notification)
 */
function showToastNotification(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none px-4 w-full max-w-md';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const typeStyles = {
    info: 'bg-[#2A2521] text-white border-l-4 border-[#C59B27]',
    success: 'bg-[#1b4332] text-white border-l-4 border-[#52b788]',
    warning: 'bg-[#7f1d1d] text-white border-l-4 border-[#f59e0b]'
  };

  toast.className = `${typeStyles[type] || typeStyles.info} px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center justify-between pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0`;
  
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 flex-shrink-0 text-[#C59B27]" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    </div>
    <button class="ml-3 text-white/70 hover:text-white" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * ====================================================================
 * AUDIO GUIDE: THUYẾT MINH DI TÍCH TỰ ĐỘNG BẰNG GIỌNG ĐỌC TIẾNG VIỆT
 * Sử dụng Web Speech API (vi-VN) cho học sinh và thầy cô nghe thuyết minh
 * ====================================================================
 */
let currentSpeechUtterance = null;
let isSpeakingGuide = false;

function toggleAudioGuide(textToRead, onStateChange) {
  if (!('speechSynthesis' in window)) {
    showToastNotification('Trình duyệt của bạn chưa hỗ trợ tính năng thuyết minh tự động.', 'warning');
    return;
  }

  if (isSpeakingGuide) {
    window.speechSynthesis.cancel();
    isSpeakingGuide = false;
    if (onStateChange) onStateChange(false);
    return;
  }

  window.speechSynthesis.cancel();

  currentSpeechUtterance = new SpeechSynthesisUtterance(textToRead);
  currentSpeechUtterance.lang = 'vi-VN';
  currentSpeechUtterance.rate = 0.95; // Tốc độ đĩnh đạc, rõ ràng
  currentSpeechUtterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
  if (viVoice) {
    currentSpeechUtterance.voice = viVoice;
  }

  currentSpeechUtterance.onstart = () => {
    isSpeakingGuide = true;
    if (onStateChange) onStateChange(true);
  };

  currentSpeechUtterance.onend = () => {
    isSpeakingGuide = false;
    if (onStateChange) onStateChange(false);
  };

  currentSpeechUtterance.onerror = () => {
    isSpeakingGuide = false;
    if (onStateChange) onStateChange(false);
  };

  window.speechSynthesis.speak(currentSpeechUtterance);
}

function stopAudioGuide() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeakingGuide = false;
  }
}

// Hàm tương thích cũ
function toggleTextToSpeech(text, callback) {
  toggleAudioGuide(text, callback);
}

function stopTextToSpeech() {
  stopAudioGuide();
}

/**
 * ====================================================================
 * TẠO MÃ QR DI TÍCH ĐỘNG (QR CODE GENERATOR)
 * Phục vụ học sinh, giáo viên quét bằng điện thoại hoặc in dán bảng tin
 * ====================================================================
 */
function getHeritageQRCodeUrl(itemId) {
  // Tạo URL chỉ thẳng đến di tích trên website chính thức
  const targetUrl = `https://lucvuu.github.io/di-san-nha-nam/#item=${itemId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(targetUrl)}&color=8B1E1E&bgcolor=FFFFFF&margin=6`;
}
