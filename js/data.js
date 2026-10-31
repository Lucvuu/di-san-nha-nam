/**
 * ====================================================================
 * DI SẢN VĂN HÓA XÃ NHÃ NAM - DỮ LIỆU CẤU HÌNH & HỆ THỐNG DI SẢN
 * Xã Nhã Nam, tỉnh Bắc Ninh, Việt Nam
 * Đơn vị khởi xướng & phối hợp: Trường THPT Nhã Nam
 * Cập nhật chuẩn hóa theo Báo cáo di tích phục vụ HĐND xã Nhã Nam & tư liệu địa phương
 * ====================================================================
 */

const SITE_CONFIG = {
  portalName: "Di sản văn hóa xã Nhã Nam",
  portalSubtitle: "Cổng thông tin số hóa di sản văn hóa và lịch sử địa phương",
  schoolName: "Trường THPT Nhã Nam",
  commune: "Xã Nhã Nam",
  city: "tỉnh Bắc Ninh",
  province: "Tỉnh Bắc Ninh",
  // Thống kê chính thức hệ thống di tích lịch sử - văn hóa theo Báo cáo HĐND xã & UBND tỉnh phê duyệt
  officialRelicsStats: {
    total: 37,
    specialNational: 8,
    national: 1,
    provincial: 7,
    inventoried: 21,
    intangible: 5
  },
  schoolTarget: "Dành cho học sinh Trường THPT Nhã Nam, các trường THCS, Tiểu học, thầy cô giáo và nhân dân",
  logoUrl: "./logo-thpt-nha-nam.png",
  
  // Facebook Group Community Configuration
  facebookGroupUrl: "#", 
  facebookGroupStatusNote: "Nhóm có bật chế độ kiểm duyệt bài viết để đảm bảo môi trường học tập văn minh, an toàn cho học sinh",

  // Administrator & Contact Configuration
  adminRole: "Ban điều hành dự án và quản trị nội dung",
  adminName: "Cô Mến và nhóm phụ trách di sản THPT Nhã Nam",
  adminPhone: "0962.629.650",
  adminPhoneRaw: "0962629650",
  adminZaloUrl: "https://zalo.me/0962629650",
  adminEmail: "thptnhanam.disan@gmail.com",
  adminAddress: "Trường THPT Nhã Nam, xã Nhã Nam, tỉnh Bắc Ninh"
};

/**
 * --------------------------------------------------------------------
 * DANH SÁCH BÀI HÁT TRÊN THANH ĐIỀU HƯỚNG (HEADER AUDIO PLAYLIST)
 * --------------------------------------------------------------------
 */

/**
 * ====================================================================
 * DANH MỤC TOÀN BỘ 37 DI TÍCH LỊCH SỬ - VĂN HÓA TRÊN ĐỊA BÀN XÃ NHÃ NAM
 * Trích xuất chuẩn xác 100% từ Báo cáo số liệu phục vụ HĐND xã & danh mục UBND tỉnh phê duyệt:
 * - 08 di tích quốc gia đặc biệt (khởi nghĩa Yên Thế)
 * - 01 di tích cấp quốc gia (chùa Tứ Giáp)
 * - 07 di tích cấp tỉnh
 * - 21 di tích trong danh mục kiểm kê di tích đã được Chủ tịch UBND tỉnh phê duyệt
 * ====================================================================
 */
