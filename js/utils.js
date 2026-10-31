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
  <text x="400" y="475" font-family="sans-serif" font-size="14" fill="#EADECF" text-anchor="middle">Trường THPT Nhã Nam • xã Nhã Nam • tỉnh Bắc Ninh</text>
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
 * AUDIO GUIDE ENGINE: THUYẾT MINH DI TÍCH TỰ ĐỘNG CHUYÊN NGHIỆP
 * - Chia câu thông minh (Sentence Chunking) chống đứt đoạn sau 15s của Chromium/Safari
 * - Tự động phát hiện giọng đọc Tiếng Việt (Google Tiếng Việt, Microsoft Hoài My/Nam Minh, v.v.)
 * - Heartbeat keep-alive chống ngắt kết nối
 * - Chuông ngân di sản (Temple Bell Chime) mở đầu bằng Web Audio API
 * - Đồng bộ tương tác: Đổi tốc độ đọc (0.85x, 1.0x, 1.2x), tua câu, highlight karaoke trực quan
 * - Tự động giảm âm lượng nhạc nền (Ducking) khi thuyết minh đang phát
 * ====================================================================
 */

// Bộ đệm giọng đọc toàn cục
let cachedSpeechVoices = [];

function initVoiceLoader() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const updateVoices = () => {
      try {
        cachedSpeechVoices = window.speechSynthesis.getVoices() || [];
      } catch (e) {
        cachedSpeechVoices = [];
      }
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}
initVoiceLoader();

// Tìm kiếm giọng tiếng Việt tốt nhất trên thiết bị hiện tại
function getBestVietnameseVoice() {
  if (!cachedSpeechVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedSpeechVoices = window.speechSynthesis.getVoices() || [];
  }

  // 1. Tìm chuẩn mã vùng vi-VN hoặc vi_VN
  let voice = cachedSpeechVoices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN');
  if (voice) return { voice, isVietnamese: true, name: voice.name };

  // 2. Tìm mã ngôn ngữ bắt đầu bằng vi
  voice = cachedSpeechVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('vi'));
  if (voice) return { voice, isVietnamese: true, name: voice.name };

  // 3. Tìm theo tên giọng có chứa từ khóa tiếng Việt
  voice = cachedSpeechVoices.find(v => {
    const name = (v.name || '').toLowerCase();
    return name.includes('vietnam') || name.includes('tiếng việt') || name.includes('vietnamese') || name.includes('hoaimy') || name.includes('namminh');
  });
  if (voice) return { voice, isVietnamese: true, name: voice.name };

  // 4. Nếu thiết bị không có gói tiếng Việt (ví dụ Windows US mặc định), lấy giọng mặc định của hệ thống
  const defaultVoice = cachedSpeechVoices.find(v => v.default) || cachedSpeechVoices[0] || null;
  return { voice: defaultVoice, isVietnamese: false, name: defaultVoice ? defaultVoice.name : 'Mặc định' };
}

// Phát tiếng chuông chùa ngân vang thiêng liêng lúc mở đầu thuyết minh
function playHeritageBellChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Tần số chuông chùa: nốt Đô (C5 = 523.25Hz), Sol (G5 = 783.99Hz), Đô cao (C6 = 1046.5Hz)
    const tones = [
      { freq: 523.25, gain: 0.22, decay: 1.8 },
      { freq: 783.99, gain: 0.12, decay: 1.4 },
      { freq: 1046.5, gain: 0.08, decay: 1.1 }
    ];

    tones.forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(t.freq, now);

      gain.gain.setValueAtTime(t.gain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t.decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + t.decay + 0.1);
    });
  } catch (err) {
    // Không làm ảnh hưởng luồng nếu trình duyệt chặn Web Audio
  }
}

