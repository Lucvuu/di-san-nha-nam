/**
 * ====================================================================
 * DI SẢN VĂN HÓA NHÃ NAM - CÁC HÀM TIỆN ÍCH HỖ TRỢ (UTILITIES)
 * Hỗ trợ tìm kiếm tiếng Việt không dấu, định dạng, chia sẻ, đọc văn bản
 * ====================================================================
 */

/**
 * Chuẩn hóa chuỗi tiếng Việt thành chuỗi không dấu, chữ thường
 * Đảm bảo tìm kiếm tiếng Việt chính xác 100% dù người dùng gõ có dấu hay không dấu.
 * Ví dụ: "Chùa Tứ Giáp" -> "chua tu giap"
 *        "Đền Gốc Khế" -> "den goc khe"
 *        "Khởi nghĩa Yên Thế" -> "khoi nghia yen the"
 */
function removeVietnameseTones(str) {
  if (!str || typeof str !== 'string') return '';

  let normalized = str.toLowerCase();

  // Chuẩn hóa ký tự Unicode tổ hợp
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Xử lý các ký tự đặc thù tiếng Việt
  normalized = normalized
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/[đ]/g, 'd');

  // Loại bỏ các dấu thanh rời rạc nếu còn sót
  normalized = normalized
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
    .replace(/\u02C6|\u0306|\u031B/g, '');

  return normalized.trim();
}

/**
 * Kiểm tra xem một mục di sản có khớp với từ khóa tìm kiếm hay không
 * Hỗ trợ so khớp đa trường (Tiêu đề, tóm tắt, thẻ tag, địa chỉ, phạm vi, nội dung)
 */
function matchesSearchQuery(item, rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return true;

  const queryClean = removeVietnameseTones(rawQuery);
  const queryTokens = queryClean.split(/\s+/).filter(Boolean);

  // Tập hợp toàn bộ văn bản có thể tìm kiếm của mục
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

  // Kiểm tra xem tất cả các từ trong truy vấn có xuất hiện không
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

  // Trigger animation in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Tự động đóng sau duration
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Đọc văn bản bằng giọng đọc trình duyệt (Web Speech Synthesis)
 * Phục vụ học sinh nghe giới thiệu tóm tắt di sản
 */
let currentSpeechUtterance = null;
let isSpeaking = false;

function toggleTextToSpeech(textToRead, onStateChange) {
  if (!('speechSynthesis' in window)) {
    showToastNotification('Trình duyệt của bạn chưa hỗ trợ tính năng đọc tự động.', 'warning');
    return;
  }

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    if (onStateChange) onStateChange(false);
    return;
  }

  window.speechSynthesis.cancel(); // Dừng câu trước nếu có

  currentSpeechUtterance = new SpeechSynthesisUtterance(textToRead);
  currentSpeechUtterance.lang = 'vi-VN';
  currentSpeechUtterance.rate = 0.95; // Tốc độ vừa phải cho học sinh nghe rõ

  // Cố gắng chọn giọng đọc tiếng Việt nếu có
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
  if (viVoice) {
    currentSpeechUtterance.voice = viVoice;
  }

  currentSpeechUtterance.onstart = () => {
    isSpeaking = true;
    if (onStateChange) onStateChange(true);
  };

  currentSpeechUtterance.onend = () => {
    isSpeaking = false;
    if (onStateChange) onStateChange(false);
  };

  currentSpeechUtterance.onerror = () => {
    isSpeaking = false;
    if (onStateChange) onStateChange(false);
  };

  window.speechSynthesis.speak(currentSpeechUtterance);
}

function stopTextToSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
}