const OFFICIAL_COMMUNE_RELICS = {
  totalCount: 37,
  documentRef: "Khái quát hệ thống di tích trên địa bàn - Báo cáo số liệu chính thức phục vụ HĐND xã & UBND tỉnh",
  summary: "Hiện nay, trên địa bàn xã có tổng số 37 di tích lịch sử - văn hóa, gồm 08 di tích quốc gia đặc biệt, 01 di tích cấp quốc gia, 07 di tích cấp tỉnh và 21 di tích trong danh mục kiểm kê được UBND tỉnh phê duyệt.",
  groups: [
    {
      id: "quoc-gia-dac-biet",
      name: "Di tích quốc gia đặc biệt",
      subName: "Cụm di tích Những địa điểm khởi nghĩa Yên Thế",
      count: 8,
      badgeText: "08 di tích quốc gia đặc biệt",
      badgeClass: "bg-[#8B1E1E] text-white",
      icon: "landmark",
      description: "08 di tích thuộc di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế theo Quyết định số 548/QĐ-TTg của Thủ tướng Chính phủ.",
      items: [
        { name: "Đình Dương Lâm", type: "Đình làng cổ khởi dựng đầu thế kỷ XIX", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-11" },
        { name: "Đình - chùa Hả", type: "Khu di tích đình - chùa Hả (nơi Đề Nắm tế cờ phát động khởi nghĩa 1884)", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-1" },
        { name: "Đền Gốc Khế", type: "Đền thờ và căn cứ lịch sử rừng Gốc Khế của nghĩa quân", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-4" },
        { name: "Đền thờ Cả Trọng (đền Gốc Dẻ)", type: "Đền thờ Cả Trọng, con trai cả của Hoàng Hoa Thám", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-10" },
        { name: "Nghĩa địa Pháp", type: "Khu chứng tích lịch sử quân sự đồn Nhã Nam", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-9" },
        { name: "Đình làng Chuông (đình Nhã Nam)", type: "Đình làng cổ khởi dựng thế kỷ XVIII", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-6" },
        { name: "Đồi Phủ (đồn Nhã Nam)", type: "Căn cứ đồn binh Pháp thời thuộc địa (Ao ông Chấn Ký)", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-5" },
        { name: "Chùa Nam Thiên (chùa Phố)", type: "Chùa cổ khởi dựng năm 1822", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-7" }
      ]
    },
    {
      id: "cap-quoc-gia",
      name: "Di tích cấp quốc gia",
      subName: "Di tích lịch sử - kiến trúc nghệ thuật",
      count: 1,
      badgeText: "01 di tích cấp quốc gia",
      badgeClass: "bg-[#8B6914] text-white",
      icon: "star",
      description: "Di tích lịch sử - kiến trúc nghệ thuật cấp quốc gia được Bộ Văn hóa, Thể thao và Du lịch xếp hạng.",
      items: [
        { name: "Chùa Tứ Giáp", type: "Nơi phát tích thiêng liêng ra đời Sáu điều Bác Hồ dạy Công an nhân dân (11/3/1948)", status: "Di tích cấp quốc gia", featuredId: "vat-the-2" }
      ]
    },
    {
      id: "cap-tinh",
      name: "Di tích cấp tỉnh",
      subName: "Di tích lịch sử - văn hóa cấp tỉnh",
      count: 7,
      badgeText: "07 di tích cấp tỉnh",
      badgeClass: "bg-amber-800 text-white",
      icon: "award",
      description: "07 di tích lịch sử - văn hóa được Chủ tịch UBND tỉnh ban hành Quyết định xếp hạng di tích cấp tỉnh.",
      items: [
        { name: "Đền Đề Truật", type: "Đền thờ tướng quân Dương Văn Truật (Đề Truật)", status: "Di tích cấp tỉnh", featuredId: "vat-the-8" },
        { name: "Đình Cầu Thượng", type: "Đình thờ Đức thánh Cao Sơn, Quý Minh", status: "Di tích cấp tỉnh", featuredId: "vat-the-12" },
        { name: "Đình Sậy", type: "Đình làng truyền thống thôn Sậy", status: "Di tích cấp tỉnh", featuredId: "vat-the-13" },
        { name: "Chùa Đồng Điều (di tích thôn Đồng Điều)", type: "Cái nôi thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương", status: "Di tích cấp tỉnh", featuredId: "vat-the-3" },
        { name: "Đình Nẻo", type: "Đình làng truyền thống thôn Nẻo", status: "Di tích cấp tỉnh", featuredId: "vat-the-14" },
        { name: "Chùa Dương Sơn", type: "Chùa cổ truyền thống thôn Dương Sơn", status: "Di tích cấp tỉnh", featuredId: "vat-the-15" },
        { name: "Đình làng Sặt", type: "Đình làng truyền thống thôn Sặt", status: "Di tích cấp tỉnh", featuredId: "vat-the-16" }
      ]
    },
    {
      id: "kiem-ke",
      name: "Di tích trong danh mục kiểm kê",
      subName: "Đã được Chủ tịch UBND tỉnh phê duyệt",
      count: 21,
      badgeText: "21 di tích kiểm kê",
      badgeClass: "bg-[#5C5248] text-white",
      icon: "scroll",
      description: "21 di tích lịch sử, văn hóa, kiến trúc tín ngưỡng nằm trong danh mục kiểm kê di tích đã được Chủ tịch UBND tỉnh phê duyệt bảo tồn.",
      items: [
        { name: "Chùa Bùng", type: "Chùa làng" },
        { name: "Đình Phố", type: "Đình làng cổ" },
        { name: "Chùa Dương Lâm", type: "Chùa làng" },
        { name: "Chùa Làng Hạ", type: "Chùa làng" },
        { name: "Chùa Tầng", type: "Chùa làng" },
        { name: "Giáo họ Yên Lễ", type: "Cơ sở tín ngưỡng tôn giáo" },
        { name: "Nhà thờ Đạo Minh Tân", type: "Cơ sở tôn giáo" },
        { name: "Chùa Cầu Xa", type: "Chùa làng" },
        { name: "Chùa Tân Hòa", type: "Chùa làng" },
        { name: "Chùa Linh Tiên", type: "Chùa làng" },
        { name: "Nhà thờ giáo Lục Hạ", type: "Cơ sở tôn giáo" },
        { name: "Chùa Tân Long", type: "Chùa làng" },
        { name: "Chùa Thị", type: "Chùa làng" },
        { name: "Chùa Chung", type: "Chùa làng" },
        { name: "Chùa Gia Tiến", type: "Chùa làng" },
        { name: "Chùa Sậy", type: "Chùa làng" },
        { name: "Đền thờ Lương Văn Nắm", type: "Đền thờ thủ lĩnh Lương Văn Nắm (Đề Nắm)" },
        { name: "Nhà thờ Đồng Điều", type: "Cơ sở tôn giáo" },
        { name: "Đình Đồng Điều", type: "Đình làng" },
        { name: "Chùa Sặt", type: "Chùa làng" },
        { name: "Đền Ngọc Hoa", type: "Đền thờ tín ngưỡng truyền thống" }
      ]
    }
  ]
};

/**
 * ====================================================================
 * CẤU HÌNH CÁC TUYẾN DU LỊCH & HỌC TẬP NGOẠI KHÓA DI SẢN XÃ NHÃ NAM
 * Hỗ trợ bản đồ tương tác, tự động zoom và dẫn đường Google Maps
 * ====================================================================
 */
const HERITAGE_ROUTES = [
  {
    id: "tuyen-1",
    number: "1",
    name: "Tuyến 1",
    title: "Cội nguồn và kháng chiến",
    subtitle: "Khu di tích đình - chùa Hả, chùa Tứ Giáp và đình Dương Lâm",
    themeColor: "#8B1E1E",
    badgeBg: "bg-[#8B1E1E]",
    relicIds: ["vat-the-1", "vat-the-2", "vat-the-11"],
    relics: [
      { id: "vat-the-1", name: "Đình - chùa Hả", note: "Nơi tế cờ 1884", q: "21.4357253,106.116718" },
      { id: "vat-the-2", name: "Chùa Tứ Giáp", note: "Nơi phát tích 6 điều Bác Hồ dạy", q: "21.4448892,106.0901463" },
      { id: "vat-the-11", name: "Đình Dương Lâm", note: "Di tích quốc gia đặc biệt thời Lê", q: "21.4210834,106.0960966" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=21.4357253,106.116718&z=15&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=21.4357253,106.116718&destination=21.4210834,106.0960966&waypoints=21.4448892,106.0901463",
    directionsText: "Chỉ đường Tuyến 1: Đình Hả → Chùa Tứ Giáp → Đình Dương Lâm",
    description: "Kết nối nơi khởi phát ngọn cờ Yên Thế (đình Hả) với nơi phát tích 6 điều Bác Hồ dạy CAND (chùa Tứ Giáp) và căn cứ kháng chiến kiên trung đình Dương Lâm."
  },
  {
    id: "tuyen-2",
    number: "2",
    name: "Tuyến 2",
    title: "Mốc son cách mạng & văn hóa",
    subtitle: "Di tích thôn Đồng Điều, đền Đề Truật và chùa Dương Sơn",
    themeColor: "#C59B27",
    badgeBg: "bg-[#C59B27]",
    relicIds: ["vat-the-3", "vat-the-8", "vat-the-15"],
    relics: [
      { id: "vat-the-3", name: "Chùa Đồng Điều", note: "Chi bộ Đảng đầu tiên", q: "Chùa+Đồng+Điều,+xã+Nhã+Nam" },
      { id: "vat-the-8", name: "Đền Đề Truật", note: "Tướng quân Đề Truật", q: "21.4525861,106.0980009" },
      { id: "vat-the-15", name: "Chùa Dương Sơn", note: "Di tích cấp tỉnh - văn hóa làng Dương Sơn", q: "21.408497,106.1126369" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=21.4525861,106.0980009&z=15&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=21.4525861,106.0980009&destination=21.408497,106.1126369&waypoints=Chùa+Đồng+Điều,+xã+Nhã+Nam",
    directionsText: "Chỉ đường Tuyến 2: Đền Đề Truật → Chùa Đồng Điều → Chùa Dương Sơn",
    description: "Hành trình về với cái nôi gieo mầm cách mạng của chi bộ Đảng Cộng sản đầu tiên, tấm gương trung dũng của nghĩa quân Đề Truật và không gian văn hóa thanh tịnh chùa Dương Sơn."
  },
  {
    id: "tuyen-3",
    number: "3",
    name: "Tuyến 3",
    title: "Chiến tích oai hùng & tín ngưỡng cổ truyền",
    subtitle: "Căn cứ đền Gốc Khế, đồi Phủ, đình làng Chuông, chùa Nam Thiên và đình Cầu Thượng",
    themeColor: "#166534",
    badgeBg: "bg-[#166534]",
    relicIds: ["vat-the-4", "vat-the-5", "vat-the-6", "vat-the-7", "vat-the-12"],
    relics: [
      { id: "vat-the-4", name: "Đền Gốc Khế", note: "Căn cứ rừng Gốc Khế", q: "21.4443835,106.0966726" },
      { id: "vat-the-5", name: "Đồi Phủ (đồn Nhã Nam)", note: "Ao ông Chấn Ký", q: "21.4444805,106.0971055" },
      { id: "vat-the-6", name: "Đình làng Chuông", note: "Đình cổ thế kỷ XVIII", q: "21.4443874,106.0991677" },
      { id: "vat-the-7", name: "Chùa Nam Thiên", note: "Chùa Phố 1822", q: "21.4442158,106.0973672" },
      { id: "vat-the-12", name: "Đình Cầu Thượng", note: "Di tích cấp tỉnh thờ Cao Sơn, Quý Minh", q: "21.4397723,106.0893274" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=21.4444805,106.0971055&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=21.4443835,106.0966726&destination=21.4397723,106.0893274&waypoints=21.4444805,106.0971055|21.4443874,106.0991677|21.4442158,106.0973672",
    directionsText: "Chỉ đường Tuyến 3: Đền Gốc Khế → Đồi Phủ → Đình làng Chuông → Chùa Nam Thiên → Đình Cầu Thượng",
    description: "Cụm di tích lịch sử quân sự và tín ngưỡng trung tâm Nhã Nam - chiến trường thử lửa oanh liệt chống giặc ngoại xâm của nghĩa quân Yên Thế và thiết chế đình làng cổ kính."
  }
];

const DEFAULT_COMMUNE_MAP = {
  embedUrl: "https://www.google.com/maps?q=21.4404,106.0965&z=15&output=embed",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4404,106.0965",
  directionsText: "Chỉ đường đến trung tâm xã Nhã Nam (Google Maps)"
};

const MUSIC_PLAYLIST = [
  {
    id: "nha-nam-trong-toi",
    title: "Nhã Nam trong tôi",
    artist: "Ca khúc truyền thống quê hương",
    src: "./nha-nam-trong-toi.mp3",
    fallbackSrc: "./assets/audio/nha-nam-trong-toi.mp3"
  },
  {
    id: "thpt-nha-nam",
    title: "THPT Nhã Nam",
    artist: "Bùi Công Nam / Trường THPT Nhã Nam",
    src: "./thpt-nha-nam.mp3",
    fallbackSrc: "./assets/audio/thpt-nha-nam.mp3"
  }
];

/**
 * --------------------------------------------------------------------
 * DANH MỤC DI SẢN VẬT THỂ (TANGIBLE HERITAGE DATA - 8 DI TÍCH TIÊU BIỂU)
 * Hiển thị chính xác 5 mục bắt buộc:
 * 1. Tên di tích
 * 2. Địa chỉ (xã Nhã Nam, tỉnh Bắc Ninh)
 * 3. Nội dung về di tích (Lịch sử, kiến trúc, sự kiện)
 * 4. Chỉ dẫn Google Map (embedUrl + directionsUrl)
 * 5. Ảnh về di tích (gallery)
 * --------------------------------------------------------------------
 */
const TANGIBLE_HERITAGE_DATA = [
  {
    "id": "vat-the-1",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Đức thánh Cao Sơn, Quý Minh; thủ lĩnh Lương Văn Nắm (Đề Nắm)",
    "title": "Khu di tích đình - chùa Hả",
    "shortTitle": "Đình - chùa Hả",
    "address": "Thôn Hả, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-chua-ha/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-chua-ha.mp3",
      "title": "Thuyết minh di tích đình - chùa Hả"
    },
    "video": {
      "title": "Đề Nắm tế cờ khởi nghĩa tại đình Hả, Nhã Nam, Bắc Ninh (tư liệu: thầy Bùi Công)",
      "youtubeId": "13WbD3DOeQc",
      "youtubeUrl": "https://www.youtube.com/watch?v=13WbD3DOeQc",
      "embedUrl": "https://www.youtube.com/embed/13WbD3DOeQc"
    },
    "tags": [
      "Đình Hả",
      "Chùa Hả",
      "Đề Nắm",
      "Lương Văn Nắm",
      "Khởi nghĩa Yên Thế",
      "Tế cờ 1884",
      "Di tích quốc gia đặc biệt",
      "Thôn Hả",
      "Nhã Nam",
      "tỉnh Bắc Ninh"
    ],
    "overview": "Nơi thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ ngày 16/3/1884, chính thức phát động cuộc khởi nghĩa Yên Thế oanh liệt chống thực dân Pháp.",
    "content": {
      "intro": "Khu di tích đình - chùa Hả tọa lạc tại thôn Hả, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang). Đây là một trong những 'địa chỉ đỏ' quan trọng bậc nhất trong hệ thống di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế, gắn liền với tên tuổi người anh hùng thủ lĩnh áo vải Lương Văn Nắm.",
      "historicalSignificance": [
        "**Nơi tế cờ phát động khởi nghĩa Yên Thế (16/3/1884):** Ngày 16 tháng 3 năm 1884 (năm Giáp Thân), tại sân đình Hả, thủ lĩnh Lương Văn Nắm (tức Đề Nắm) cùng các nghĩa sĩ ưu tú đã làm lễ tế cờ, cắt máu ăn thề, chính thức dựng cờ khởi nghĩa Yên Thế, mở đầu bản anh hùng ca kháng Pháp trường kỳ gần 30 năm (1884 - 1913).",
        "**Đại bản doanh buổi đầu của nghĩa quân:** Đình Hả là trung tâm hội tụ nhân tài, vũ khí, lương thảo và bàn thảo các kế sách quân sự đánh bại nhiều đợt hành quân càn quét ác liệt của đạo quân viễn chinh Pháp.",
        "**Xếp hạng di tích quốc gia đặc biệt:** Được xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ trong cụm Những địa điểm Khởi nghĩa Yên Thế.",
        "**Công tác bảo tồn:** Giai đoạn 2023 - 2024, di tích đã được đầu tư tu bổ, tôn tạo quy mô lớn với kinh phí gần 8,5 tỷ đồng từ ngân sách nhà nước và nhân dân đóng góp, giữ vững nét cổ kính uy nghiêm."
      ],
      "architecture": [
        "Đình Hả thờ Thành hoàng làng Cao Sơn - Quý Minh đại vương và thủ lĩnh Lương Văn Nắm.",
        "Kiến trúc đình hình chữ Đinh (丁) truyền thống, gồm 5 gian Tiền tế và 2 gian Hậu cung vững chãi.",
        "Bộ khung gỗ lim cổ thụ vững chãi, các vì kèo kết cấu chồng rường giá chiêng với những mảng chạm khắc rồng, lân, hoa cúc dây sinh động mang đậm phong cách nghệ thuật thời Nguyễn.",
        "Chùa Hả (tên chữ 'Thanh Âm Tự') nằm liền kề bên đình, rợp bóng cây cổ thụ, lưu giữ hệ thống tượng Phật cổ sơn son thếp vàng, chuông đồng và các văn bia ghi lại quá trình trùng tu từ thời Lê - Nguyễn."
      ],
      "studyNote": "Đối với thế hệ trẻ và học sinh Trường THPT Nhã Nam: Đình - chùa Hả là cội nguồn của tinh thần quật cường Yên Thế, là bài học đầu tiên về lòng yêu nước nồng nàn và ý chí bất khuất trước quân thù."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4357253,106.116718&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4357253,106.116718",
      "locationName": "Khu di tích đình - chùa Hả (di tích quốc gia đặc biệt)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-chua-ha/anh-dai-dien.jpg",
        "caption": "Đình Hả - Nơi thủ lĩnh Lương Văn Nắm làm lễ tế cờ khởi nghĩa ngày 16/3/1884"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-1.jpg",
        "caption": "Đình Hả - Góc nghiêng mái ngói cổ kính và đầu đao cong vút"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-2.jpg",
        "caption": "Toàn cảnh sân đình Hả và gian tiền tế trang nghiêm"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-3.jpg",
        "caption": "Hậu cung đình Hả với kết cấu vì kèo gỗ lim cổ truyền"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-4.jpg",
        "caption": "Khuôn viên di tích đình - chùa Hả rợp bóng cây xanh mát"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-5.jpg",
        "caption": "Quần thể di tích quốc gia đặc biệt đình - chùa Hả tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 06 ảnh tư liệu thực tế tại đình - chùa Hả (Tài liệu thầy Bùi Công và cô Thúy Mến)",
    "docFile": {
      "fileName": "dinh-chua-ha.docx",
      "title": "Hồ sơ di tích đình - chùa Hả",
      "path": "./assets/docs/dinh-chua-ha.docx",
      "size": "38 KB"
    }
  },
  {
    "id": "vat-the-2",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia",
    "rankName": "Di tích cấp quốc gia",
    "badge": "Di tích cấp quốc gia",
    "relicType": "Di tích lịch sử và nghệ thuật",
    "decision": "QĐ số 138/QĐ, ngày 31/01/1992 của Bộ Văn hóa - Thông tin",
    "worship": "Thờ Phật",
    "title": "Chùa Tứ Giáp",
    "shortTitle": "Chùa Tứ Giáp (Đại Phúc tự)",
    "address": "Tổ dân phố Chùa Nguộn, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/chua-tu-giap/anh-dai-dien.jpg",
    "tags": [
      "Chùa Tứ Giáp",
      "Sáu điều Bác Hồ dạy",
      "Công an nhân dân",
      "Đại Phúc tự",
      "Làng Nguộn",
      "Yên Thế",
      "Xã Nhã Nam",
      "tỉnh Bắc Ninh"
    ],
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-chua-tu-giap.mp3",
      "title": "Thuyết minh di tích chùa Tứ Giáp"
    },
    "overview": "Nơi phát tích lịch sử thiêng liêng ra đời Sáu điều Bác Hồ dạy Công an nhân dân ngày 11/3/1948, di tích lịch sử và nghệ thuật cấp quốc gia.",
    "content": {
      "intro": "Chùa Tứ Giáp (tên chữ là Đại Phúc tự, thường gọi là chùa làng Nguộn) tọa lạc uy nghiêm tại thôn Chùa Nguộn, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ngôi chùa không chỉ là trung tâm tín ngưỡng Phật giáo lâu đời từ thế kỷ XVIII thời hậu Lê mà còn là 'địa chỉ đỏ' cách mạng rực rỡ của toàn quốc.",
      "historicalSignificance": [
        "**Nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân:** Trong kháng chiến chống thực dân Pháp (1946 - 1948), chùa Tứ Giáp là trụ sở đóng quân và làm việc của Công an Khu XII.",
        "**Bức thư lịch sử ngày 11/3/1948:** Nhận được báo Tết 'Bạn Dân' do đồng chí Hoàng Mai (Giám đốc Công an Khu XII) kính biếu, Chủ tịch Hồ Chí Minh đã gửi bức thư lịch sử căn dặn về 'Tư cách người Công an cách mệnh'. Sáu lời dạy thiêng liêng đã trở thành kim chỉ nam rèn luyện của mọi thế hệ chiến sĩ CAND Việt Nam.",
        "**Xếp hạng di tích:** Chùa Tứ Giáp được xếp hạng di tích lịch sử và nghệ thuật cấp quốc gia theo Quyết định số 138/QĐ ngày 31/01/1992."
      ],
      "architecture": [
        "Kiến trúc truyền thống kiểu tiền chữ Nhất (-), hậu chữ Đinh (丁) vững chãi, tường gạch cổ, mái lợp ngói mũi hài thanh thoát.",
        "Hệ thống cột gỗ lim chắc khỏe, vì kèo kết cấu con chồng giá chiêng được chạm trổ hoa lá, rồng mây tinh tế.",
        "Lưu giữ nhiều bảo vật quý: bia đá niên hiệu Cảnh Hưng (1771), chuông đồng đúc thế kỷ XIX, các pho tượng Phật sơn son thếp vàng cổ kính.",
        "Khuôn viên hiện nay được mở rộng xây dựng khu lưu niệm Sáu điều Bác Hồ dạy Công an nhân dân với tượng đài Bác Hồ trang nghiêm, hoa viên xanh mát và nhà truyền thống giáo dục thế hệ trẻ."
      ],
      "studyNote": "Đối với học sinh Trường THPT Nhã Nam: Chùa Tứ Giáp là bài học thực tế sống động nhất về lòng yêu nước, đạo đức chí công vô tư và sự tri ân các anh hùng liệt sĩ cách mạng của quê hương Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4448892,106.0901463&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4448892,106.0901463",
      "locationName": "Chùa Tứ Giáp (nơi phát tích Sáu điều Bác Hồ dạy CAND)"
    },
    "gallery": [
      {
        "url": "./assets/images/chua-tu-giap/anh-dai-dien.jpg",
        "caption": "Chùa Tứ Giáp (Đại Phúc tự) - Nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân"
      },
      {
        "url": "./assets/images/chua-tu-giap/tu-giap-2.jpg",
        "caption": "Khuôn viên và kiến trúc tiền tế chùa Tứ Giáp tại thôn Chùa Nguộn"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 02 ảnh tư liệu thực tế tại chùa Tứ Giáp (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "chua-tu-giap.docx",
      "title": "Hồ sơ di tích chùa Tứ Giáp",
      "path": "./assets/docs/chua-tu-giap.docx",
      "size": "38 KB"
    }
  },
  {
    "id": "vat-the-3",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 2087/QĐ-UBND, ngày 25/12/2006 của Chủ tịch UBND tỉnh",
    "worship": "Thờ Phật",
    "title": "Chùa Đồng Điều (di tích lịch sử thôn Đồng Điều)",
    "shortTitle": "Chùa Đồng Điều",
    "address": "Thôn Đồng Điều, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Thôn Đồng Điều",
      "Chùa Đồng Điều",
      "chi bộ Đảng đầu tiên",
      "Lịch sử cách mạng",
      "tỉnh Bắc Ninh",
      "Xã Nhã Nam"
    ],
    "overview": "Nơi thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương trước Cách mạng Tháng Tám năm 1945, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Di tích lịch sử thôn Đồng Điều (trung tâm là chùa Đồng Điều) thuộc xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang). Đây là cái nôi cách mạng hào hùng, nơi ươm mầm và chứng kiến sự ra đời của chi bộ Đảng Cộng sản đầu tiên trên địa bàn địa phương trước đây.",
      "historicalSignificance": [
        "**Nơi thành lập chi bộ Đảng đầu tiên:** Trước Cách mạng Tháng Tám năm 1945, thôn Đồng Điều là cơ sở cách mạng bí mật an toàn. Tại đây, những người con ưu tú của quê hương đã được giác ngộ lý tưởng cộng sản, thành lập chi bộ Đảng đầu tiên, trực tiếp lãnh đạo quần chúng nhân dân vùng lên giành chính quyền.",
        "**Căn cứ nuôi giấu cán bộ xứ ủy Bắc Kỳ:** Nhiều cán bộ cao cấp của Đảng và các đội tuyên truyền cứu quốc quân đã dừng chân, hoạt động bí mật tại Đồng Điều nhờ sự đùm bọc, chở che kiên trung của đồng bào và bà con giáo dân nơi đây.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh xếp hạng di tích lịch sử - văn hóa cấp tỉnh theo Quyết định số 2087/QĐ-UBND ngày 25/12/2006."
      ],
      "architecture": [
        "Chùa Đồng Điều mang nét kiến trúc tâm linh thôn dã truyền thống vùng đồng bằng trung du Bắc Bộ.",
        "Khung nhà bằng gỗ mộc mạc, mái ngói cổ rêu phong, kết cấu vững chắc hài hòa cùng cảnh quan làng xóm trù phú.",
        "Nơi đây lưu giữ nhiều hiện vật quý, bia ghi công tích cách mạng và các chứng tích lịch sử của phong trào kháng chiến chống thực dân Pháp."
      ],
      "studyNote": "Đối với học sinh: Di tích thôn Đồng Điều là minh chứng hùng hồn cho truyền thống kiên cường cách mạng, lòng son sắt một dạ theo Đảng của nhân dân xã Nhã Nam qua các thời kỳ kháng chiến."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=Ch%C3%B9a+%C4%90%E1%BB%93ng+%C4%90i%E1%BB%81u,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Chùa+Đồng+Điều,+Thôn+Đồng+Điều,+xã+Nhã+Nam,+tỉnh+Bắc+Ninh",
      "locationName": "Di tích lịch sử thôn Đồng Điều (chùa Đồng Điều)"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại di tích đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "chua-dong-dieu.docx",
      "title": "Hồ sơ di tích chùa Đồng Điều",
      "path": "./assets/docs/chua-dong-dieu.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-4",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Thờ Mẫu",
    "title": "Đền Gốc Khế",
    "shortTitle": "Đền Gốc Khế",
    "address": "Tổ dân phố Cầu Thượng, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/den-goc-khe/anh-dai-dien.webp",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-den-goc-khe.mp3",
      "title": "Thuyết minh di tích đền Gốc Khế"
    },
    "tags": [
      "Đền Gốc Khế",
      "Rừng Gốc Khế",
      "Hoàng Hoa Thám",
      "Khởi nghĩa Yên Thế",
      "Căn cứ",
      "Di tích quốc gia đặc biệt",
      "Cầu Thượng"
    ],
    "overview": "Căn cứ tiền tiêu quan trọng và địa điểm ghi dấu các trận chặn giặc oai hùng của nghĩa quân Yên Thế, di tích quốc gia đặc biệt.",
    "content": {
      "intro": "Đền Gốc Khế tọa lạc tại thôn Cầu Thượng, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Di tích nằm trong quần thể di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế, gắn liền với khu rừng Gốc Khế hiểm trở.",
      "historicalSignificance": [
        "**Căn cứ tiền tiêu của phong trào Yên Thế:** Khu vực đền Gốc Khế nằm ở vị trí yết hầu cửa ngõ vào vùng căn cứ đồn Nhã Nam và Phủ Yên Thế. Dưới sự chỉ huy của Đề Thám và các tướng lĩnh, nơi đây là trạm tiền tiêu trinh sát nắm bắt tình hình di chuyển của quân đội viễn chinh Pháp.",
        "**Nơi tưởng niệm các nghĩa sĩ bất khuất:** Nhân dân đã lập đền thờ tại khu rừng Gốc Khế để tưởng nhớ công đức các thủ lĩnh nghĩa quân Yên Thế và các anh hùng nghĩa sĩ đã anh dũng hy sinh vì độc lập dân tộc.",
        "**Quyết định xếp hạng:** Xếp hạng di tích quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Đền chính được phục dựng theo phong cách kiến trúc cổ truyền dân tộc: kết cấu khung gỗ lim, mái lợp ngói mũi hài, đắp nổi đôi rồng chầu mặt nguyệt oai nghiêm.",
        "Bên trong đền bày trí ban thờ Uy linh Tiên thánh và Anh hùng nghĩa quân Hoàng Hoa Thám với đồ thờ sơn son thếp vàng, hoành phi câu đối ca ngợi khí tiết kiên cường.",
        "Khuôn viên có tấm bia đá ghi tạc chiến tích sự kiện lịch sử, bao quanh là vườn cây lưu niệm rợp bóng mát thanh bình."
      ],
      "studyNote": "Đền Gốc Khế nhắc nhở các bạn học sinh về sự mưu trí, dũng cảm và tinh thần dựa vào lòng dân để chống giặc ngoại xâm của thế hệ cha anh đi trước."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4443835,106.0966726&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4443835,106.0966726",
      "locationName": "Đền Gốc Khế (căn cứ nghĩa quân Yên Thế)"
    },
    "gallery": [
      {
        "url": "./assets/images/den-goc-khe/anh-dai-dien.webp",
        "caption": "Đền Gốc Khế - Căn cứ bí mật của Hoàng Hoa Thám và nghĩa quân Yên Thế"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đền Gốc Khế (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "den-goc-khe.docx",
      "title": "Thuyết minh dự án tu bổ Đền Gốc Khế",
      "path": "./assets/docs/den-goc-khe.docx",
      "size": "79 KB"
    }
  },
  {
    "id": "vat-the-5",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": null,
    "title": "Đồi Phủ (địa điểm: Ao ông Chấn Ký)",
    "shortTitle": "Đồi Phủ (Ao ông Chấn Ký)",
    "address": "Đồi Phủ, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/doi-phu-nha-nam/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-doi-phu.mp3",
      "title": "Thuyết minh di tích Đồi Phủ"
    },
    "tags": [
      "Đồi Phủ",
      "Ao ông Chấn Ký",
      "Đồn Nhã Nam",
      "Phủ Yên Thế",
      "Thực dân Pháp",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Địa điểm lịch sử ghi dấu căn cứ đầu não của thực dân Pháp và các cuộc đụng độ quyết liệt của nghĩa quân Yên Thế, di tích quốc gia đặc biệt.",
    "content": {
      "intro": "Đồi Phủ (địa điểm: Ao ông Chấn Ký) tọa lạc trên quả đồi cao khống chế ngã tư Nhã Nam, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Nơi đây từng bị thực dân Pháp chiếm đóng từ năm 1885 để lập đồn bốt khét tiếng và đặt tòa đại lý phủ Yên Thế nhằm trấn áp phong trào nông dân.",
      "historicalSignificance": [
        "**Đại bản doanh đàn áp của thực dân Pháp (1885):** Để đối phó với nghĩa quân của Đề Nắm và Đề Thám, thực dân Pháp đã thiết lập đồn bốt kiên cố trên đồi Phủ. Từ đây, các tướng chỉ huy Pháp đã xuất quân tấn công nhiều đồn lũy nghĩa quân nhưng liên tục chịu tổn thất nặng nề.",
        "**Địa điểm Ao ông Chấn Ký:** Địa điểm gắn liền với các trận phục kích, giao tranh dũng cảm của các nghĩa sĩ Yên Thế và phong trào cách mạng địa phương.",
        "**Xếp hạng quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Khu vực còn dấu tích nền móng đồn lũy, bờ thành đất đá cuội ong cổ.",
        "Hiện nay được quy hoạch tôn tạo thành công viên lịch sử rợp bóng cây xanh, phục vụ giáo dục truyền thống và sinh hoạt văn hóa của nhân dân địa phương."
      ],
      "studyNote": "Di tích là chứng tích lịch sử không thể phai mờ về sự thất bại của chủ nghĩa thực dân trước lòng yêu nước bất diệt của nhân dân ta."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4444805,106.0971055&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4444805,106.0971055",
      "locationName": "Đồi Phủ Nhã Nam (đồn Nhã Nam thời Pháp)"
    },
    "gallery": [
      {
        "url": "./assets/images/doi-phu-nha-nam/anh-dai-dien.jpg",
        "caption": "Đồi Phủ Nhã Nam - Nơi thực dân Pháp lập đồn bốt và tòa đại lý phủ Yên Thế năm 1885"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đồi Phủ (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "doi-phu-nha-nam.docx",
      "title": "Tư liệu lịch sử đồi Phủ - đồn Nhã Nam",
      "path": "./assets/docs/doi-phu-nha-nam.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-6",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Đức thánh Cao Sơn, Quý Minh",
    "title": "Đình làng Chuông (đình Nhã Nam)",
    "shortTitle": "Đình làng Chuông",
    "address": "Thôn Tiến Phan 2, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-lang-chuong/anh-dai-dien.webp",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-lang-chuong.mp3",
      "title": "Thuyết minh di tích đình làng Chuông"
    },
    "tags": [
      "Đình Nhã Nam",
      "Đình làng Chuông",
      "Tiến Phan 2",
      "Hoàng Hoa Thám",
      "Khởi nghĩa Yên Thế",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Đình cổ thời Lê Trung Hưng (TK XVIII), nơi thủ lĩnh Hoàng Hoa Thám họp bàn chỉ huy những trận đánh lớn, di tích quốc gia đặc biệt.",
    "content": {
      "intro": "Đình làng Chuông (thường gọi là đình Nhã Nam) tọa lạc tại thôn Tiến Phan 2, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ngôi đình cổ được khởi dựng từ thời Lê Trung Hưng (thế kỷ XVIII), là trung tâm văn hóa tín ngưỡng lớn của làng Chuông xưa.",
      "historicalSignificance": [
        "**Nơi họp bàn cơ mật của Hoàng Hoa Thám:** Trong những năm đầu khởi nghĩa Yên Thế, Hoàng Hoa Thám cùng các tướng lĩnh đã nhiều lần tổ chức các cuộc họp quan trọng tại đình làng Chuông, bàn thảo kế sách quân sự đánh bại các đợt càn quét của quân Pháp.",
        "**Sự kiện năm 1892 trừng trị kẻ phản bội:** Sau khi thủ lĩnh Đề Nắm bị mưu hại, cụ Đề Thám đã sai các dũng sĩ bắt sống kẻ phản trắc Đề Sặt tại đình dẫn về đồn Hố Chuối tế cờ báo thù cho thủ lĩnh, giữ nghiêm kỷ luật nghĩa quân.",
        "**Di tích quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Bố cục kiến trúc hình chữ Đinh (丁) gồm 5 gian Tiền tế và 2 gian Hậu cung rộng rãi, mái lợp ngói mũi hài thanh thoát với 4 đầu đao cong vút.",
        "Khung gỗ lim cổ kính, các đầu dư, kẻ chuyền, cốn mê chạm khắc rồng ổ, phượng múa, hoa lá cách điệu bằng kỹ thuật chạm lộng, chạm thủng điêu luyện.",
        "Đình còn bảo lưu nhiều di vật quý: bia đá cổ, bát hương gốm Thổ Hà, kiệu bát cống, ngai thờ và 2 đạo sắc phong thời Nguyễn."
      ],
      "studyNote": "Đình làng Chuông là niềm tự hào sâu sắc của bà con thôn Tiến Phan 2 và học sinh xã Nhã Nam về nghệ thuật điêu khắc gỗ cổ truyền và truyền thống đánh giặc giữ làng."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4443874,106.0991677&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4443874,106.0991677",
      "locationName": "Đình làng Chuông (đình Nhã Nam thế kỷ XVIII)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-lang-chuong/anh-dai-dien.webp",
        "caption": "Đình làng Chuông - Ngôi đình cổ thời Hậu Lê (thế kỷ XVIII) tại thôn Tiến Phan 2"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình làng Chuông (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "dinh-lang-chuong.docx",
      "title": "Tư liệu khoa học đình làng Chuông",
      "path": "./assets/docs/dinh-lang-chuong.docx",
      "size": "16 KB"
    }
  },
  {
    "id": "vat-the-7",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Thờ Phật",
    "title": "Chùa Nam Thiên (chùa Phố)",
    "shortTitle": "Chùa Nam Thiên",
    "address": "Tổ dân phố Tân Quang, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/chua-nam-thien/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-chua-nam-thien.mp3",
      "title": "Thuyết minh di tích chùa Nam Thiên"
    },
    "tags": [
      "Chùa Nam Thiên",
      "Chùa Phố",
      "Tân Quang",
      "Năm 1822",
      "Phật giáo",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Ngôi chùa cổ lập từ năm 1822, trung tâm Phật giáo lâu đời thuộc cụm di tích quốc gia đặc biệt tại Nhã Nam.",
    "content": {
      "intro": "Chùa Nam Thiên (tục gọi là chùa Phố) tọa lạc tại thôn Tân Quang, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Chùa được xây dựng từ năm Nhâm Ngọ (1822) dưới thời vua Minh Mạng, ban đầu thuộc làng Cầu. Đến năm 1885, khi phố Nhã Nam hình thành, chùa được chuyển về phố.",
      "historicalSignificance": [
        "**Lịch sử hơn 200 năm đồng hành cùng quê hương:** Khởi dựng từ năm 1822, trùng tu năm 1925. Trong kháng chiến chống Pháp năm 1947, chùa từng là nơi nuôi giấu cán bộ và kho cất giấu lương thực phục vụ bộ đội.",
        "**Cơ sở liên lạc cách mạng:** Nhờ vị trí kín đáo và sự bảo bọc kiên cường của sư trụ trì cùng Phật tử, chùa Nam Thiên là cơ sở liên lạc tin cậy của nghĩa quân và bộ đội ta.",
        "**Di tích quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Chùa tọa lạc trong khuôn viên thanh tịnh rợp bóng cây xanh cổ thụ, gồm Tòa Tiền đường, Thượng điện, Nhà Mẫu, Nhà Tổ và vườn tháp uy nghiêm.",
        "Hệ thống tượng Phật cổ sơn son thếp vàng tinh xảo, chuông đồng cổ 'Nam Thiên Tự Chung' đúc thời Nguyễn ngân vang trầm ấm."
      ],
      "studyNote": "Chùa Nam Thiên là bài học sâu sắc về tinh thần hộ quốc an dân của Phật giáo Việt Nam trong công cuộc đấu tranh bảo vệ độc lập dân tộc."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4442158,106.0973672&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4442158,106.0973672",
      "locationName": "Chùa Nam Thiên (chùa Phố 1822)"
    },
    "gallery": [
      {
        "url": "./assets/images/chua-nam-thien/anh-dai-dien.jpg",
        "caption": "Chùa Nam Thiên (chùa Phố) - Ngôi chùa cổ khởi dựng năm 1822 tại phố Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại chùa Nam Thiên (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "chua-nam-thien.docx",
      "title": "Tư liệu khoa học chùa Nam Thiên (chùa Phố)",
      "path": "./assets/docs/chua-nam-thien.docx",
      "size": "15 KB"
    }
  },
  {
    "id": "vat-the-8",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 1987/QĐ-UBND, ngày 12/12/2014 của Chủ tịch UBND tỉnh",
    "worship": "Tướng Đề Truật (còn gọi là Dương Văn Truật, Đề Thuật, Đề Hậu, Hội Thuật)",
    "title": "Đền Đề Truật",
    "shortTitle": "Đền Đề Truật",
    "address": "Thôn Tiến Phan 1, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/den-de-truat/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-den-de-truat.mp3",
      "title": "Thuyết minh di tích đền Đề Truật"
    },
    "tags": [
      "Đền Đề Truật",
      "Dương Văn Truật",
      "Tướng bắn nỏ",
      "Khởi nghĩa Yên Thế",
      "Tiến Phan 1",
      "Di tích cấp tỉnh"
    ],
    "overview": "Ngôi đền thờ vị tướng tài ba Dương Văn Truật với tài bắn cung nỏ bách phát bách trúng trong phong trào Yên Thế, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Đền Đề Truật tọa lạc tại thôn Tiến Phan 1, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Đền được nhân dân lập nên để tưởng niệm và tri ân công đức to lớn của tướng quân Dương Văn Truật (Đề Truật, Đề Thuật, Đề Hậu, Hội Thuật) - tướng quân bắn nỏ bách phát bách trúng.",
      "historicalSignificance": [
        "**Tướng quân tài ba 'Bách phát bách trúng':** Đề Truật nổi danh khắp vùng Yên Thế bởi tài nghệ bắn cung nỏ trăm phát trúng trăm. Ông có công lớn chỉ huy dân binh chống giặc Cờ Đen (1865 - 1885) và chống giặc Pháp.",
        "**Trung kiên báo thù cho thủ lĩnh Đề Nắm:** Tháng 3/1892, khi Đề Nắm bị mưu hại, Đề Truật đã cùng dũng sĩ bắt sống kẻ phản trắc Đề Sặt áp giải về đồn Hố Chuối đền tội, bảo toàn danh dự cho nghĩa quân.",
        "**Xếp hạng di tích:** Đền Đề Truật được xếp hạng di tích lịch sử - văn hóa cấp tỉnh theo Quyết định số 1987/QĐ-UBND ngày 12/12/2014."
      ],
      "architecture": [
        "Đền mang kiến trúc chữ Đinh truyền thống, bài trí trang nghiêm ban thờ tướng quân Đề Truật, lư hương đồng và biểu tượng cây nỏ thần kỳ.",
        "Khuôn viên có sân tế lễ râm mát, cây cổ thụ che phủ, là nơi sinh hoạt văn hóa truyền thống của nhân dân."
      ],
      "studyNote": "Tấm gương quả cảm, tài năng quân sự và lòng trung thành tuyệt đối của tướng Đề Truật là ngọn lửa truyền cảm hứng mạnh mẽ cho học sinh Trường THPT Nhã Nam rèn luyện tài đức."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4525861,106.0980009&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4525861,106.0980009",
      "locationName": "Đền Đề Truật (tướng quân Dương Văn Truật)"
    },
    "gallery": [
      {
        "url": "./assets/images/den-de-truat/anh-dai-dien.jpg",
        "caption": "Đền Đề Truật - Thờ tướng quân Dương Văn Truật (Đề Truật)"
      },
      {
        "url": "./assets/images/den-de-truat/de-truat-anh-2.jpg",
        "caption": "Kiến trúc tiền tế đền Đề Truật tại thôn Mai Hoàng"
      },
      {
        "url": "./assets/images/den-de-truat/de-truat-anh-3.jpg",
        "caption": "Ban thờ và không gian trang nghiêm trong đền Đề Truật"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại đền Đề Truật (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "den-de-truat.docx",
      "title": "Tư liệu nghiên cứu đền Đề Truật",
      "path": "./assets/docs/den-de-truat.docx",
      "size": "21 KB"
    }
  },
  {
    "id": "vat-the-9",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": null,
    "title": "Nghĩa địa Pháp",
    "shortTitle": "Nghĩa địa Pháp",
    "address": "Khu vực đồi Phủ, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": null,
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-nghia-dia-phap.mp3",
      "title": "Thuyết minh di tích nghĩa địa Pháp"
    },
    "tags": [
      "Nghĩa địa Pháp",
      "Đồi Phủ",
      "Đồn Nhã Nam",
      "Chứng tích lịch sử",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Khu chứng tích lịch sử nơi chôn cất nhiều sĩ quan, binh lính Pháp tử trận tại chiến trường Yên Thế, di tích quốc gia đặc biệt.",
    "content": {
      "intro": "Nghĩa địa Pháp nằm cạnh khu đồn Nhã Nam trên đồi Phủ, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Đây là chứng tích lịch sử đặc biệt ghi dấu những tổn thất nặng nề và thất bại không thể tránh khỏi của đạo quân xâm lược trước ý chí quật cường của nghĩa quân Yên Thế.",
      "historicalSignificance": [
        "**Nơi chôn cất sĩ quan, binh lính Pháp tử trận:** Trong suốt cuộc chiến tranh xâm lược Yên Thế, hàng loạt sĩ quan chỉ huy và lính lê dương Pháp đã bỏ mạng dưới tay nghĩa quân của Đề Nắm và Đề Thám. Nổi bật có bia mộ của quan hai BEQVET Alexisz tử trận ngày 25/3/1892 khi tấn công đồn Đề Dương.",
        "**Chứng tích lịch sử đắt giá:** Nghĩa địa Pháp là lời cảnh tỉnh hùng hồn rằng không một sức mạnh bạo tàn nào có thể khuất phục được một dân tộc quyết tâm chiến đấu vì độc lập, tự do.",
        "**Xếp hạng quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Khu vực lưu giữ các bia đá thời Pháp thuộc với các dòng văn tự khắc tên, cấp bậc sĩ quan viễn chinh tử trận.",
        "Không gian được quy hoạch bảo tồn làm khu chứng tích lịch sử phục vụ tham quan, nghiên cứu khoa học."
      ],
      "studyNote": "Di tích giúp học sinh nhận thức sâu sắc về cái giá của hòa bình và sự quả cảm phi thường của các thế hệ nghĩa binh Yên Thế chống ngoại xâm."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4444805,106.0971055&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4444805,106.0971055",
      "locationName": "Nghĩa địa Pháp (khu vực đồi Phủ Nhã Nam)"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại di tích đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "nghia-dia-phap.docx",
      "title": "Thuyết minh đồi Phủ - nghĩa địa Pháp",
      "path": "./assets/docs/nghia-dia-phap.docx",
      "size": "19 KB"
    }
  },
  {
    "id": "vat-the-10",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Cả Trọng (con trai cả của Hoàng Hoa Thám)",
    "title": "Đền thờ Cả Trọng (đền Gốc Dẻ)",
    "shortTitle": "Đền thờ Cả Trọng",
    "address": "Khu vực Gốc Dẻ, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Đền Cả Trọng",
      "Gốc Dẻ",
      "Hoàng Đức Trọng",
      "Cả Trọng",
      "Hoàng Hoa Thám",
      "Khởi nghĩa Yên Thế",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Đền thờ tướng quân Cả Trọng (Hoàng Đức Trọng), con trai cả và vị tướng xuất chúng của thủ lĩnh Hoàng Hoa Thám, di tích quốc gia đặc biệt.",
    "content": {
      "intro": "Đền thờ Cả Trọng (tục gọi là đền Gốc Dẻ) tọa lạc tại xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ngôi đền được nhân dân lập nên để tưởng nhớ vị tướng tài hoa Hoàng Đức Trọng (Cả Trọng) - người con trai cả dũng lược của thủ lĩnh Hoàng Hoa Thám.",
      "historicalSignificance": [
        "**Tướng quân tài ba xuất chúng:** Cả Trọng là cánh tay mặt đắc lực của Hoàng Hoa Thám, sớm bộc lộ tài thao lược quân sự. Ông từng trực tiếp chỉ huy xây dựng căn cứ phòng thủ đồn Hố Chuối và lãnh đạo nhiều trận phục kích bẻ gãy các cuộc tấn công của binh đoàn lê dương Pháp.",
        "**Tấm lòng trung hiếu tiết nghĩa:** Cả Trọng luôn xông pha nơi tuyến đầu nguy hiểm, chiến đấu kiên cường đến hơi thở cuối cùng vì sự nghiệp cứu nước.",
        "**Xếp hạng quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Đền thờ mang kiến trúc truyền thống mộc mạc, hài hòa cùng cảnh quan đồi gò cây xanh râm mát.",
        "Bên trong đặt ban thờ tướng quân Cả Trọng cùng đồ tế khí, hoành phi câu đối ca ngợi lòng dũng cảm của người con núi rừng Yên Thế."
      ],
      "studyNote": "Hình tượng người tướng trẻ Cả Trọng là tấm gương sáng ngời về tuổi trẻ dấn thân, lòng quả cảm và khí phách kiên cường cho học sinh noi theo."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4443835,106.0966726&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4443835,106.0966726",
      "locationName": "Đền thờ Cả Trọng (đền Gốc Dẻ)"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại di tích đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "den-ca-trong.docx",
      "title": "Hồ sơ di tích đền thờ Cả Trọng",
      "path": "./assets/docs/den-ca-trong.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-11",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia-dac-biet",
    "rankName": "Di tích quốc gia đặc biệt",
    "badge": "Di tích quốc gia đặc biệt",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 548/QĐ-TTg, ngày 10/05/2012 của Thủ tướng Chính phủ",
    "worship": "Đức thánh Cao Sơn; phối thờ ba vị quận công Dương Đình Bột, Dương Đình Tuấn, Dương Đình Cúc",
    "title": "Đình Dương Lâm",
    "shortTitle": "Đình Dương Lâm",
    "address": "Thôn Dương Lâm, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã An Dương, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-duong-lam/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-duong-lam.mp3",
      "title": "Thuyết minh di tích đình Dương Lâm"
    },
    "tags": [
      "Đình Dương Lâm",
      "An Dương",
      "Lâm Giang đại vương",
      "Khởi nghĩa Yên Thế",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Ngôi đình cổ thời Lê thờ Cao Sơn và ba vị quận công họ Dương. Nơi Đề Thám cùng cụ Cai Hậu bàn việc chuyển đình về giữa làng, đào hầm bí mật cho nghĩa quân Yên Thế hoạt động.",
    "content": {
      "intro": "Đình Dương Lâm là ngôi đình cổ thời Lê tọa lạc ở vị trí trung tâm làng Dương Lâm, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã An Dương, huyện Tân Yên, tỉnh Bắc Giang). Đình nằm cách thành phố Bắc Giang khoảng 22km về phía Tây Bắc, là di tích quốc gia đặc biệt tiêu biểu trong hệ thống Những địa điểm Khởi nghĩa Yên Thế.",
      "historicalSignificance": [
        "**Ngôi đình cổ dời vị trí theo kế sách kháng chiến của Đề Thám:** Đình xưa vốn tọa lạc ở khu đất Bãi Đình. Do giặc giã nhiều, Hoàng Hoa Thám và nghĩa quân Yên Thế đã bàn với dân làng chuyển đình về giữa làng như hiện nay để tiện trông nom và bảo đảm hoạt động bí mật.",
        "**Căn cứ vững chắc của cụ Cai Hậu và nghĩa quân:** Cụ Cai Hậu (Dương Văn Hậu) là người giúp Hoàng Hoa Thám rất đắc lực (1885 - 1895). Cụ đã cho đào một đường hầm bí mật từ hậu cung đình Dương Lâm xuyên ra bờ ao để nghĩa quân rút lui an toàn khi bị vây hãm; dấu vết đường hầm nay vẫn còn.",
        "**Tình nghĩa gắn bó sâu nặng với Đề Thám:** Đề Thám đã tin tưởng gửi con trai cả của mình là Cả Trọng về Dương Lâm ăn học tại nhà cụ Cai Hậu. Đề Thám cùng cụ Cai Hậu còn trồng cây dã hương kỷ niệm trước sân đình.",
        "**Quê hương của ba vị quận công họ Dương:** Dương Lâm là quê hương quận công Dương Đình Bột, Dương Đình Tuấn, Dương Đình Cúc. Năm 1826, Dương Đình Cúc đã dựng cờ khởi nghĩa chống triều Nguyễn ngay tại đình làng mình.",
        "**Xếp hạng di tích quốc gia đặc biệt:** Được xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ."
      ],
      "architecture": [
        "Đình Dương Lâm là nơi thờ Đức thánh Cao Sơn từ thời Hùng Vương thứ 18 và phối thờ ba vị quận công họ Dương có công đánh giặc cứu nước.",
        "Kiến trúc đình cổ thời Lê bảo lưu kết cấu gỗ lim cổ kính, vì kèo vững chãi, chạm khắc rồng mây hoa lá tinh xảo và khuôn viên trang nghiêm giữa làng quê yên bình."
      ],
      "studyNote": "Đình Dương Lâm là biểu tượng cho sự đoàn kết bền chặt giữa tín ngưỡng truyền thống và phong trào đấu tranh giữ nước của đồng bào Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4210834,106.0960966&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4210834,106.0960966",
      "locationName": "Đình Dương Lâm (di tích quốc gia đặc biệt)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-duong-lam/anh-dai-dien.jpg",
        "caption": "Đình Dương Lâm - Di tích quốc gia đặc biệt thời Lê thuộc xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Dương Lâm (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "dinh-duong-lam.docx",
      "title": "Hồ sơ di tích đình Dương Lâm",
      "path": "./assets/docs/dinh-duong-lam.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-12",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 10/QĐ-UBND, ngày 06/01/2012 của Chủ tịch UBND tỉnh",
    "worship": "Đức thánh Cao Sơn, Quý Minh",
    "title": "Đình Cầu Thượng",
    "shortTitle": "Đình Cầu Thượng",
    "address": "Thôn Cầu Thượng, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": null,
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-cau-thuong.mp3",
      "title": "Thuyết minh di tích đình Cầu Thượng"
    },
    "tags": [
      "Đình Cầu Thượng",
      "Cao Sơn Quý Minh",
      "Cầu Thượng",
      "Di tích cấp tỉnh"
    ],
    "overview": "Ngôi đình làng cổ kính thờ Đức thánh Cao Sơn, Quý Minh, trung tâm tín ngưỡng gắn liền với lịch sử Nhã Nam, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Đình Cầu Thượng tọa lạc tại thôn Cầu Thượng, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ngôi đình là thiết chế văn hóa tâm linh thiêng liêng của nhân dân làng Cầu Thượng qua bao thế hệ.",
      "historicalSignificance": [
        "**Hậu phương vững chắc của các phong trào yêu nước:** Nhân dân thôn Cầu Thượng có truyền thống đoàn kết, kiên cường đánh giặc bảo vệ quê hương.",
        "**Xếp hạng di tích:** Đình Cầu Thượng được Chủ tịch UBND tỉnh ban hành Quyết định số 10/QĐ-UBND ngày 06/01/2012 xếp hạng di tích lịch sử - văn hóa cấp tỉnh."
      ],
      "architecture": [
        "Kiến trúc đình gồm gian Tiền tế và Hậu cung, vì nóc kết cấu chồng rường giá chiêng cổ truyền, cột gỗ lim vững chãi.",
        "Lưu giữ kiệu thờ, hương án cổ, hoành phi câu đối sơn son thếp vàng ca ngợi công đức thánh thần phù trợ dân làng."
      ],
      "studyNote": "Tìm hiểu về đình Cầu Thượng giúp học sinh hiểu sâu sắc hơn về nét đẹp văn hóa làng xã và tín ngưỡng tôn thờ tiền nhân của vùng đất Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4397723,106.0893274&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4397723,106.0893274",
      "locationName": "Đình Cầu Thượng (di tích lịch sử - văn hóa cấp tỉnh)"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại di tích đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "dinh-cau-thuong.docx",
      "title": "Hồ sơ di tích đình Cầu Thượng",
      "path": "./assets/docs/dinh-cau-thuong.docx",
      "size": "13 KB"
    }
  },
  {
    "id": "vat-the-13",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 2315/QĐ-CT, ngày 30/12/2005 của Chủ tịch UBND tỉnh",
    "worship": "Đức thánh Cao Sơn, Quý Minh",
    "title": "Đình Sậy",
    "shortTitle": "Đình Sậy",
    "address": "Thôn Sậy, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-say/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-say.mp3",
      "title": "Thuyết minh di tích đình Sậy"
    },
    "tags": [
      "Đình Sậy",
      "Thôn Sậy",
      "Cao Sơn Quý Minh",
      "Tân Trung",
      "Di tích cấp tỉnh"
    ],
    "overview": "Ngôi đình làng cổ truyền của thôn Sậy, nơi thờ Đức thánh Cao Sơn, Quý Minh và lưu giữ lễ hội truyền thống, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Đình Sậy tọa lạc tại thôn Sậy, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang). Ngôi đình là di sản tâm linh quý giá của bà con thôn Sậy qua nhiều đời.",
      "historicalSignificance": [
        "**Lịch sử làng xã ngàn đời:** Đình Sậy gắn liền với công cuộc khai phá, lập làng và tinh thần chống giặc giữ làng của các thế hệ cư dân vùng Tân Trung xưa.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh xếp hạng di tích lịch sử - văn hóa cấp tỉnh theo Quyết định số 2315/QĐ-CT ngày 30/12/2005."
      ],
      "architecture": [
        "Đình mang đậm phong cách kiến trúc thời Nguyễn, tường xây gạch chỉ cổ, mái lợp ngói mũi hài mộc mạc.",
        "Bộ vì nóc kết cấu con chồng giá chiêng, bảo tồn bát hương gốm cổ, hoành phi câu đối và các di vật thờ phụng trang trọng."
      ],
      "studyNote": "Đình Sậy là minh chứng sống động cho bản sắc cộng đồng làng quê thanh bình nhưng quật cường của nhân dân xã Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4371635,106.1091383&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4371635,106.1091383",
      "locationName": "Đình Sậy (chùa làng Sậy, di tích cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-say/anh-dai-dien.jpg",
        "caption": "Đình Sậy - Di tích lịch sử - văn hóa cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Sậy (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "dinh-say.docx",
      "title": "Hồ sơ di tích đình Sậy",
      "path": "./assets/docs/dinh-say.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-14",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 2169/QĐ-UBND, ngày 29/12/2010 của Chủ tịch UBND tỉnh",
    "worship": "Cao Sơn, Quý Minh, Thành hoàng làng Hòa Làng",
    "title": "Đình Nẻo",
    "shortTitle": "Đình Nẻo",
    "address": "Thôn Nẻo, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-neo/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-neo.mp3",
      "title": "Thuyết minh di tích đình Nẻo"
    },
    "tags": [
      "Đình Nẻo",
      "Thôn Nẻo",
      "Liên Sơn",
      "Hòa Làng",
      "Di tích cấp tỉnh"
    ],
    "overview": "Ngôi đình cổ của thôn Nẻo thờ Đức thánh Cao Sơn, Quý Minh và Thành hoàng làng Hòa Làng, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Đình Nẻo tọa lạc tại thôn Nẻo, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang). Ngôi đình là trung tâm hội tụ văn hóa tín ngưỡng truyền thống của vùng đất Liên Sơn cũ.",
      "historicalSignificance": [
        "**Trung tâm đoàn kết thôn xóm:** Đình là nơi tổ chức tế lễ, sinh hoạt hương ước làng xã và nuôi dưỡng tinh thần yêu nước trong các cuộc đấu tranh giải phóng dân tộc.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh ban hành Quyết định số 2169/QĐ-UBND ngày 29/12/2010 xếp hạng di tích lịch sử - văn hóa cấp tỉnh."
      ],
      "architecture": [
        "Kiến trúc đình cổ truyền vững chắc, mái ngói cong đầu đao thanh thoát, khung gỗ lim chịu lực kiên cố.",
        "Lưu giữ nhiều cấu kiện gỗ chạm trổ hình hoa cúc dây, rồng chầu mặt trời sinh động cùng ngai thờ, sắc phong cổ."
      ],
      "studyNote": "Khám phá đình Nẻo giúp bồi đắp lòng tự hào về truyền thống bảo tồn di sản của các thế hệ nhân dân thôn Nẻo nói riêng và xã Nhã Nam nói chung."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.408497,106.1126369&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.408497,106.1126369",
      "locationName": "Đình Nẻo (di tích lịch sử - văn hóa cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-neo/anh-dai-dien.jpg",
        "caption": "Đình Nẻo - Di tích lịch sử - văn hóa cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Nẻo (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "dinh-neo.docx",
      "title": "Hồ sơ di tích đình Nẻo",
      "path": "./assets/docs/dinh-neo.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "vat-the-15",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử - văn hóa",
    "decision": "QĐ số 2169/QĐ-UBND, ngày 29/12/2010 của Chủ tịch UBND tỉnh",
    "worship": "Thờ Phật",
    "title": "Chùa Dương Sơn",
    "shortTitle": "Chùa Dương Sơn",
    "address": "Thôn Dương Sơn, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/chua-duong-son/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-chua-duong-son.mp3",
      "title": "Thuyết minh di tích chùa Dương Sơn"
    },
    "video": {
      "title": "Khám phá làng nói phét Dương Sơn (Nhã Nam) và những câu chuyện dân gian hấp dẫn",
      "youtubeId": "w-SSxpYTbUs",
      "youtubeUrl": "https://www.youtube.com/watch?v=w-SSxpYTbUs",
      "embedUrl": "https://www.youtube.com/embed/w-SSxpYTbUs"
    },
    "tags": [
      "Chùa Dương Sơn",
      "Dương Sơn",
      "Liên Sơn",
      "Phật giáo",
      "Di tích cấp tỉnh"
    ],
    "overview": "Ngôi chùa cổ kính thanh tịnh của làng Dương Sơn, nơi lưu giữ tinh hoa Phật giáo và đạo lý truyền thống, di tích lịch sử - văn hóa cấp tỉnh.",
    "content": {
      "intro": "Chùa Dương Sơn tọa lạc tại thôn Dương Sơn, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang). Ngôi chùa cổ thanh tịnh giữa làng quê trù phú, là chốn tu tâm hướng thiện của bà con Phật tử địa phương.",
      "historicalSignificance": [
        "**Nơi nuôi dưỡng tâm thiện và tinh thần yêu nước:** Trong những năm tháng chiến tranh, chùa Dương Sơn luôn là điểm tựa tâm linh vững chắc cho dân làng an tâm sản xuất và chi viện cho tiền tuyến.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh ban hành Quyết định số 2169/QĐ-UBND ngày 29/12/2010 xếp hạng di tích lịch sử - văn hóa cấp tỉnh."
      ],
      "architecture": [
        "Chùa gồm Tòa Tiền đường, Thượng điện và vườn cây ăn trái, hoa viên tĩnh lặng.",
        "Hệ thống tượng Phật sơn son thếp vàng, bia ký và chuông đồng cổ được bảo quản trang trọng."
      ],
      "studyNote": "Chùa Dương Sơn giáo dục học sinh về lòng từ bi, nhân ái và sự trân trọng gìn giữ không gian văn hóa tâm linh thanh tịnh của quê hương."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.408497,106.1126369&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.408497,106.1126369",
      "locationName": "Chùa Dương Sơn (di tích cấp tỉnh, làng Dương Sơn)"
    },
    "gallery": [
      {
        "url": "./assets/images/chua-duong-son/anh-dai-dien.jpg",
        "caption": "Chùa Dương Sơn - Ngôi chùa cổ thanh tịnh tại thôn Dương Sơn, xã Nhã Nam"
      },
      {
        "url": "./assets/images/chua-duong-son/chua-duong-son-2.jpg",
        "caption": "Không gian kiến trúc cổ truyền và khuôn viên chùa Dương Sơn"
      },
      {
        "url": "./assets/images/chua-duong-son/chua-duong-son-3.jpg",
        "caption": "Ban thờ Phật trang nghiêm và hệ thống tượng pháp cổ tại chùa Dương Sơn"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại chùa Dương Sơn (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "chua-duong-son.docx",
      "title": "Hồ sơ di tích chùa Dương Sơn",
      "path": "./assets/docs/chua-duong-son.docx",
      "size": "13 KB"
    }
  },
  {
    "id": "vat-the-16",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử",
    "decision": "QĐ số 2012/QĐ-UBND, ngày 24/12/2018 của Chủ tịch UBND tỉnh",
    "worship": "Thành hoàng Cao Sơn, Quý Minh",
    "title": "Đình làng Sặt",
    "shortTitle": "Đình làng Sặt",
    "address": "Thôn Sặt, xã Nhã Nam, tỉnh Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
    "heroImage": "./assets/images/hero-vat-the.jpg",
    "thumbnail": "./assets/images/dinh-sat/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-sat.mp3",
      "title": "Thuyết minh di tích đình làng Sặt"
    },
    "tags": [
      "Đình làng Sặt",
      "Thôn Sặt",
      "Cao Sơn Quý Minh",
      "Liên Sơn",
      "Khởi nghĩa Yên Thế",
      "Trận làng Sặt 1889",
      "Di tích cấp tỉnh"
    ],
    "overview": "Địa danh lịch sử gắn liền phong trào khởi nghĩa Yên Thế, nơi họp bàn của nghĩa quân và trung tâm sinh hoạt văn hóa tín ngưỡng 5 thôn, di tích lịch sử cấp tỉnh.",
    "content": {
      "intro": "Đình làng Sặt tọa lạc tại thôn Sặt, xã Nhã Nam, tỉnh Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang). Cuối thế kỷ XIX, đình làng Sặt là một trong những địa điểm có nhiều sự kiện gắn liền với phong trào khởi nghĩa Yên Thế oanh liệt.",
      "historicalSignificance": [
        "**Căn cứ hội họp của nghĩa quân Yên Thế:** Nơi đây thường được các thủ lĩnh cuộc khởi nghĩa chọn làm nơi hội họp của bộ đội và du kích địa phương trong kháng chiến chống thực dân Pháp.",
        "**Địa danh trận chiến làng Sặt năm 1889:** Năm 1889, quân Pháp từ đồn Nhã Nam tiến hành càn quét làng Sặt. Dưới sự hiệp lực của dân làng Sặt và tài mưu trí của nghĩa quân Yên Thế, ta đã phục kích bẻ gãy nhiều đợt tấn công của địch.",
        "**Xếp hạng di tích:** Năm 2018, đình làng Sặt được Chủ tịch UBND tỉnh ban hành Quyết định số 2012/QĐ-UBND ngày 24/12/2018 xếp hạng di tích lịch sử cấp tỉnh."
      ],
      "architecture": [
        "Đình khởi dựng mang phong cách kiến trúc thời Nguyễn, tường gạch cổ kính, mái ngói mũi hài rêu phong vững chãi.",
        "Trải qua biến cố thời gian, đình làng Sặt còn bảo lưu nhiều tài liệu và hiện vật quý giá: ngai thờ, bài vị, hòm sắc, sắc phong niên hiệu Duy Tân thứ 3 (1909), bát hương gốm Phù Lãng cổ, sập thờ và bộ bát bửu trang nghiêm.",
        "Đình là trung tâm sinh hoạt văn hóa tín ngưỡng chung của nhân dân 5 thôn trong xã Liên Sơn cũ: Chài, Quân, Đồn, Thượng và Phố."
      ],
      "studyNote": "Đình làng Sặt là minh chứng hào hùng về tinh thần chiến đấu bảo vệ quê hương và ý thức gìn giữ cổ vật quý báu của các thế hệ nhân dân xã Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4160672,106.1089053&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4160672,106.1089053",
      "locationName": "Đình làng Sặt (di tích lịch sử - văn hóa cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-sat/anh-dai-dien.jpg",
        "caption": "Đình làng Sặt - Di tích lịch sử cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình làng Sặt (Hồ sơ Trường THPT Nhã Nam)",
    "docFile": {
      "fileName": "dinh-sat.docx",
      "title": "Hồ sơ di tích đình làng Sặt",
      "path": "./assets/docs/dinh-sat.docx",
      "size": "37 KB"
    }
  }
];

const INTANGIBLE_HERITAGE_DATA = [
  {
    "id": "phi-vat-the-1",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Lễ hội truyền thống",
    "title": "Lễ hội khởi nghĩa Yên Thế tại xã Nhã Nam",
    "shortTitle": "Lễ hội Yên Thế tại Nhã Nam",
    "scope": "Địa bàn toàn xã Nhã Nam (trọng tâm tại đình - chùa Hả, chùa Tứ Giáp và đồi Phủ)",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "video": {
      "title": "Đề Nắm tế cờ khởi nghĩa tại đình Hả, Nhã Nam, Bắc Ninh (tư liệu: thầy Bùi Công)",
      "youtubeId": "13WbD3DOeQc",
      "youtubeUrl": "https://www.youtube.com/watch?v=13WbD3DOeQc",
      "embedUrl": "https://www.youtube.com/embed/13WbD3DOeQc"
    },
    "tags": [
      "Lễ hội Yên Thế",
      "Lễ hội đình Hả",
      "Chùa Tứ Giáp",
      "16 tháng 3",
      "Tế cờ",
      "Lễ hội truyền thống",
      "Xã Nhã Nam"
    ],
    "overview": "Lễ hội truyền thống tưởng nhớ ngày thủ lĩnh Lương Văn Nắm tế cờ phát động khởi nghĩa ngày 16/3 và tri ân các anh hùng nghĩa sĩ Yên Thế.",
    "content": {
      "intro": "Lễ hội truyền thống tại xã Nhã Nam diễn ra vào tháng Giêng và tháng Ba âm lịch hàng năm (đặc biệt là ngày 15 - 16/3 dương lịch gắn với lễ hội khởi nghĩa Yên Thế). Đây là ngày hội non sông tôn vinh hào khí quật cường của nghĩa quân áo vải và giáo dục truyền thống cách mạng cho muôn đời sau.",
      "originAndMeaning": [
        "**Tưởng niệm ngày lễ tế cờ lịch sử 16/3/1884:** Tái hiện trang nghiêm nghi lễ cắt máu ăn thề của Đề Nắm và nghĩa quân tại sân đình Hả.",
        "**Tôn vinh thủ lĩnh Lương Văn Nắm và Hoàng Hoa Thám:** Khẳng định tầm vóc lịch sử của cuộc khởi nghĩa nông dân vĩ đại nhất cuối thế kỷ XIX - đầu thế kỷ XX.",
        "**Cố kết cộng đồng làng xã:** Dịp tụ hội của con em quê hương Nhã Nam khắp mọi miền đất nước trở về nguồn cội."
      ],
      "ritualsAndActivities": [
        "**Phần lễ trang nghiêm:** Lễ rước kiệu truyền thống từ các làng thôn, lễ dâng hương tưởng niệm, lễ tế cờ tái hiện lịch sử hào hùng.",
        "**Phần hội tưng bừng:** Hội diễn văn nghệ quần chúng, thi đấu cờ tướng, kéo co, đấu vật dân tộc, giải bóng chuyền, hội chọi gà và các trò chơi dân gian đặc sắc."
      ],
      "preservationValue": "Lễ hội là không gian văn hóa sống động kết nối các thế hệ học sinh trường THPT Nhã Nam với cội nguồn lịch sử oanh liệt của ông cha."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Đình+Hả,+xã+Nhã+Nam,+Thành+phố+Bắc+Ninh",
      "locationName": "Trung tâm lễ hội Yên Thế tại đình Hả - xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "le-hoi-yen-the-nha-nam.docx",
      "title": "Tư liệu lễ hội Yên Thế tại xã Nhã Nam",
      "path": "./assets/docs/le-hoi-yen-the-nha-nam.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "phi-vat-the-2",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Nghệ thuật trình diễn dân gian",
    "title": "Nghệ thuật hát chèo truyền thống xã Nhã Nam",
    "shortTitle": "Hát chèo Nhã Nam",
    "scope": "Các câu lạc bộ chèo tại các thôn: Làng Chuông, Chùa Nguộn, Cầu Thượng, xã Nhã Nam",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "video": {
      "title": "Vở diễn \"Duyên hài lứa đôi\" — Đơn vị Nhã Nam (Hội diễn quần chúng tỉnh Bắc Ninh)",
      "youtubeId": "K_7f4eD1l_0",
      "youtubeUrl": "https://www.youtube.com/watch?v=K_7f4eD1l_0",
      "embedUrl": "https://www.youtube.com/embed/K_7f4eD1l_0"
    },
    "tags": [
      "Hát chèo",
      "Chiếu chèo",
      "Nghệ thuật truyền thống",
      "Dân ca",
      "Làng Chuông",
      "Xã Nhã Nam"
    ],
    "overview": "Di sản văn hóa phi vật thể đặc sắc, những làn điệu chèo mượt mà thắm đượm tình làng nghĩa xóm của người dân vùng đất Cầu Vồng.",
    "content": {
      "intro": "Nghệ thuật hát chèo từ lâu đã bén rễ sâu đậm trong đời sống tinh thần của nhân dân xã Nhã Nam. Những làn điệu chèo ngọt ngào, hóm hỉnh mà sâu lắng đã nuôi dưỡng tâm hồn biết bao thế hệ người dân quê hương đất Cầu Vồng.",
      "originAndMeaning": [
        "**Gắn liền chiếu chèo sân đình:** Ra đời từ các buổi sinh hoạt nông nhàn và hội làng cổ xưa tại đình làng Chuông, chùa Tứ Giáp.",
        "**Nội dung phản ánh cuộc sống:** Ngợi ca tình yêu quê hương, đất nước, đạo hiếu làm con, phê phán thói hư tật xấu và biểu dương lòng kiên trinh.",
        "**Đặc trưng chiếu chèo Nhã Nam:** Giữ được chất chèo cổ mộc mạc với các điệu Đào liễu, Quân thư, Luyện năm cung thắm thiết."
      ],
      "ritualsAndActivities": [
        "Biểu diễn giao lưu tại sân đình vào mỗi dịp lễ hội mùa xuân, ngày hội Đại đoàn kết toàn dân tộc.",
        "Các câu lạc bộ chèo thường xuyên mở lớp truyền dạy làn điệu cho các em học sinh, thế hệ thanh thiếu niên địa phương."
      ],
      "preservationValue": "Hát chèo là cây cầu nối tâm hồn, giáo dục tình yêu văn hóa dân tộc trong các hoạt động ngoại khóa của học sinh THPT Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Đình+Nhã+Nam,+xã+Nhã+Nam,+Thành+phố+Bắc+Ninh",
      "locationName": "Chiếu chèo làng Chuông - xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "hat-cheo-truyen-thong-nha-nam.docx",
      "title": "Tư liệu nghệ thuật hát chèo truyền thống xã Nhã Nam",
      "path": "./assets/docs/hat-cheo-truyen-thong-nha-nam.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "phi-vat-the-3",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Nghề truyền thống",
    "title": "Nghề làm bánh khảo, kẹo lạc truyền thống xã Nhã Nam",
    "shortTitle": "Bánh khảo & Kẹo lạc Nhã Nam",
    "scope": "Các hộ gia đình nghệ nhân làm nghề truyền thống tại xã Nhã Nam",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Bánh khảo",
      "Kẹo lạc",
      "Nghề truyền thống",
      "Ẩm thực dân gian",
      "Đặc sản",
      "Xã Nhã Nam"
    ],
    "overview": "Đặc sản ẩm thực dân gian nức tiếng, thức quà quê mộc mạc thơm đượm hương vị gạo nếp cái hoa vàng và mật mía quê nhà.",
    "content": {
      "intro": "Bánh khảo và kẹo lạc Nhã Nam là thức quà ẩm thực truyền thống nức tiếng gần xa. Mỗi phong bánh khảo thơm dịu hương nếp, từng thanh kẹo lạc giòn tan bùi ngậy đã trở thành nét đẹp văn hóa gắn bó thiết thân với mâm cỗ Tết và lễ vật dâng cúng đình chùa của người dân xã Nhã Nam.",
      "originAndMeaning": [
        "**Nét văn hóa hiếu nghĩa:** Bánh khảo, kẹo lạc là thức quà quý dâng cúng tổ tiên, trời đất trong các dịp Tết Nguyên đán và lễ hội cổ truyền.",
        "**Kế thừa tinh hoa ẩm thực:** Nguyên liệu được tuyển chọn từ gạo nếp cái hoa vàng hạt mẩy, lạc đồi thơm bùi của vùng đất đồi bãi Nhã Nam kết hợp mật mía đường phèn tự nhiên."
      ],
      "ritualsAndActivities": [
        "Quy trình tỉ mỉ: Rang gạo nếp vừa độ chín tới, xay mịn thành bột, ủ đường cho ngấu rồi đem đóng khuôn gỗ thủ công.",
        "Làm kẹo lạc: Nấu đường mạch nha sôi dẻo, thả lạc rang chín vàng đều, dàn mỏng trên mặt bàn rồi cắt thành thanh thơm giòn."
      ],
      "preservationValue": "Gìn giữ hương vị cội nguồn của quê hương, khơi gợi niềm tự hào về sản vật nông nghiệp của địa phương trong các dự án học tập sáng tạo."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=xã+Nhã+Nam,+Thành+phố+Bắc+Ninh",
      "locationName": "Làng nghề bánh khảo & kẹo lạc - xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "nghe-lam-banh-khao-keo-lac-nha-nam.docx",
      "title": "Tư liệu nghề làm bánh khảo, kẹo lạc truyền thống",
      "path": "./assets/docs/nghe-lam-banh-khao-keo-lac-nha-nam.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "phi-vat-the-4",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Tập quán xã hội & tín ngưỡng",
    "title": "Tập quán tưởng niệm Lương Văn Nắm và Hoàng Hoa Thám",
    "shortTitle": "Tưởng niệm nghĩa quân Yên Thế",
    "scope": "Địa bàn toàn xã Nhã Nam, trung tâm tại đình Hả, đền Gốc Khế, đền Đề Truật",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Lương Văn Nắm",
      "Hoàng Hoa Thám",
      "Đề Truật",
      "Tưởng niệm",
      "Tập quán tín ngưỡng",
      "Uống nước nhớ nguồn",
      "Xã Nhã Nam"
    ],
    "overview": "Tập quán tín ngưỡng tâm linh thành kính của nhân dân Nhã Nam đối với các vị thủ lĩnh và nghĩa sĩ hy sinh vì nền độc lập của Tổ quốc.",
    "content": {
      "intro": "Tập quán tưởng niệm thủ lĩnh Đề Nắm, cụ Hoàng Hoa Thám cùng các nghĩa binh Yên Thế là nét đẹp văn hóa tâm linh thấm đượm truyền thống 'Uống nước nhớ nguồn'. Qua hàng trăm năm dâu bể, nhân dân xã Nhã Nam vẫn gìn giữ vẹn nguyên lòng thành kính, đời đời hương khói tri ân những người con anh hùng của quê hương.",
      "originAndMeaning": [
        "**Đạo lý tri ân ngàn đời:** Xuất phát từ lòng biết ơn vô hạn của người dân đối với những người đã xả thân cứu nước cứu làng.",
        "**Biểu tượng tinh thần độc lập:** Hình tượng Đề Nắm và Đề Thám trở thành biểu tượng tinh thần của ý chí không khuất phục trước ngoại bang."
      ],
      "ritualsAndActivities": [
        "Nghi thức thắp hương tưởng niệm vào ngày rằm, mùng một và ngày giỗ trận tại đình Hả, đền Gốc Khế, đền Đề Truật.",
        "Lễ dâng hương báo công của học sinh trường THPT Nhã Nam trước thềm các kỳ thi và sự kiện trọng đại của nhà trường."
      ],
      "preservationValue": "Là bài học đạo đức, lý tưởng cách mạng sâu sắc nhất cho đoàn viên, học sinh xã Nhã Nam trên con đường rèn đức luyện tài."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Đình+Hả,+xã+Nhã+Nam,+Thành+phố+Bắc+Ninh",
      "locationName": "Khu tưởng niệm nghĩa sĩ Yên Thế - xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "tap-quan-tuong-niem-de-nam-de-tham.docx",
      "title": "Tư liệu tập quán tưởng niệm Lương Văn Nắm và Hoàng Hoa Thám",
      "path": "./assets/docs/tap-quan-tuong-niem-de-nam-de-tham.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "phi-vat-the-5",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Trò chơi dân gian & võ thuật",
    "title": "Trò chơi dân gian và võ cổ truyền trong lễ hội Nhã Nam",
    "shortTitle": "Trò chơi dân gian và võ cổ truyền",
    "scope": "Không gian lễ hội truyền thống tại các thôn trong xã Nhã Nam",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Võ cổ truyền",
      "Vật dân tộc",
      "Trò chơi dân gian",
      "Cờ người",
      "Kéo co",
      "Hội làng",
      "Xã Nhã Nam"
    ],
    "overview": "Kho tàng các thế võ Yên Thế anh hùng cùng các môn thể thao dân gian tráng kiện, thể hiện tinh thần thượng võ kiên cường của vùng đất Cầu Vồng.",
    "content": {
      "intro": "Vùng đất Nhã Nam từ ngàn xưa đã nổi danh là 'đất Cầu Vồng' với tinh thần thượng võ ngút trời. Trong các dịp hội làng mùa xuân, các bài quyền võ cổ truyền, môn vật dân tộc và trò chơi dân gian luôn là tâm điểm thu hút đông đảo nam thanh nữ tú và bà con khắp vùng.",
      "originAndMeaning": [
        "**Gắn với thao lược quân sự của nghĩa quân Yên Thế:** Nhiều bài võ thuật, đấu gậy, đấu nỏ cổ truyền bắt nguồn từ các bài tập luyện chiến đấu của nghĩa binh thời Đề Nắm, Đề Thám.",
        "**Rèn luyện sức khỏe và ý chí:** Tinh thần thượng võ 'đất Cầu Vồng' hun đúc nên lòng quả cảm, đức tính kiên nhẫn và sức bền bỉ cho người dân."
      ],
      "ritualsAndActivities": [
        "Sới vật dân tộc đầu xuân: Tiếng trống thúc giục, các đô vật tranh tài quyết liệt trên nền cát mịn với tinh thần thượng võ mãnh liệt.",
        "Hội thi cờ người, kéo co, đập niêu đất, chọi gà và giao lưu võ thuật cổ truyền giữa các trường học và câu lạc bộ thanh niên."
      ],
      "preservationValue": "Góp phần rèn luyện thể lực và bồi dưỡng lòng dũng cảm, tinh thần đồng đội cho học sinh thế hệ trẻ Trường THPT Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Sới+vật+lễ+hội,+xã+Nhã+Nam,+Thành+phố+Bắc+Ninh",
      "locationName": "Sới vật & không gian hội thao dân gian - xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập và Trường THPT Nhã Nam cập nhật",
    "docFile": {
      "fileName": "tro-choi-dan-gian-vo-co-truyen.docx",
      "title": "Tư liệu trò chơi dân gian và võ cổ truyền trong lễ hội Nhã Nam",
      "path": "./assets/docs/tro-choi-dan-gian-vo-co-truyen.docx",
      "size": "37 KB"
    }
  },
  {
    "id": "phi-vat-the-6",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "rank": "phi-vat-the",
    "rankName": "Di sản văn hóa phi vật thể",
    "badge": "Văn hóa dân gian đặc sắc",
    "title": "Nghệ thuật kể chuyện dân gian – Làng nói phét Dương Sơn",
    "shortTitle": "Làng nói phét Dương Sơn",
    "scope": "Thôn Dương Sơn, xã Nhã Nam, tỉnh Bắc Ninh",
    "address": "Thôn Dương Sơn, xã Nhã Nam, tỉnh Bắc Ninh",
    "heroImage": "./assets/images/hero-phi-vat-the.jpg",
    "thumbnail": null,
    "tags": [
      "Làng nói phét",
      "Dương Sơn",
      "Kể chuyện dân gian",
      "Tiếng cười trào lộng",
      "Văn hóa dân gian",
      "Nhã Nam",
      "Bắc Ninh"
    ],
    "video": {
      "title": "Khám phá làng nói phét Dương Sơn (Nhã Nam) và những câu chuyện dân gian hấp dẫn",
      "youtubeId": "w-SSxpYTbUs",
      "youtubeUrl": "https://www.youtube.com/watch?v=w-SSxpYTbUs",
      "embedUrl": "https://www.youtube.com/embed/w-SSxpYTbUs"
    },
    "overview": "Nét sinh hoạt văn hóa dân gian độc đáo của người dân làng Dương Sơn với nghệ thuật nói khoác, trào lộng hóm hỉnh mang lại tiếng cười sảng khoái và tinh thần lạc quan.",
    "content": {
      "intro": "Làng Dương Sơn (xã Nhã Nam, tỉnh Bắc Ninh) từ lâu đã nổi tiếng khắp vùng Kinh Bắc với danh xưng độc đáo 'Làng nói phét Dương Sơn'. Đây không phải là thói xấu lừa lọc, dối trá mà là một nghệ thuật kể chuyện dân gian trào lộng, khoa trương đầy trí tuệ và khiếu hài hước của những người nông dân chân lấm tay bùn.",
      "originAndMeaning": [
        "**Nguồn gốc tiếng cười lạc quan:** Xuất phát từ đời sống lao động đồng áng vất vả, người dân Dương Sơn sáng tạo ra cách nói cường điệu, phóng đại những sự vật, hiện tượng quen thuộc (củ khoai to bằng cái thuyền, con ếch to bằng cái nong...) để xua tan mệt nhọc sau ngày dài lao động.",
        "**Nghệ thuật ngôn từ hóm hỉnh:** Người kể chuyện Dương Sơn có tài 'nói khoác như thật', khuôn mặt nghiêm túc, tình tiết ly kỳ bất ngờ khiến người nghe đi từ tò mò đến bật cười sảng khoái.",
        "**Giá trị nhân văn và tinh thần yêu đời:** Tiếng cười Dương Sơn thể hiện niềm ước mơ chinh phục tự nhiên, mong ước mùa màng bội thu, đời sống no ấm và tinh thần lạc quan vượt lên gian khó của nhân dân lao động xứ Kinh Bắc."
      ],
      "practice": [
        "**Không gian sinh hoạt:** Thường diễn ra bên ấm chè xanh nơi quán nước đầu làng, dưới bóng đa sân đình, trong những lúc nông nhàn hay dịp hội làng rộn rã.",
        "**Các nghệ nhân dân gian:** Nhiều bậc cao niên trong làng được ví như những 'kho chuyện sống', thuộc lòng hàng trăm giai thoại trào lộng được truyền khẩu qua nhiều thế hệ.",
        "**Giao lưu và lan tỏa:** Làng nói phét Dương Sơn đã trở thành điểm đến hấp dẫn với các nhà nghiên cứu văn hóa dân gian, đài truyền hình và du khách gần xa muốn tìm về tiếng cười hồn nhiên, thuần hậu của làng quê Việt Nam."
      ],
      "studyNote": "Đối với học sinh và thế hệ trẻ Nhã Nam: Văn hóa làng nói phét Dương Sơn là minh chứng cho sự giàu đẹp, hóm hỉnh của tiếng Việt và tâm hồn lạc quan, yêu đời tha thiết của cha ông ta."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=Chùa+Dương+Sơn,+Tân+Trung,+Tân+Yên,+Bắc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Chùa+Dương+Sơn,+thôn+Dương+Sơn,+xã+Nhã+Nam,+tỉnh+Bắc+Ninh",
      "locationName": "Làng Dương Sơn & Chùa Dương Sơn (xã Nhã Nam, tỉnh Bắc Ninh)"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế nghệ nhân kể chuyện đang được Ban biên tập tiếp tục bổ sung",
    "docFile": {
      "fileName": "lang-noi-phet-duong-son.docx",
      "title": "Tài liệu văn hóa làng nói phét Dương Sơn",
      "path": "./assets/docs/lang-noi-phet-duong-son.docx",
      "size": "24 KB"
    }
  }
];

const HERITAGE_QUIZ_DATA = [
  {
    id: 1,
    question: "Ngày 16 tháng 3 năm 1884, sự kiện lịch sử trọng đại nào đã diễn ra tại đình Hả (xã Nhã Nam)?",
    options: [
      "Thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ, chính thức phát động khởi nghĩa Yên Thế",
      "Bác Hồ gửi thư khen cán bộ chiến sĩ Công an Khu XII",
      "Thực dân Pháp xây dựng xong đồn Nhã Nam trên đỉnh Đồi Phủ",
      "Thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương"
    ],
    correctAnswer: 0,
    explanation: "Đúng! Ngày 16/3/1884, tại đình Hả, thủ lĩnh Lương Văn Nắm đã làm lễ tế cờ xuất quân khởi nghĩa, mở đầu 30 năm kháng chiến Yên Thế oanh liệt."
  },
  {
    id: 2,
    question: "Sáu điều Bác Hồ dạy Công an nhân dân được phát tích tại ngôi chùa nào ở xã Nhã Nam vào ngày 11/3/1948?",
    options: [
      "Chùa Nam Thiên (chùa Phố)",
      "Chùa Tứ Giáp (Đại Phúc tự)",
      "Chùa Đồng Điều",
      "Chùa Hả (Thanh Âm Tự)"
    ],
    correctAnswer: 1,
    explanation: "Chính xác! Tại chùa Tứ Giáp (trụ sở Công an Khu XII), bức thư lịch sử của Chủ tịch Hồ Chí Minh đã ra đời ngày 11/3/1948."
  },
  {
    id: 3,
    question: "Chi bộ Đảng Cộng sản Việt Nam đầu tiên của địa phương trước đây được thành lập tại thôn nào thuộc xã Nhã Nam?",
    options: [
      "Thôn Tiến Phan 1",
      "Thôn Cầu Thượng",
      "Thôn Đồng Điều",
      "Thôn Chùa Nguộn"
    ],
    correctAnswer: 2,
    explanation: "Chính xác! Thôn Đồng Điều (chùa Đồng Điều) là cái nôi cách mạng, nơi thành lập chi bộ Đảng đầu tiên của địa phương."
  },
  {
    id: 4,
    question: "Vị tướng tài ba nào của nghĩa quân Yên Thế nổi tiếng với tài bắn cung nỏ 'bách phát bách trúng' và có đền thờ tại thôn Tiến Phan 1?",
    options: [
      "Tướng quân Đề Truật (Dương Văn Truật)",
      "Tướng quân Đề Hậu",
      "Tướng quân Cả Trọng",
      "Tướng quân Ba Biều"
    ],
    correctAnswer: 0,
    explanation: "Chính xác! Đề Truật (Dương Văn Truật) là vị tướng tài ba với tài bắn cung nỏ tuyệt luân, được nhân dân tôn kính lập đền thờ tại xã Nhã Nam."
  },
  {
    id: 5,
    question: "Địa điểm đồn Nhã Nam và đồi Phủ gắn liền với dấu tích gì của quân đội viễn chinh Pháp thời bấy giờ?",
    options: [
      "Đại bản doanh chỉ huy của thực dân Pháp và khu nghĩa địa Pháp",
      "Trụ sở đàm phán hòa hoãn lần thứ hai giữa Đề Thám và Pháp",
      "Xưởng chế tạo vũ khí nổ bí mật của nghĩa quân",
      "Kho dự trữ muối ăn của quân đội triều đình"
    ],
    correctAnswer: 0,
    explanation: "Chính xác! Đồn Nhã Nam trên đồi Phủ từng là trung tâm chỉ huy quân sự khét tiếng của Pháp tại Yên Thế từ năm 1885."
  }
];

// Alias để tương thích cả hai tên biến QUIZ_DATA và HERITAGE_QUIZ_DATA
const QUIZ_DATA = HERITAGE_QUIZ_DATA;

/**
 * --------------------------------------------------------------------
 * DANH SÁCH TỪ KHÓA TÌM KIẾM NHANH (QUICK SEARCH TAGS)
 * --------------------------------------------------------------------
 */
const QUICK_SEARCH_TAGS = [
  "Đình - chùa Hả",
  "Chùa Tứ Giáp",
  "Đình Dương Lâm",
  "Thôn Đồng Điều",
  "Đền Gốc Khế",
  "Đồi Phủ Nhã Nam",
  "Đình làng Chuông",
  "Chùa Nam Thiên",
  "Đền Đề Truật",
  "Làng nói phét Dương Sơn",
  "Đề Nắm",
  "Lương Văn Nắm",
  "Khởi nghĩa Yên Thế",
  "Hoàng Hoa Thám",
  "Sáu điều Bác Hồ dạy",
  "Hát chèo",
  "Bánh khảo",
  "Kẹo lạc",
  "Võ cổ truyền"
];