// Tách đoạn văn thành các câu ngắn hoàn chỉnh (< 140 ký tự) để chống lỗi 15s của Chromium
function splitTextIntoSentences(text) {
  if (!text || typeof text !== 'string') return [];

  const normalized = text.replace(/\s+/g, ' ').trim();
  // Tách theo các dấu kết thúc câu tiếng Việt: . ! ? ;
  const rawSentences = normalized.match(/[^.!?;\n]+[.!?;\n]*/g) || [normalized];
  const result = [];

  rawSentences.forEach(sentence => {
    let s = sentence.trim();
    if (!s) return;

    if (s.length > 150) {
      // Nếu câu quá dài, tách tiếp theo dấu phẩy hoặc dấu gạch nối
      const subParts = s.split(/([,–—]\s+)/);
      let buffer = '';
      for (const part of subParts) {
        if ((buffer + part).length > 130 && buffer.trim()) {
          result.push(buffer.trim());
          buffer = part;
        } else {
          buffer += part;
        }
      }
      if (buffer.trim()) result.push(buffer.trim());
    } else {
      result.push(s);
    }
  });

  return result.length ? result : [normalized];
}

/**
 * LỚP QUẢN LÝ THUYẾT MINH DI TÍCH (HERITAGE AUDIO GUIDE ENGINE)
 */
class HeritageAudioGuideManager {
  constructor() {
    this.sentences = [];
    this.currentIndex = -1;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 1.0;
    this.keepAliveInterval = null;
    this.activeUtterance = null;
    this.onProgressCallback = null;
    this.onStateChangeCallback = null;
    this.previousMusicState = false;
  }

  // Khởi tạo bài thuyết minh mới
  loadStory(fullText, onProgress, onStateChange) {
    this.stop(false);
    this.sentences = splitTextIntoSentences(fullText);
    this.currentIndex = 0;
    this.onProgressCallback = onProgress;
    this.onStateChangeCallback = onStateChange;
    return this.sentences;
  }

  // Bắt đầu hoặc tiếp tục phát
  play(fromIndex = null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToastNotification('Trình duyệt không hỗ trợ Web Speech API. Bạn có thể xem toàn văn thuyết minh bên dưới.', 'warning');
      return false;
    }

    if (fromIndex !== null && fromIndex >= 0 && fromIndex < this.sentences.length) {
      this.currentIndex = fromIndex;
    }

    if (this.currentIndex >= this.sentences.length) {
      this.currentIndex = 0;
    }

    // Nếu đang tạm dừng và không đổi câu, chỉ cần resume
    if (this.isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPlaying = true;
      this.isPaused = false;
      this.startKeepAlive();
      this.duckMusic();
      if (this.onStateChangeCallback) this.onStateChangeCallback(true, false);
      return true;
    }

    // Phát tiếng chuông chùa nếu phát từ câu đầu tiên
    if (this.currentIndex === 0) {
      playHeritageBellChime();
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.duckMusic();
    this.startKeepAlive();

    // Hủy các lệnh cũ một cách an toàn
    window.speechSynthesis.cancel();

    // Delay ngắn 60ms để tránh Chromium bug hủy nhầm utterance mới
    setTimeout(() => {
      this.speakCurrentSentence();
    }, 60);

    if (this.onStateChangeCallback) this.onStateChangeCallback(true, false);
    return true;
  }

  // Phát câu hiện tại trong danh sách
  speakCurrentSentence() {
    if (!this.isPlaying || this.isPaused) return;

    if (this.currentIndex >= this.sentences.length) {
      this.handlePlaybackComplete();
      return;
    }

    const text = this.sentences[this.currentIndex];
    if (!text || !text.trim()) {
      this.currentIndex++;
      this.speakCurrentSentence();
      return;
    }

    // Cập nhật tiến trình cho giao diện
    if (this.onProgressCallback) {
      this.onProgressCallback(this.currentIndex, this.sentences.length, text);
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = this.rate;
      utterance.pitch = 1.0;

      const { voice, isVietnamese } = getBestVietnameseVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        if (!this.isPlaying || this.isPaused) return;
        this.currentIndex++;
        // Nghỉ một nhịp nhẹ 150ms giữa các câu cho truyền cảm
        setTimeout(() => {
          this.speakCurrentSentence();
        }, 150);
      };

      utterance.onerror = (evt) => {
        // Nếu bị hủy do người dùng bấm Dừng/Chuyển câu thì bỏ qua
        if (evt.error === 'interrupted' || evt.error === 'canceled') return;

        console.warn('SpeechSynthesis error:', evt);
        // Tự động chuyển câu tiếp theo nếu một câu gặp trục trặc
        this.currentIndex++;
        if (this.currentIndex < this.sentences.length) {
          setTimeout(() => this.speakCurrentSentence(), 200);
        } else {
          this.handlePlaybackComplete();
        }
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Không thể phát âm thanh thuyết minh:', err);
      this.stop();
    }
  }

  // Tạm dừng phát
  pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (this.isPlaying) {
        window.speechSynthesis.pause();
        this.isPlaying = false;
        this.isPaused = true;
        this.stopKeepAlive();
        this.unduckMusic();
        if (this.onStateChangeCallback) this.onStateChangeCallback(false, true);
      }
    }
  }

  // Dừng hẳn phát và đặt lại trạng thái
  stop(notify = true) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.stopKeepAlive();
    this.unduckMusic();
    this.activeUtterance = null;
    if (notify && this.onStateChangeCallback) {
      this.onStateChangeCallback(false, false);
    }
  }

  // Tua lại từ câu đầu tiên
  restart() {
    this.stop(false);
    this.currentIndex = 0;
    this.play();
  }

  // Nhảy tới câu cụ thể do người dùng bấm vào trên bản ghi
  jumpTo(index) {
    if (index >= 0 && index < this.sentences.length) {
      this.stop(false);
      this.currentIndex = index;
      this.play();
    }
  }

  // Đổi tốc độ đọc
  setRate(newRate) {
    this.rate = Math.max(0.7, Math.min(1.5, newRate));
    if (this.isPlaying) {
      // Áp dụng ngay cho câu hiện tại
      this.play(this.currentIndex);
    }
  }

  // Xử lý khi đọc xong toàn bộ bài thuyết minh
  handlePlaybackComplete() {
    this.isPlaying = false;
    this.isPaused = false;
    this.stopKeepAlive();
    this.unduckMusic();
    if (this.onProgressCallback) {
      this.onProgressCallback(this.sentences.length, this.sentences.length, 'Hoàn thành bài thuyết minh');
    }
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(false, false);
    }
    showToastNotification('Đã hoàn thành bài thuyết minh di tích!', 'success');
  }

  // Heartbeat chống Chromium 15s freeze
  startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 8000);
  }

  stopKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  // Giảm âm lượng nhạc nền "Lưu Thủy Kim Tiền" để nghe rõ lời thuyết minh
  duckMusic() {
    if (typeof document === 'undefined') return;
    const bgMusic = document.getElementById('bg-music');
    if (typeof window !== 'undefined' && window.state && window.state.isAudioPlaying) {
      this.previousMusicState = true;
      if (bgMusic) bgMusic.volume = 0.08;
    }
  }

  // Khôi phục lại âm lượng nhạc nền
  unduckMusic() {
    if (typeof document === 'undefined') return;
    const bgMusic = document.getElementById('bg-music');
    if (this.previousMusicState) {
      if (bgMusic) bgMusic.volume = 0.5;
      this.previousMusicState = false;
    }
  }
}

// Khởi tạo đối tượng quản lý thuyết minh duy nhất
const heritageAudioGuide = new HeritageAudioGuideManager();

// Các hàm tương thích giao diện cũ
function toggleAudioGuide(textToRead, onStateChange) {
  if (heritageAudioGuide.isPlaying) {
    heritageAudioGuide.pause();
    if (onStateChange) onStateChange(false);
  } else {
    heritageAudioGuide.loadStory(textToRead, null, (isPlaying) => {
      if (onStateChange) onStateChange(isPlaying);
    });
    heritageAudioGuide.play();
  }
}

function stopAudioGuide() {
  heritageAudioGuide.stop();
}

function toggleTextToSpeech(text, callback) {
  toggleAudioGuide(text, callback);
}

function stopTextToSpeech() {
  stopAudioGuide();
}

/** Liên kết mở thẳng hồ sơ một di tích (dùng cho nút "Sao chép liên kết"). */
function getHeritageShareUrl(itemId) {
  return `${location.href.split("#")[0]}#item=${itemId}`;
}
