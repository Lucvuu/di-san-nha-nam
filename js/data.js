/**
 * ====================================================================
 * DI SẢN VĂN HÓA XÃ NHÃ NAM – DỮ LIỆU CẤU HÌNH & HỆ THỐNG DI SẢN
 * Xã Nhã Nam, thành phố Bắc Ninh, Việt Nam
 * Dự án nghiên cứu khoa học của học sinh THPT
 * Cập nhật chuẩn hóa theo hồ sơ xếp hạng di tích và danh mục kiểm kê của UBND tỉnh Bắc Ninh
 * ====================================================================
 */

const SITE_CONFIG = {
  portalName: "Di sản văn hóa xã Nhã Nam",
  portalSubtitle: "Cổng thông tin số hóa di sản văn hóa và lịch sử địa phương",
  commune: "Xã Nhã Nam",
  city: "thành phố Bắc Ninh",
  province: "Thành phố Bắc Ninh",
  // Thống kê chính thức hệ thống di tích lịch sử – văn hóa theo hồ sơ xếp hạng và UBND tỉnh phê duyệt
  officialRelicsStats: {
    total: 37,
    specialNational: 8,
    national: 1,
    provincial: 7,
    inventoried: 21,
    intangible: 5
  },

  // Cấu hình bộ đếm lượt truy cập (Visitor Counter: Số khởi điểm ban đầu + Lượt truy cập thật)
  visitorCounter: {
    enabled: true,
    baseCount: 6241, // Đến 02/11/2026: 6.241 + 153 lượt API = 6.394
    namespace: "di-san-nha-nam-thpt-bac-ninh",
    endpoint: "https://countapi.mileshilliard.com/api/v1"
  },
  
  // Facebook Group Community Configuration
  facebookGroupUrl: "https://www.facebook.com/chungemlamtheoloiBac", 
  facebookGroupStatusNote: "Trang Facebook “Sáu Điều Bác Hồ Dạy CAND – Theo Dấu Chân Bác Hồ”"
};

/**
 * --------------------------------------------------------------------
 * DANH SÁCH BÀI HÁT TRÊN THANH ĐIỀU HƯỚNG (HEADER AUDIO PLAYLIST)
 * --------------------------------------------------------------------
 */

/**
 * ====================================================================
 * DANH MỤC TOÀN BỘ 37 DI TÍCH LỊCH SỬ – VĂN HÓA TRÊN ĐỊA BÀN XÃ NHÃ NAM
 * Trích xuất chuẩn xác 100% từ hồ sơ xếp hạng di tích và danh mục kiểm kê của UBND tỉnh phê duyệt:
 * – 08 di tích quốc gia đặc biệt (khởi nghĩa Yên Thế)
 * – 01 di tích cấp quốc gia (chùa Tứ Giáp)
 * – 07 di tích cấp tỉnh
 * – 21 di tích trong danh mục kiểm kê di tích đã được Chủ tịch UBND tỉnh phê duyệt
 * ====================================================================
 */
const OFFICIAL_COMMUNE_RELICS = {
  totalCount: 37,
  documentRef: "Khái quát hệ thống di tích trên địa bàn – Tổng hợp theo hồ sơ xếp hạng di tích (đến ngày 15/02/2026) và danh mục kiểm kê của UBND tỉnh Bắc Ninh",
  summary: "Hiện nay, trên địa bàn xã có tổng số 37 di tích lịch sử – văn hóa, gồm 08 di tích quốc gia đặc biệt, 01 di tích cấp quốc gia, 07 di tích cấp tỉnh và 21 di tích trong danh mục kiểm kê được Chủ tịch UBND tỉnh phê duyệt bảo vệ.",
  groups: [
    {
      id: "quoc-gia-dac-biet",
      name: "Di tích quốc gia đặc biệt",
      subName: "Cụm di tích Những địa điểm khởi nghĩa Yên Thế",
      count: 8,
      badgeText: "08 Di tích quốc gia đặc biệt",
      badgeClass: "bg-[#8B1E1E] text-white",
      icon: "landmark",
      description: "08 di tích thuộc di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế theo Quyết định số 548/QĐ-TTg của Thủ tướng Chính phủ.",
      items: [
        { name: "Đình Dương Lâm", type: "Đình làng cổ khởi dựng đầu thế kỷ XIX", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-11" },
        { name: "Đình – chùa Hả", type: "Khu di tích đình – chùa Hả (nơi Đề Nắm tế cờ phát động khởi nghĩa 1884)", status: "Di tích quốc gia đặc biệt", featuredId: "vat-the-1" },
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
      subName: "Di tích lịch sử – kiến trúc nghệ thuật",
      count: 1,
      badgeText: "01 Di tích cấp quốc gia",
      badgeClass: "bg-[#8B6914] text-white",
      icon: "star",
      description: "Di tích lịch sử – kiến trúc nghệ thuật cấp quốc gia được Bộ Văn hóa, Thể thao và Du lịch xếp hạng.",
      items: [
        { name: "Chùa Tứ Giáp", type: "Nơi phát tích thiêng liêng ra đời Sáu điều Bác Hồ dạy Công an nhân dân (11/3/1948)", status: "Di tích cấp quốc gia", featuredId: "vat-the-2" }
      ]
    },
    {
      id: "cap-tinh",
      name: "Di tích cấp tỉnh",
      subName: "Di tích lịch sử – văn hóa cấp tỉnh",
      count: 7,
      badgeText: "07 Di tích cấp tỉnh",
      badgeClass: "bg-amber-800 text-white",
      icon: "award",
      description: "07 di tích lịch sử – văn hóa được Chủ tịch UBND tỉnh ban hành Quyết định xếp hạng di tích cấp tỉnh.",
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
      badgeText: "21 Di tích trong danh mục kiểm kê",
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
    subtitle: "Khu di tích đình – chùa Hả → chùa Tứ Giáp → đình Dương Lâm",
    themeColor: "#8B1E1E",
    badgeBg: "bg-[#8B1E1E]",
    relicIds: ["vat-the-1", "vat-the-2", "vat-the-11"],
    relics: [
      { id: "vat-the-1", name: "Đình – chùa Hả", note: "Nơi Đề Nắm tế cờ phát động khởi nghĩa Yên Thế (1884)", q: "Đình+Hả,+Tân+Trung,+Tân+Yên,+Bắc+Giang" },
      { id: "vat-the-2", name: "Chùa Tứ Giáp", note: "Nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân (1948)", q: "21.4448892,106.0901463" },
      { id: "vat-the-11", name: "Đình Dương Lâm", note: "Di tích quốc gia đặc biệt thời Lê – căn cứ kháng chiến", q: "21.4210834,106.0960966" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?saddr=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&daddr=21.4448892,106.0901463+to:21.4210834,106.0960966&output=embed",
    startDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang",
    startDirectionsText: "Khởi hành từ vị trí của bạn (tới đình – chùa Hả)",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4210834,106.0960966&waypoints=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang%7C21.4448892,106.0901463",
    directionsText: "Lộ trình liên hoàn cả tuyến (đình Hả → chùa Tứ Giáp → đình Dương Lâm)",
    description: "Đình Hả, nơi Đề Nắm tế cờ năm 1884; chùa Tứ Giáp, trụ sở Công an Khu XII năm 1948; đình Dương Lâm, nơi cụ Cai Hậu đào hầm cho nghĩa quân."
  },
  {
    id: "tuyen-2",
    number: "2",
    name: "Tuyến 2",
    title: "Mốc son cách mạng và văn hóa",
    subtitle: "Chùa Đồng Điều → đền Đề Truật → chùa Dương Sơn",
    themeColor: "#C59B27",
    badgeBg: "bg-[#C59B27]",
    relicIds: ["vat-the-3", "vat-the-8", "vat-the-15"],
    relics: [
      { id: "vat-the-3", name: "Chùa Đồng Điều", note: "Cái nôi thành lập chi bộ Đảng Cộng sản đầu tiên", q: "21.455246,106.094589" },
      { id: "vat-the-8", name: "Đền Đề Truật", note: "Đền thờ tướng quân Dương Văn Truật (Đề Truật)", q: "21.4525861,106.0980009" },
      { id: "vat-the-15", name: "Chùa Dương Sơn", note: "Di tích cấp tỉnh – văn hóa cổ truyền làng Dương Sơn", q: "21.408497,106.1126369" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?saddr=21.455246,106.094589&daddr=21.4525861,106.0980009+to:21.408497,106.1126369&output=embed",
    startDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.455246,106.094589",
    startDirectionsText: "Khởi hành từ vị trí của bạn (tới chùa Đồng Điều)",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.408497,106.1126369&waypoints=21.455246,106.094589%7C21.4525861,106.0980009",
    directionsText: "Lộ trình liên hoàn cả tuyến (chùa Đồng Điều → đền Đề Truật → chùa Dương Sơn)",
    description: "Thôn Đồng Điều, nơi lập chi bộ Đảng đầu tiên của địa phương; đền thờ tướng Đề Truật; chùa làng Dương Sơn."
  },
  {
    id: "tuyen-3",
    number: "3",
    name: "Tuyến 3",
    title: "Chiến tích oai hùng và tín ngưỡng cổ truyền",
    subtitle: "Đền Gốc Khế → đồi Phủ → đình làng Chuông → chùa Nam Thiên → đình Cầu Thượng",
    themeColor: "#166534",
    badgeBg: "bg-[#166534]",
    relicIds: ["vat-the-4", "vat-the-5", "vat-the-6", "vat-the-7", "vat-the-12"],
    relics: [
      { id: "vat-the-4", name: "Đền Gốc Khế", note: "Căn cứ rừng Gốc Khế nghĩa quân Yên Thế", q: "21.4443835,106.0966726" },
      { id: "vat-the-5", name: "Đồi Phủ (đồn Nhã Nam)", note: "Ao ông Chấn Ký, di tích oanh liệt thời Pháp", q: "21.4444805,106.0971055" },
      { id: "vat-the-6", name: "Đình làng Chuông", note: "Đình cổ thế kỷ XVIII trung tâm Nhã Nam", q: "21.4443874,106.0991677" },
      { id: "vat-the-7", name: "Chùa Nam Thiên", note: "Chùa Phố khởi dựng năm 1822", q: "21.4442158,106.0973672" },
      { id: "vat-the-12", name: "Đình Cầu Thượng", note: "Di tích cấp tỉnh thờ Cao Sơn, Quý Minh", q: "21.4397723,106.0893274" }
    ],
    mapEmbedUrl: "https://www.google.com/maps?saddr=21.4443835,106.0966726&daddr=21.4444805,106.0971055+to:21.4443874,106.0991677+to:21.4442158,106.0973672+to:21.4397723,106.0893274&output=embed",
    startDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4443835,106.0966726",
    startDirectionsText: "Khởi hành từ vị trí của bạn (tới đền Gốc Khế)",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4397723,106.0893274&waypoints=21.4443835,106.0966726%7C21.4444805,106.0971055%7C21.4443874,106.0991677%7C21.4442158,106.0973672",
    directionsText: "Lộ trình liên hoàn cả tuyến (đền Gốc Khế → đồi Phủ → đình Chuông → chùa Nam Thiên → đình Cầu Thượng)",
    description: "Các điểm quanh đồn Nhã Nam cũ: rừng Gốc Khế, đồi Phủ, đình Chuông nơi Đề Thám họp bàn, chùa Nam Thiên (1822) và đình Cầu Thượng."
  }
];

const DEFAULT_COMMUNE_MAP = {
  embedUrl: "https://www.google.com/maps?q=21.4404,106.0965&z=14&output=embed",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=21.4404,106.0965",
  directionsText: "Chỉ đường từ vị trí của bạn đến trung tâm xã Nhã Nam (UBND xã Nhã Nam)"
};

const MUSIC_PLAYLIST = [
  {
    id: "nha-nam-trong-toi",
    title: "Nhã Nam trong tôi",
    artist: "Ca khúc truyền thống quê hương",
    src: "./assets/audio/nha-nam-trong-toi.mp3"
  }
];

/**
 * --------------------------------------------------------------------
 * DANH MỤC DI SẢN VẬT THỂ (TANGIBLE HERITAGE DATA – 8 DI TÍCH TIÊU BIỂU)
 * Hiển thị chính xác 5 mục bắt buộc:
 * 1. Tên di tích
 * 2. Địa chỉ (xã Nhã Nam, thành phố Bắc Ninh)
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
    "title": "Khu di tích đình – chùa Hả",
    "shortTitle": "Đình – chùa Hả",
    "address": "Thôn Hả, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
    "thumbnail": "./assets/images/dinh-chua-ha/anh-dai-dien.jpg",
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-dinh-chua-ha.mp3",
      "title": "Thuyết minh di tích đình – chùa Hả"
    },
    "video": {
      "title": "Video tư liệu: Diễn tích Lương Văn Nắm (Đề Nắm) tế cờ khởi nghĩa Yên Thế tại đình Hả (từ phút 05:54)",
      "youtubeId": "13WbD3DOeQc",
      "youtubeUrl": "https://www.youtube.com/watch?v=13WbD3DOeQc&t=354s",
      "embedUrl": "https://www.youtube.com/embed/13WbD3DOeQc?start=354",
      "startTime": 354,
      "description": "Diễn tích hào hùng tái hiện khoảnh khắc ngày 16/3/1884 khi thủ lĩnh Đề Nắm tế cờ phát động cuộc khởi nghĩa Yên Thế oanh liệt (bắt đầu từ 05:54)."
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
      "thành phố Bắc Ninh"
    ],
    "overview": "Sân đình Hả là nơi Lương Văn Nắm (Đề Nắm) cùng nghĩa sĩ tế cờ ngày 16/3/1884, mở đầu khởi nghĩa Yên Thế. Đình thờ Cao Sơn, Quý Minh và Đề Nắm.",
    "content": {
      "intro": "Đình Hả và chùa Hả (tên chữ Thanh Âm tự) đứng liền nhau ở thôn Hả, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang). Ngày 16/3/1884, tại sân đình, thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ, mở đầu khởi nghĩa Yên Thế. Khu di tích thuộc cụm Những địa điểm Khởi nghĩa Yên Thế, xếp hạng quốc gia đặc biệt năm 2012.",
      "historicalSignificance": [
        "**Nơi tế cờ phát động khởi nghĩa Yên Thế (16/3/1884):** Ngày 16 tháng 3 năm 1884 (năm Giáp Thân), tại sân đình Hả, thủ lĩnh Lương Văn Nắm (tức Đề Nắm) cùng các nghĩa sĩ ưu tú đã làm lễ tế cờ, cắt máu ăn thề, chính thức dựng cờ khởi nghĩa Yên Thế, mở đầu bản anh hùng ca kháng Pháp trường kỳ gần 30 năm (1884 – 1913).",
        "**Đại bản doanh buổi đầu của nghĩa quân:** Đình Hả là trung tâm hội tụ nhân tài, vũ khí, lương thảo và bàn thảo các kế sách quân sự đánh bại nhiều đợt hành quân càn quét ác liệt của đạo quân viễn chinh Pháp.",
        "**Xếp hạng di tích quốc gia đặc biệt:** Được xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ trong cụm Những địa điểm Khởi nghĩa Yên Thế.",
        "**Công tác bảo tồn:** Giai đoạn 2023 – 2024, di tích đã được đầu tư tu bổ, tôn tạo quy mô lớn với kinh phí gần 8,5 tỷ đồng từ ngân sách nhà nước và nhân dân đóng góp, giữ vững nét cổ kính uy nghiêm."
      ],
      "architecture": [
        "Đình Hả thờ Thành hoàng làng Cao Sơn – Quý Minh đại vương và thủ lĩnh Lương Văn Nắm.",
        "Kiến trúc đình hình chữ Đinh (丁) truyền thống, gồm 5 gian Tiền tế và 2 gian Hậu cung vững chãi.",
        "Bộ khung gỗ lim cổ thụ vững chãi, các vì kèo kết cấu chồng rường giá chiêng với những mảng chạm khắc rồng, lân, hoa cúc dây sinh động mang đậm phong cách nghệ thuật thời Nguyễn.",
        "Chùa Hả (tên chữ 'Thanh Âm Tự') nằm liền kề bên đình, rợp bóng cây cổ thụ, lưu giữ hệ thống tượng Phật cổ sơn son thếp vàng, chuông đồng và các văn bia ghi lại quá trình trùng tu từ thời Lê – Nguyễn."
      ],
      "studyNote": "Đối với thế hệ trẻ và học sinh THPT: Đình – chùa Hả là cội nguồn của tinh thần quật cường Yên Thế, là bài học đầu tiên về lòng yêu nước nồng nàn và ý chí bất khuất trước quân thù."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang",
      "locationName": "Khu di tích đình – chùa Hả (di tích quốc gia đặc biệt)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-chua-ha/anh-dai-dien.jpg",
        "caption": "Đình Hả – Nơi thủ lĩnh Lương Văn Nắm làm lễ tế cờ khởi nghĩa ngày 16/3/1884"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dien-tich-de-nam-te-co.jpg",
        "caption": "Hình ảnh tái hiện diễn tích Lương Văn Nắm (Đề Nắm) tế cờ khởi nghĩa tại sân đình Hả"
      },
      {
        "url": "./assets/images/dinh-chua-ha/thu-linh-de-nam.jpg",
        "caption": "Hình tượng thủ lĩnh Lương Văn Nắm (Đề Nắm) – Linh hồn khởi nghĩa Yên Thế giai đoạn đầu (1884 – 1892)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-1.jpg",
        "caption": "Đình Hả – Góc nghiêng mái ngói cổ kính và đầu đao cong vút"
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
        "caption": "Khuôn viên di tích đình – chùa Hả rợp bóng cây xanh mát"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dinh-ha-5.jpg",
        "caption": "Quần thể di tích quốc gia đặc biệt đình – chùa Hả tại xã Nhã Nam"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-tam-bao.jpg",
        "caption": "Chùa Hả (Thanh Âm tự) – Mặt tiền tòa Tam Bảo cổ kính rợp bóng cây xanh và đèn lồng hoa sen (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-den-tho-mau-1.jpg",
        "caption": "Đền thờ Mẫu trong khuôn viên chùa Hả với kiến trúc 3 gian cửa bức bàn gỗ và đôi trụ biểu câu đối chữ Hán (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-den-tho-mau-2.jpg",
        "caption": "Góc nhìn chính diện tòa Đền thờ Mẫu thuộc cụm di tích đình – chùa Hả (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-nghi-mon.jpg",
        "caption": "Nghi môn tứ trụ uy nghiêm với câu đối chữ Hán dẫn vào sân gạch Bát Tràng và tòa đại bái (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-dai-bai-1.jpg",
        "caption": "Tòa đại bái 5 gian gỗ lim với mái ngói mũi hài lưỡng long chầu nguyệt và bậc tam cấp đá xanh chạm rồng (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-dai-bai-2.jpg",
        "caption": "Không gian kiến trúc cổ kính, trang nghiêm tại cụm di tích đình – chùa Hả (Ảnh tư liệu: UBND xã Nhã Nam)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/chua-ha-khuon-vien-1.jpg",
        "caption": "Sân gạch truyền thống và kiến trúc cổ dưới bóng cờ Tổ quốc trong cụm di tích (Ảnh tư liệu: UBND xã Nhã Nam)"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 15 ảnh tư liệu thực tế tại cụm di tích đình – chùa Hả (Thanh Âm tự), Đền thờ Mẫu và diễn tích Đề Nắm tế cờ (do UBND xã Nhã Nam và Ban biên tập cung cấp)",
    "docFile": {
      "fileName": "dinh-chua-ha.docx",
      "title": "Hồ sơ di tích đình – chùa Hả",
      "path": "./assets/docs/dinh-chua-ha.docx",
      "size": "14 KB"
    },
    "relatedDocFiles": [
      {
        "fileName": "kich-ban-dien-tich-de-nam-te-co.docx",
        "title": "Kịch bản Lễ tế cờ hội đình Hả (diễn tích Đề Nắm)",
        "path": "./assets/docs/kich-ban-dien-tich-de-nam-te-co.docx",
        "size": "23 KB"
      }
    ]
  },
  {
    "id": "vat-the-2",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "quoc-gia",
    "rankName": "Di tích cấp quốc gia",
    "badge": "Di tích cấp quốc gia",
    "relicType": "Di tích lịch sử và nghệ thuật",
    "decision": "QĐ số 138/QĐ, ngày 31/01/1992 của Bộ Văn hóa – Thông tin",
    "worship": "Thờ Phật",
    "title": "Chùa Tứ Giáp",
    "shortTitle": "Chùa Tứ Giáp (Đại Phúc tự)",
    "address": "Thôn Chùa Nguộn, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Tổ dân phố Chùa Nguộn, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "thumbnail": "./assets/images/chua-tu-giap/anh-dai-dien.jpg",
    "tags": [
      "Chùa Tứ Giáp",
      "Khu lưu niệm 6 điều Bác Hồ dạy CAND",
      "Khu lưu niệm Sáu điều Bác Hồ dạy CAND",
      "Khu lưu niệm Công an nhân dân",
      "Sáu điều Bác Hồ dạy",
      "Công an nhân dân",
      "Đại Phúc tự",
      "Làng Nguộn",
      "Yên Thế",
      "Xã Nhã Nam",
      "thành phố Bắc Ninh"
    ],
    "audioFile": {
      "src": "./assets/audio/thuyet-minh-khu-luu-niem-6-dieu-bac-ho-day-cand.mp3",
      "title": "Thuyết minh khu lưu niệm Sáu điều Bác Hồ dạy Công an nhân dân"
    },
    "audioTracks": [
      {
        "id": "cand",
        "title": "Khu lưu niệm Sáu điều Bác Hồ dạy CAND",
        "subtitle": "Bản thu âm chuyên đề mới nhất",
        "src": "./assets/audio/thuyet-minh-khu-luu-niem-6-dieu-bac-ho-day-cand.mp3",
        "duration": "3:05",
        "isPrimary": true
      },
      {
        "id": "tu-giap",
        "title": "Di tích lịch sử chùa Tứ Giáp (Đại Phúc tự)",
        "subtitle": "Bản thu âm giới thiệu chùa Tứ Giáp",
        "src": "./assets/audio/thuyet-minh-chua-tu-giap.mp3",
        "duration": "0:51",
        "isPrimary": false
      }
    ],
    "overview": "Ngôi chùa cổ dựng khoảng 1771–1773 (còn gọi chùa Đại Phúc, chùa Gốc Gạo), nơi đặt trụ sở Sở Công an Khu XII (1946–1948) đón nhận bức thư Sáu điều Bác Hồ dạy CAND ngày 11/3/1948; liền kề Khu lưu niệm rộng hơn 3,3 ha.",
    "content": {
      "intro": "Chùa Tứ Giáp (tên chữ Đại Phúc tự, dân gian gọi là chùa làng Nguộn hay chùa Gốc Gạo) tọa lạc tại thôn Chùa Nguộn, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc tổ dân phố Chùa Nguộn, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ngôi chùa được khởi dựng khoảng năm 1771–1773 thời Lê Cảnh Hưng, xếp hạng Di tích lịch sử – văn hóa cấp Quốc gia năm 1992. Giai đoạn 1946–1948, nơi đây là trụ sở Sở Công an Khu XII và là nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân (11/3/1948).",
      "historicalSignificance": [
        "**Trụ sở Sở Công an Khu XII và đồng chí Hoàng Mai (1922–2004):** Tháng 11/1946, cả nước chia thành 12 khu hành chính – quân sự (Khu 12 gồm Cao Bằng, Lạng Sơn, Bắc Giang, Bắc Ninh và Quảng Ninh). Sở Công an Khu 12 đặt trụ sở tại chùa Tứ Giáp (Nhã Nam), do đồng chí Hoàng Mai làm Giám đốc khi mới 26 tuổi.",
        "**Bức thư lịch sử ngày 11/3/1948:** Đầu năm 1948, sau Hội nghị Công an toàn quốc lần thứ 2 tại Tuyên Quang, đồng chí Hoàng Mai viết thư xin Bác góp ý về rèn luyện đạo đức, tác phong nghiệp vụ và gửi biếu Người tờ báo 'Bạn Dân' – cơ quan tuyên truyền của Sở. Ngày 11/3/1948, Chủ tịch Hồ Chí Minh gửi thư hồi âm căn dặn: 'Công an của ta là Công an nhân dân, vì dân mà phục vụ và dựa vào dân mà làm việc', đồng thời nêu Sáu điều về 'Tư cách người Công an cách mệnh'.",
        "**Chứng tích kháng chiến và cây gạo 'Luân hồi':** Năm 1947, chùa Tứ Giáp từng bị thực dân Pháp bắn phá ác liệt; đến nay trên các cột gỗ lim sẫm màu thời gian vẫn còn lưu dấu đạn. Trước sân chùa, gốc cây gạo cổ thụ trồng từ khi dựng chùa đã hóa mục nhưng từ chính gốc ấy lại vươn lên cây gạo con xanh tốt – được gọi là cây gạo 'Luân hồi', ẩn dụ cho sức sống và tinh thần cách mạng bất diệt.",
        "**Xếp hạng di tích và điểm đến giáo dục truyền thống:** Chùa Tứ Giáp được xếp hạng Di tích cấp Quốc gia theo Quyết định số 138/QĐ ngày 31/01/1992. Hằng năm, quần thể di tích và Khu lưu niệm đón từ 8.000 đến 16.000 lượt cán bộ, chiến sĩ, học sinh và nhân dân về sinh hoạt chính trị, học tập truyền thống."
      ],
      "architecture": [
        "**Chùa cổ Tứ Giáp (Đại Phúc tự):** Kiến trúc truyền thống kiểu tiền chữ Nhất (-), hậu chữ Đinh (丁) vững chãi, khung cột gỗ lim còn lưu dấu đạn năm 1947, lưu giữ bia đá niên hiệu Cảnh Hưng (1771), chuông đồng thế kỷ XIX và hệ thống tượng Phật cổ.",
        "**Khu lưu niệm Sáu điều Bác Hồ dạy CAND (rộng hơn 3,3 ha):** Khởi công ngày 15/8/2017 và khánh thành ngày 11/3/2018 (kỷ niệm 70 năm Bác Hồ có Sáu điều dạy CAND) từ nguồn xã hội hóa hơn 100 tỷ đồng do cán bộ, chiến sĩ toàn lực lượng đóng góp.",
        "**Tượng đài Bác Hồ và bức phù điêu Việt Bắc:** Điểm nhấn trung tâm là bức tượng Chủ tịch Hồ Chí Minh bằng đồng cao 7m (Bác mặc bộ kaki đơn sơ, đi dép cao su, tay cầm tờ báo bên chiếc máy đánh chữ, nhìn về hướng Đông). Phía sau là bức phù điêu đá xanh cao 13,5m, dài 52m tạo hình dãy núi Việt Bắc, chạm khắc hình ảnh các thế hệ CAND; khuôn viên trồng 79 cây sao đen (79 mùa xuân của Bác) và 54 cây tùng tháp (54 dân tộc anh em).",
        "**Nhà truyền thống trưng bày 3 chuyên đề:** (1) Công an Khu 12 – nơi đón nhận 6 điều Bác dạy; (2) Phong trào học tập, làm theo lời Bác; (3) Hình ảnh Bác với CAND. Nơi đây lưu giữ nhiều kỷ vật vô giá của đồng chí Hoàng Mai: lễ phục cấp tướng, sắc phong, thẻ nhà báo, bản tự khai viết tay cùng những chiếc chum đựng gạo, muối, nước từng dùng trong thời hoạt động bí mật."
      ],
      "studyNote": "Đối với học sinh THPT: Chùa Tứ Giáp và Khu lưu niệm Sáu điều Bác Hồ dạy CAND là 'địa chỉ đỏ' giáo dục sâu sắc về đạo đức chí công vô tư, tinh thần 'vì nước quên thân, vì dân phục vụ' và truyền thống cách mạng kiên cường của quê hương Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4448892,106.0901463&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4448892,106.0901463",
      "locationName": "Chùa Tứ Giáp & Khu lưu niệm Sáu điều Bác Hồ dạy CAND"
    },
    "gallery": [
      {
        "url": "./assets/images/chua-tu-giap/anh-dai-dien.jpg",
        "caption": "Chùa Tứ Giáp (Đại Phúc tự) – Nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân"
      },
      {
        "url": "./assets/images/chua-tu-giap/khu-luu-niem-toan-canh.jpg",
        "caption": "Toàn cảnh Khu lưu niệm Sáu điều Bác Hồ dạy Công an nhân dân rộng hơn 3,3 ha tại thôn Chùa Nguộn, xã Nhã Nam (Tư liệu: Báo Pháp luật Việt Nam)"
      },
      {
        "url": "./assets/images/chua-tu-giap/tuong-bac-7m.jpg",
        "caption": "Tượng Chủ tịch Hồ Chí Minh bằng đồng cao 7m cùng bức phù điêu đá xanh cao 13,5m, dài 52m tạo hình dãy núi Việt Bắc tại Khu lưu niệm"
      },
      {
        "url": "./assets/images/chua-tu-giap/nha-truyen-thong-cand.jpg",
        "caption": "Nhà truyền thống trong Khu lưu niệm – nơi trưng bày kỷ vật của Công an Khu XII và đồng chí Hoàng Mai"
      },
      {
        "url": "./assets/images/chua-tu-giap/chua-tu-giap-toan-canh.jpg",
        "caption": "Toàn cảnh kiến trúc chùa Tứ Giáp (chùa Đại Phúc / chùa Gốc Gạo) nhìn từ trên cao"
      },
      {
        "url": "./assets/images/chua-tu-giap/chua-tu-giap-tam-bao.jpg",
        "caption": "Mặt tiền tòa Tam bảo chùa Tứ Giáp (Đại Phúc tự) cổ kính tại xã Nhã Nam"
      },
      {
        "url": "./assets/images/chua-tu-giap/tu-giap-2.jpg",
        "caption": "Không gian khuôn viên và kiến trúc tiền tế chùa Tứ Giáp tại thôn Chùa Nguộn"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 07 ảnh tư liệu thực tế tại chùa Tứ Giáp và Khu lưu niệm Sáu điều Bác Hồ dạy CAND",
    "docFile": {
      "fileName": "chua-tu-giap.docx",
      "title": "Hồ sơ di tích chùa Tứ Giáp",
      "path": "./assets/docs/chua-tu-giap.docx",
      "size": "14 KB"
    }
  },
  {
    "id": "vat-the-3",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 2087/QĐ-UBND, ngày 25/12/2006 của Chủ tịch UBND tỉnh",
    "worship": "Thờ Phật",
    "title": "Chùa Đồng Điều (di tích lịch sử thôn Đồng Điều)",
    "shortTitle": "Chùa Đồng Điều",
    "address": "Thôn Đồng Điều, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
    "thumbnail": "./assets/images/chua-dong-dieu/anh-dai-dien.jpg",
    "tags": [
      "Thôn Đồng Điều",
      "Chùa Đồng Điều",
      "chi bộ Đảng đầu tiên",
      "Lịch sử cách mạng",
      "thành phố Bắc Ninh",
      "Xã Nhã Nam"
    ],
    "overview": "Trước năm 1945, thôn Đồng Điều là cơ sở bí mật, nơi thành lập chi bộ Đảng đầu tiên của địa phương. Di tích xếp hạng cấp tỉnh năm 2006.",
    "content": {
      "intro": "Thôn Đồng Điều, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang) là nơi thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương, trước Cách mạng Tháng Tám năm 1945. Chùa Đồng Điều là trung tâm khu di tích, được xếp hạng cấp tỉnh theo Quyết định số 2087/QĐ-UBND ngày 25/12/2006.",
      "historicalSignificance": [
        "**Nơi thành lập chi bộ Đảng đầu tiên:** Trước Cách mạng Tháng Tám năm 1945, thôn Đồng Điều là cơ sở cách mạng bí mật an toàn. Tại đây, những người con ưu tú của quê hương đã được giác ngộ lý tưởng cộng sản, thành lập chi bộ Đảng đầu tiên, trực tiếp lãnh đạo quần chúng nhân dân vùng lên giành chính quyền.",
        "**Căn cứ nuôi giấu cán bộ xứ ủy Bắc Kỳ:** Nhiều cán bộ cao cấp của Đảng và các đội tuyên truyền cứu quốc quân đã dừng chân, hoạt động bí mật tại Đồng Điều nhờ sự đùm bọc, chở che kiên trung của đồng bào và bà con giáo dân nơi đây.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 2087/QĐ-UBND ngày 25/12/2006."
      ],
      "architecture": [
        "Chùa Đồng Điều mang nét kiến trúc tâm linh thôn dã truyền thống vùng đồng bằng trung du Bắc Bộ.",
        "Khung nhà bằng gỗ mộc mạc, mái ngói cổ rêu phong, kết cấu vững chắc hài hòa cùng cảnh quan làng xóm trù phú.",
        "Nơi đây lưu giữ nhiều hiện vật quý, bia ghi công tích cách mạng và các chứng tích lịch sử của phong trào kháng chiến chống thực dân Pháp."
      ],
      "studyNote": "Đối với học sinh: Di tích thôn Đồng Điều là minh chứng hùng hồn cho truyền thống kiên cường cách mạng, lòng son sắt một dạ theo Đảng của nhân dân xã Nhã Nam qua các thời kỳ kháng chiến."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.455246,106.094589&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.455246,106.094589",
      "locationName": "Di tích lịch sử thôn Đồng Điều (chùa Đồng Điều)"
    },
    "video": {
      "title": "Video tư liệu thực tế khuôn viên và kiến trúc chùa Đồng Điều – xã Nhã Nam",
      "localSrc": "./assets/videos/chua-dong-dieu/chua-dong-dieu.mp4"
    },
    "gallery": [
      {
        "url": "./assets/images/chua-dong-dieu/anh-dai-dien.jpg",
        "caption": "Mặt tiền tòa Tam bảo và nhà Tổ chùa Đồng Điều ngày nay với trụ biểu khắc chữ Hán và hệ cửa bức bàn gỗ lim (Ảnh thực tế: Ban biên tập)"
      },
      {
        "url": "./assets/images/chua-dong-dieu/dong-dieu-tu-lieu-co.jpg",
        "caption": "Ảnh tư liệu lịch sử ngôi chùa Đồng Điều cổ trước khi trùng tu – nơi thành lập chi bộ Đảng đầu tiên của địa phương trước Cách mạng Tháng Tám 1945"
      },
      {
        "url": "./assets/images/chua-dong-dieu/dong-dieu-2.jpg",
        "caption": "Toàn cảnh chùa Đồng Điều uy nghiêm, thanh bình giữa vùng đồi trung du thôn Đồng Điều, xã Nhã Nam"
      },
      {
        "url": "./assets/images/chua-dong-dieu/dong-dieu-3.jpg",
        "caption": "Nét kiến trúc mái đao cong vút và tường gạch thất mộc mạc của ngôi chùa lịch sử cách mạng"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 04 ảnh và video tư liệu thực tế tại chùa Đồng Điều (hồ sơ của Ban biên tập)",
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
    "address": "Thôn Cầu Thượng, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Tổ dân phố Cầu Thượng, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Đền thờ Mẫu và nghĩa quân Yên Thế giữa khu rừng Gốc Khế – trạm tiền tiêu ở cửa ngõ đồn Nhã Nam thời Đề Thám.",
    "content": {
      "intro": "Đền nằm trong khu rừng Gốc Khế, thôn Cầu Thượng, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc tổ dân phố Cầu Thượng, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Thời khởi nghĩa Yên Thế, khu rừng là trạm tiền tiêu ở cửa ngõ đồn Nhã Nam và phủ Yên Thế. Đền thuộc cụm Những địa điểm Khởi nghĩa Yên Thế, di tích quốc gia đặc biệt.",
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
        "caption": "Đền Gốc Khế – Căn cứ bí mật của Hoàng Hoa Thám và nghĩa quân Yên Thế"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đền Gốc Khế (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "den-goc-khe.docx",
      "title": "Thuyết minh dự án tu bổ Đền Gốc Khế",
      "path": "./assets/docs/den-goc-khe.docx",
      "size": "84 KB"
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
    "address": "Đồi Phủ, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
      "Di tích quốc gia đặc biệt",
      "Logo Nhã Nam",
      "Biểu trưng xã Nhã Nam",
      "Khát vọng vươn lên"
    ],
    "overview": "Năm 1885 quân Pháp chiếm quả đồi này, dựng đồn Nhã Nam và tòa đại lý phủ Yên Thế để đàn áp nghĩa quân; nay là biểu tượng lịch sử trung tâm trên Biểu trưng (Logo) xã Nhã Nam.",
    "content": {
      "intro": "Đồi Phủ là quả đồi khống chế ngã tư Nhã Nam, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Từ năm 1885, quân Pháp chiếm đồi, dựng đồn Nhã Nam và đặt tòa đại lý phủ Yên Thế để đàn áp nghĩa quân. Địa điểm Ao ông Chấn Ký nằm trong khu vực này. Với giá trị lịch sử tiêu biểu, đồi Phủ đã được chọn làm hình ảnh trung tâm trên Biểu trưng (Logo) xã Nhã Nam.",
      "historicalSignificance": [
        "**Đại bản doanh đàn áp của thực dân Pháp (1885):** Để đối phó với nghĩa quân của Đề Nắm và Đề Thám, thực dân Pháp đã thiết lập đồn bốt kiên cố trên đồi Phủ. Từ đây, các tướng chỉ huy Pháp đã xuất quân tấn công nhiều đồn lũy nghĩa quân nhưng liên tục chịu tổn thất nặng nề.",
        "**Địa điểm Ao ông Chấn Ký:** Địa điểm gắn liền với các trận phục kích, giao tranh dũng cảm của các nghĩa sĩ Yên Thế và phong trào cách mạng địa phương.",
        "**Xếp hạng quốc gia đặc biệt:** Xếp hạng theo Quyết định số 548/QĐ-TTg ngày 10/05/2012 của Thủ tướng Chính phủ.",
        "**Biểu tượng cội nguồn trên Biểu trưng (Logo) xã Nhã Nam:** Trong thiết kế Biểu trưng (Logo) Nhã Nam với chủ đề “Khát vọng vươn lên (Truyền thống + Hiện đại)”, ngọn đồi Phủ được chọn làm điểm tựa nền tảng ở trung tâm – tượng trưng cho tinh thần quật cường, sức sống bền bỉ của vùng đất Nhã Nam hòa quyện cùng cánh chim hạc trống đồng, tòa nhà chữ N hiện đại và cành Giáng Hương Đỏ bền vững."
      ],
      "architecture": [
        "Khu vực còn dấu tích nền móng đồn lũy, bờ thành đất đá cuội ong cổ.",
        "Hiện nay được quy hoạch tôn tạo thành công viên lịch sử rợp bóng cây xanh (trong đó cây Giáng Hương Đỏ là loài cây đặc trưng tại địa phương), phục vụ giáo dục truyền thống và sinh hoạt văn hóa của nhân dân."
      ],
      "studyNote": "Di tích là chứng tích lịch sử về ý chí bất khuất của nhân dân Yên Thế trước thực dân xâm lược, đồng thời là nguồn cảm hứng cốt lõi trong Biểu trưng (Logo) nhận diện văn hóa xã Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4444805,106.0971055&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4444805,106.0971055",
      "locationName": "Đồi Phủ Nhã Nam (đồn Nhã Nam thời Pháp)"
    },
    "gallery": [
      {
        "url": "./assets/images/doi-phu-nha-nam/anh-dai-dien.jpg",
        "caption": "Đồi Phủ Nhã Nam – Nơi thực dân Pháp lập đồn bốt và tòa đại lý phủ Yên Thế năm 1885"
      },
      {
        "url": "./assets/images/bieu-trung-nha-nam/logo-xa-nha-nam.jpg",
        "caption": "Biểu trưng (Logo) xã Nhã Nam lấy ngọn đồi Phủ làm điểm tựa lịch sử trung tâm kết hợp cùng tòa nhà chữ N, chim hạc trống đồng và cành Giáng Hương Đỏ"
      },
      {
        "url": "./assets/images/bieu-trung-nha-nam/thong-diep-thiet-ke-logo-nha-nam.jpg",
        "caption": "Thông điệp thiết kế Biểu trưng (Logo) Nhã Nam: Đồi Phủ là biểu tượng cho tinh thần quật cường, sức sống bền bỉ và khát vọng vươn lên"
      },
      {
        "url": "./assets/images/bieu-trung-nha-nam/so-do-y-tuong-logo-nha-nam.jpg",
        "caption": "Sơ đồ phát triển ý tưởng và bản vẽ kỹ thuật Biểu trưng Nhã Nam theo triết lý “Truyền thống + Hiện đại”"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đồi Phủ (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "doi-phu-nha-nam.docx",
      "title": "Tư liệu lịch sử đồi Phủ – đồn Nhã Nam",
      "path": "./assets/docs/doi-phu-nha-nam.docx",
      "size": "13 KB"
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
    "address": "Thôn Tiến Phan 2, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Đình chữ Đinh dựng thời Lê Trung Hưng, nơi Hoàng Hoa Thám nhiều lần họp bàn việc quân. Còn bát hương gốm Thổ Hà và hai đạo sắc phong thời Nguyễn.",
    "content": {
      "intro": "Đình làng Chuông, thường gọi là đình Nhã Nam, ở thôn Tiến Phan 2, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Đình dựng thời Lê Trung Hưng (thế kỷ XVIII), là đình chung của làng Chuông xưa và là nơi Hoàng Hoa Thám nhiều lần họp bàn việc quân.",
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
        "caption": "Đình làng Chuông – Ngôi đình cổ thời Hậu Lê (thế kỷ XVIII) tại thôn Tiến Phan 2"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình làng Chuông (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "dinh-lang-chuong.docx",
      "title": "Tư liệu khoa học đình làng Chuông",
      "path": "./assets/docs/dinh-lang-chuong.docx",
      "size": "20 KB"
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
    "address": "Thôn Tân Quang, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Tổ dân phố Tân Quang, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Dựng năm Nhâm Ngọ (1822) ở làng Cầu, chuyển về phố Nhã Nam năm 1885, trùng tu năm 1925. Năm 1947 chùa nuôi giấu cán bộ, cất lương thực cho bộ đội.",
    "content": {
      "intro": "Chùa Nam Thiên, tục gọi chùa Phố, ở thôn Tân Quang, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc tổ dân phố Tân Quang, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Chùa dựng năm Nhâm Ngọ (1822) đời Minh Mạng, ban đầu thuộc làng Cầu; năm 1885, khi phố Nhã Nam hình thành, chùa được chuyển về phố.",
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
        "caption": "Chùa Nam Thiên (chùa Phố) – Ngôi chùa cổ khởi dựng năm 1822 tại phố Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại chùa Nam Thiên (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "chua-nam-thien.docx",
      "title": "Tư liệu khoa học chùa Nam Thiên (chùa Phố)",
      "path": "./assets/docs/chua-nam-thien.docx",
      "size": "14 KB"
    }
  },
  {
    "id": "vat-the-8",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 1987/QĐ-UBND, ngày 12/12/2014 của Chủ tịch UBND tỉnh",
    "worship": "Tướng Đề Truật (còn gọi là Dương Văn Truật, Đề Thuật, Đề Hậu, Hội Thuật)",
    "title": "Đền Đề Truật",
    "shortTitle": "Đền Đề Truật",
    "address": "Thôn Tiến Phan 1, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Thờ Dương Văn Truật, tướng bắn nỏ của nghĩa quân Yên Thế. Tháng 3/1892, ông cùng các dũng sĩ bắt Đề Sặt, kẻ mưu hại Đề Nắm, giải về đồn Hố Chuối.",
    "content": {
      "intro": "Tướng Dương Văn Truật (Đề Truật, còn gọi Đề Thuật, Đề Hậu, Hội Thuật) được thờ tại đền ở thôn Tiến Phan 1, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Ông nổi tiếng bắn nỏ, từng chỉ huy dân binh chống giặc Cờ Đen rồi theo nghĩa quân Yên Thế chống Pháp.",
      "historicalSignificance": [
        "**Tướng quân tài ba 'Bách phát bách trúng':** Đề Truật nổi danh khắp vùng Yên Thế bởi tài nghệ bắn cung nỏ trăm phát trúng trăm. Ông có công lớn chỉ huy dân binh chống giặc Cờ Đen (1865 – 1885) và chống giặc Pháp.",
        "**Trung kiên báo thù cho thủ lĩnh Đề Nắm:** Tháng 3/1892, khi Đề Nắm bị mưu hại, Đề Truật đã cùng dũng sĩ bắt sống kẻ phản trắc Đề Sặt áp giải về đồn Hố Chuối đền tội, bảo toàn danh dự cho nghĩa quân.",
        "**Xếp hạng di tích:** Đền Đề Truật được xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 1987/QĐ-UBND ngày 12/12/2014."
      ],
      "architecture": [
        "Đền mang kiến trúc chữ Đinh truyền thống, bài trí trang nghiêm ban thờ tướng quân Đề Truật, lư hương đồng và biểu tượng cây nỏ thần kỳ.",
        "Khuôn viên có sân tế lễ râm mát, cây cổ thụ che phủ, là nơi sinh hoạt văn hóa truyền thống của nhân dân."
      ],
      "studyNote": "Tấm gương quả cảm, tài năng quân sự và lòng trung thành tuyệt đối của tướng Đề Truật là ngọn lửa truyền cảm hứng mạnh mẽ cho học sinh THPT rèn luyện tài đức."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4525861,106.0980009&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4525861,106.0980009",
      "locationName": "Đền Đề Truật (tướng quân Dương Văn Truật)"
    },
    "gallery": [
      {
        "url": "./assets/images/den-de-truat/anh-dai-dien.jpg",
        "caption": "Đền Đề Truật – Thờ tướng quân Dương Văn Truật (Đề Truật)"
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
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại đền Đề Truật (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "den-de-truat.docx",
      "title": "Tư liệu nghiên cứu đền Đề Truật",
      "path": "./assets/docs/den-de-truat.docx",
      "size": "22 KB"
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
    "address": "Khu vực đồi Phủ, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Nơi quân Pháp chôn sĩ quan, binh lính tử trận trong chiến tranh Yên Thế. Còn bia mộ quan hai BEQVET Alexisz, chết ngày 25/3/1892 khi đánh đồn Đề Dương.",
    "content": {
      "intro": "Nghĩa địa nằm cạnh đồn Nhã Nam trên đồi Phủ, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Quân Pháp chôn tại đây sĩ quan, binh lính tử trận trong các cuộc hành quân đánh nghĩa quân Yên Thế; các bia mộ còn khắc tên và cấp bậc người chết.",
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
    "photoNotice": "Ảnh tư liệu thực tế tại di tích đang được Ban biên tập cập nhật",
    "docFile": {
      "fileName": "nghia-dia-phap.docx",
      "title": "Thuyết minh đồi Phủ – nghĩa địa Pháp",
      "path": "./assets/docs/nghia-dia-phap.docx",
      "size": "13 KB"
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
    "address": "Khu vực Gốc Dẻ, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "thumbnail": "./assets/images/den-ca-trong/anh-dai-dien.jpg",
    "tags": [
      "Đền Cả Trọng",
      "Gốc Dẻ",
      "Hoàng Đức Trọng",
      "Cả Trọng",
      "Hoàng Hoa Thám",
      "Khởi nghĩa Yên Thế",
      "Di tích quốc gia đặc biệt"
    ],
    "overview": "Thờ Hoàng Đức Trọng (Cả Trọng), con trai cả của Hoàng Hoa Thám, người chỉ huy xây căn cứ đồn Hố Chuối. Dân quen gọi là đền Gốc Dẻ.",
    "content": {
      "intro": "Đền thờ Cả Trọng, tục gọi đền Gốc Dẻ, ở khu vực Gốc Dẻ, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Đền thờ Hoàng Đức Trọng (Cả Trọng), con trai cả của Hoàng Hoa Thám; thuở nhỏ ông được gửi về Dương Lâm ăn học tại nhà cụ Cai Hậu, sau chỉ huy xây dựng căn cứ đồn Hố Chuối.",
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
    "gallery": [
      {
        "url": "./assets/images/den-ca-trong/anh-dai-dien.jpg",
        "caption": "Toàn cảnh khu di tích lịch sử quốc gia đặc biệt đền thờ Cả Trọng (đền Gốc Dẻ) dưới bóng hai cây cổ thụ uy nghiêm (Ảnh thực tế: Ban biên tập)"
      },
      {
        "url": "./assets/images/den-ca-trong/ca-trong-2.jpg",
        "caption": "Cổng vào và gốc đa cổ thụ rợp bóng mát trước sân di tích đền thờ tướng quân Hoàng Đức Trọng (Cả Trọng)"
      },
      {
        "url": "./assets/images/den-ca-trong/ca-trong-3.jpg",
        "caption": "Trụ biểu khắc câu đối chữ Hán và kiến trúc truyền thống tại khu di tích Gốc Dẻ, xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại di tích đền thờ Cả Trọng (hồ sơ của Ban biên tập)",
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
    "address": "Thôn Dương Lâm, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã An Dương, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Đề Thám bàn với dân dời đình từ Bãi Đình về giữa làng; cụ Cai Hậu đào hầm bí mật từ hậu cung ra bờ ao cho nghĩa quân rút lui.",
    "content": {
      "intro": "Đình Dương Lâm đứng giữa làng Dương Lâm, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã An Dương, huyện Tân Yên, tỉnh Bắc Giang). Đình có từ thời Lê, thờ Đức thánh Cao Sơn và phối thờ ba quận công họ Dương. Vị trí hiện nay là do Hoàng Hoa Thám bàn với dân làng dời đình từ khu Bãi Đình về.",
      "historicalSignificance": [
        "**Ngôi đình cổ dời vị trí theo kế sách kháng chiến của Đề Thám:** Đình xưa vốn tọa lạc ở khu đất Bãi Đình. Do giặc giã nhiều, Hoàng Hoa Thám và nghĩa quân Yên Thế đã bàn với dân làng chuyển đình về giữa làng như hiện nay để tiện trông nom và bảo đảm hoạt động bí mật.",
        "**Căn cứ vững chắc của cụ Cai Hậu và nghĩa quân:** Cụ Cai Hậu (Dương Văn Hậu) là người giúp Hoàng Hoa Thám rất đắc lực (1885 – 1895). Cụ đã cho đào một đường hầm bí mật từ hậu cung đình Dương Lâm xuyên ra bờ ao để nghĩa quân rút lui an toàn khi bị vây hãm; dấu vết đường hầm nay vẫn còn.",
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
        "caption": "Đình Dương Lâm – di tích quốc gia đặc biệt thời Lê thuộc xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Dương Lâm (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "dinh-duong-lam.docx",
      "title": "Hồ sơ di tích đình Dương Lâm",
      "path": "./assets/docs/dinh-duong-lam.docx",
      "size": "19 KB"
    }
  },
  {
    "id": "vat-the-12",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 10/QĐ-UBND, ngày 06/01/2012 của Chủ tịch UBND tỉnh",
    "worship": "Đức thánh Cao Sơn, Quý Minh",
    "title": "Đình Cầu Thượng",
    "shortTitle": "Đình Cầu Thượng",
    "address": "Thôn Cầu Thượng, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    "thumbnail": "./assets/images/dinh-cau-thuong/anh-dai-dien.jpg",
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
    "overview": "Đình thôn Cầu Thượng thờ Cao Sơn, Quý Minh; gồm Tiền tế và Hậu cung, vì nóc chồng rường giá chiêng trên cột lim. Xếp hạng cấp tỉnh năm 2012.",
    "content": {
      "intro": "Đình thờ Đức thánh Cao Sơn, Quý Minh của làng Cầu Thượng, nay thuộc thôn Cầu Thượng, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang). Đình được xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 10/QĐ-UBND ngày 06/01/2012.",
      "historicalSignificance": [
        "**Hậu phương vững chắc của các phong trào yêu nước:** Nhân dân thôn Cầu Thượng có truyền thống đoàn kết, kiên cường đánh giặc bảo vệ quê hương.",
        "**Xếp hạng di tích:** Đình Cầu Thượng được Chủ tịch UBND tỉnh ban hành Quyết định số 10/QĐ-UBND ngày 06/01/2012 xếp hạng di tích lịch sử – văn hóa cấp tỉnh."
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
      "locationName": "Đình Cầu Thượng (di tích lịch sử – văn hóa cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-cau-thuong/anh-dai-dien.jpg",
        "caption": "Toàn cảnh mặt tiền cụm di tích Cầu Thượng cổ kính dưới tán cây đại cổ thụ (Ảnh thực tế: Ban biên tập)"
      },
      {
        "url": "./assets/images/dinh-cau-thuong/cau-thuong-2.jpg",
        "caption": "Sân gạch Bát Tràng và 5 gian Tiền tế cửa bức bàn gỗ lim vững chãi tại Cầu Thượng"
      },
      {
        "url": "./assets/images/dinh-cau-thuong/cau-thuong-3.jpg",
        "caption": "Hệ trụ biểu khắc câu đối chữ Hán và không gian kiến trúc tâm truyền thống thôn Cầu Thượng, xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại di tích Cầu Thượng (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "dinh-cau-thuong.docx",
      "title": "Hồ sơ di tích đình Cầu Thượng",
      "path": "./assets/docs/dinh-cau-thuong.docx",
      "size": "12 KB"
    }
  },
  {
    "id": "vat-the-13",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 2315/QĐ-CT, ngày 30/12/2005 của Chủ tịch UBND tỉnh",
    "worship": "Đức thánh Cao Sơn, Quý Minh",
    "title": "Đình Sậy",
    "shortTitle": "Đình Sậy",
    "address": "Thôn Sậy, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Đình thời Nguyễn của thôn Sậy, tường gạch chỉ, mái ngói mũi hài. Xếp hạng năm 2005, sớm nhất trong bảy di tích cấp tỉnh của xã.",
    "content": {
      "intro": "Đình làng thời Nguyễn của thôn Sậy, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Tân Trung, huyện Tân Yên, tỉnh Bắc Giang). Đình thờ Đức thánh Cao Sơn, Quý Minh, được xếp hạng cấp tỉnh theo Quyết định số 2315/QĐ-CT ngày 30/12/2005.",
      "historicalSignificance": [
        "**Lịch sử làng xã ngàn đời:** Đình Sậy gắn liền với công cuộc khai phá, lập làng và tinh thần chống giặc giữ làng của các thế hệ cư dân vùng Tân Trung xưa.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 2315/QĐ-CT ngày 30/12/2005."
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
      "locationName": "Đình Sậy (di tích lịch sử – văn hóa cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-say/anh-dai-dien.jpg",
        "caption": "Đình Sậy – di tích lịch sử – văn hóa cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Sậy (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "dinh-say.docx",
      "title": "Hồ sơ di tích đình Sậy",
      "path": "./assets/docs/dinh-say.docx",
      "size": "12 KB"
    }
  },
  {
    "id": "vat-the-14",
    "category": "vat-the",
    "categoryName": "Di sản vật thể",
    "rank": "cap-tinh",
    "rankName": "Di tích cấp tỉnh",
    "badge": "Di tích cấp tỉnh",
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 2169/QĐ-UBND, ngày 29/12/2010 của Chủ tịch UBND tỉnh",
    "worship": "Cao Sơn, Quý Minh, Thành hoàng làng Hòa Làng",
    "title": "Đình Nẻo",
    "shortTitle": "Đình Nẻo",
    "address": "Thôn Nẻo, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Thờ Cao Sơn, Quý Minh và Thành hoàng làng Hòa Làng. Cấu kiện gỗ chạm hoa cúc dây, rồng chầu mặt trời; còn ngai thờ và sắc phong cổ.",
    "content": {
      "intro": "Đình Nẻo thờ Đức thánh Cao Sơn, Quý Minh và Thành hoàng làng Hòa Làng. Đình ở thôn Nẻo, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang), là nơi tế lễ và sinh hoạt hương ước của thôn.",
      "historicalSignificance": [
        "**Trung tâm đoàn kết thôn xóm:** Đình là nơi tổ chức tế lễ, sinh hoạt hương ước làng xã và nuôi dưỡng tinh thần yêu nước trong các cuộc đấu tranh giải phóng dân tộc.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh ban hành Quyết định số 2169/QĐ-UBND ngày 29/12/2010 xếp hạng di tích lịch sử – văn hóa cấp tỉnh."
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
      "locationName": "Đình Nẻo (di tích lịch sử – văn hóa cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-neo/anh-dai-dien.jpg",
        "caption": "Đình Nẻo – di tích lịch sử – văn hóa cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình Nẻo (hồ sơ của Ban biên tập)",
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
    "relicType": "Di tích lịch sử – văn hóa",
    "decision": "QĐ số 2169/QĐ-UBND, ngày 29/12/2010 của Chủ tịch UBND tỉnh",
    "worship": "Thờ Phật",
    "title": "Chùa Dương Sơn",
    "shortTitle": "Chùa Dương Sơn",
    "address": "Thôn Dương Sơn, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Chùa của làng Dương Sơn, quê tục \"nói phét\". Còn tượng Phật sơn son thếp vàng, bia ký và chuông đồng cổ. Xếp hạng cấp tỉnh năm 2010.",
    "content": {
      "intro": "Chùa của làng Dương Sơn (các thôn Cả, Đỉnh, Húng), nay thuộc xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang). Chùa gồm Tiền đường và Thượng điện, được xếp hạng cấp tỉnh theo Quyết định số 2169/QĐ-UBND ngày 29/12/2010.",
      "historicalSignificance": [
        "**Nơi nuôi dưỡng tâm thiện và tinh thần yêu nước:** Trong những năm tháng chiến tranh, chùa Dương Sơn luôn là điểm tựa tâm linh vững chắc cho dân làng an tâm sản xuất và chi viện cho tiền tuyến.",
        "**Xếp hạng di tích:** Được Chủ tịch UBND tỉnh ban hành Quyết định số 2169/QĐ-UBND ngày 29/12/2010 xếp hạng di tích lịch sử – văn hóa cấp tỉnh."
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
        "caption": "Chùa Dương Sơn – Ngôi chùa cổ thanh tịnh tại thôn Dương Sơn, xã Nhã Nam"
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
    "photoNotice": "Bộ sưu tập 03 ảnh tư liệu thực tế tại chùa Dương Sơn (hồ sơ của Ban biên tập)",
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
    "address": "Thôn Sặt, xã Nhã Nam, thành phố Bắc Ninh",
    "oldAddress": "Xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang",
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
    "overview": "Năm 1889 dân làng Sặt cùng nghĩa quân Yên Thế phục kích, đẩy lui các đợt càn từ đồn Nhã Nam. Đình còn sắc phong Duy Tân thứ 3 (1909).",
    "content": {
      "intro": "Đình làng Sặt ở thôn Sặt, xã Nhã Nam, thành phố Bắc Ninh (trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang), là đình chung của 5 thôn Chài, Quân, Đồn, Thượng và Phố. Cuối thế kỷ XIX, nghĩa quân Yên Thế nhiều lần hội họp tại đình; năm 1889, dân làng cùng nghĩa quân đánh lui các đợt càn của quân Pháp từ đồn Nhã Nam.",
      "historicalSignificance": [
        "**Căn cứ hội họp của nghĩa quân Yên Thế:** Nơi đây thường được các thủ lĩnh cuộc khởi nghĩa chọn làm nơi hội họp của bộ đội và du kích địa phương trong kháng chiến chống thực dân Pháp.",
        "**Địa danh trận chiến làng Sặt năm 1889:** Năm 1889, quân Pháp từ đồn Nhã Nam tiến hành càn quét làng Sặt. Dưới sự hiệp lực của dân làng Sặt và tài mưu trí của nghĩa quân Yên Thế, ta đã phục kích bẻ gãy nhiều đợt tấn công của địch.",
        "**Xếp hạng di tích:** Đình làng Sặt được Chủ tịch UBND tỉnh ban hành Quyết định số 2012/QĐ-UBND ngày 24/12/2018 xếp hạng di tích lịch sử cấp tỉnh."
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
      "locationName": "Đình làng Sặt (di tích lịch sử cấp tỉnh)"
    },
    "gallery": [
      {
        "url": "./assets/images/dinh-sat/anh-dai-dien.jpg",
        "caption": "Đình làng Sặt – di tích lịch sử cấp tỉnh tại xã Nhã Nam"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh tư liệu thực tế tại đình làng Sặt (hồ sơ của Ban biên tập)",
    "docFile": {
      "fileName": "dinh-sat.docx",
      "title": "Hồ sơ di tích đình làng Sặt",
      "path": "./assets/docs/dinh-sat.docx",
      "size": "13 KB"
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
    "scope": "Địa bàn toàn xã Nhã Nam (trọng tâm tại đình – chùa Hả, chùa Tứ Giáp và đồi Phủ)",
    "thumbnail": "./assets/images/video-tu-lieu/le-hoi-dinh-ha.jpg",
    "video": {
      "title": "Video tư liệu: Diễn tích Lương Văn Nắm (Đề Nắm) tế cờ khởi nghĩa Yên Thế tại đình Hả (từ phút 05:54)",
      "youtubeId": "13WbD3DOeQc",
      "youtubeUrl": "https://www.youtube.com/watch?v=13WbD3DOeQc&t=354s",
      "embedUrl": "https://www.youtube.com/embed/13WbD3DOeQc?start=354",
      "startTime": 354,
      "description": "Diễn tích hào hùng tái hiện khoảnh khắc ngày 16/3/1884 khi thủ lĩnh Đề Nắm tế cờ phát động khởi nghĩa Yên Thế (bắt đầu từ 05:54)."
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
    "overview": "Diễn ra dịp 15–17/3 dương lịch hằng năm (từ năm 2025 mở rộng thành Tuần lễ hội 11–18/3), tái hiện lễ tế cờ của Đề Nắm năm 1884 tại đình Hả cùng rước kiệu, hội thao thượng võ.",
    "content": {
      "intro": "Lễ hội khởi nghĩa Yên Thế tại Nhã Nam và vùng phụ cận diễn ra vào mùa xuân, trọng tâm từ ngày 15–17/3 dương lịch hằng năm (từ năm 2025 được mở rộng thành Tuần lễ hội từ 11–18/3), kỷ niệm ngày thủ lĩnh Lương Văn Nắm (Đề Nắm) tế cờ phát động cuộc khởi nghĩa nông dân kéo dài 29 năm 9 tháng (1884–1913). Phần lễ có rước kiệu, dâng hương, tái hiện lễ tế cờ; phần hội có văn nghệ, đấu vật, kéo co, cờ tướng.",
      "originAndMeaning": [
        "**Tưởng niệm ngày lễ tế cờ lịch sử 16/3/1884:** Tái hiện trang nghiêm nghi lễ cắt máu ăn thề trước trận đánh và khao quân sau chiến thắng của Đề Nắm, Đề Thám cùng nghĩa binh tại đình Hả và hệ thống di tích Yên Thế.",
        "**Tôn vinh cuộc khởi nghĩa nông dân dài nhất lịch sử (29 năm 9 tháng):** Khẳng định tầm vóc cuộc khởi nghĩa vũ trang bền bỉ, linh hoạt và quyết liệt của những thủ lĩnh xuất thân từ nông dân chống thực dân Pháp cuối thế kỷ XIX – đầu thế kỷ XX.",
        "**Cố kết cộng đồng làng xã:** Dịp tụ hội của nhân dân địa phương và du khách thập phương trở về nguồn cội hào hùng."
      ],
      "ritualsAndActivities": [
        "**Phần lễ trang nghiêm:** Lễ rước kiệu truyền thống từ các làng thôn, lễ dâng hương tưởng niệm, lễ tế cờ tái hiện lịch sử hào hùng.",
        "**Phần hội tưng bừng:** Hội diễn văn nghệ quần chúng, thi đấu cờ tướng, kéo co, đấu vật dân tộc, giải bóng chuyền, hội chọi gà và các trò chơi dân gian đặc sắc."
      ],
      "preservationValue": "Lễ hội là không gian văn hóa sống động kết nối các thế hệ học sinh THPT với cội nguồn lịch sử oanh liệt của ông cha."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang",
      "locationName": "Trung tâm lễ hội Yên Thế tại đình Hả – xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/video-tu-lieu/le-hoi-dinh-ha.jpg",
        "caption": "Cảnh nghi lễ rước kiệu tại đình Hả (ảnh trích từ video tư liệu lễ hội khởi nghĩa Yên Thế)"
      },
      {
        "url": "./assets/images/dinh-chua-ha/dien-tich-de-nam-te-co.jpg",
        "caption": "Tái hiện diễn tích Đề Nắm tế cờ xuất quân khởi nghĩa tại lễ hội truyền thống đình Hả"
      },
      {
        "url": "./assets/images/dinh-chua-ha/thu-linh-de-nam.jpg",
        "caption": "Hình tượng thủ lĩnh Đề Nắm tuốt gươm thề xuất quân đánh giặc tại sân đình Hả"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập ảnh tư liệu trích xuất từ video và ảnh chụp thực tế diễn tích tế cờ Đề Nắm tại lễ hội đình Hả",
    "docFile": {
      "fileName": "le-hoi-yen-the-nha-nam.docx",
      "title": "Tư liệu lễ hội Yên Thế tại xã Nhã Nam",
      "path": "./assets/docs/le-hoi-yen-the-nha-nam.docx",
      "size": "37 KB"
    },
    "relatedDocFiles": [
      {
        "fileName": "kich-ban-dien-tich-de-nam-te-co.docx",
        "title": "Kịch bản Lễ tế cờ hội đình Hả (diễn tích Đề Nắm)",
        "path": "./assets/docs/kich-ban-dien-tich-de-nam-te-co.docx",
        "size": "23 KB"
      }
    ]
  },
  {
    "id": "phi-vat-the-2",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Nghệ thuật trình diễn dân gian",
    "title": "Nghệ thuật hát chèo truyền thống xã Nhã Nam",
    "shortTitle": "Hát chèo Nhã Nam",
    "scope": "CLB Chèo Dương Lâm (thành lập chính thức) cùng các chiếu chèo tại các thôn: Làng Chuông, Chùa Nguộn, Cầu Thượng, xã Nhã Nam",
    "thumbnail": "./assets/images/hat-cheo/clb-cheo-duong-lam-1.jpg",
    "video": {
      "title": "Vở diễn \"Duyên hài lứa đôi\" – Đơn vị Nhã Nam (Hội diễn quần chúng tỉnh Bắc Ninh)",
      "youtubeId": "K_7f4eD1l_0",
      "youtubeUrl": "https://www.youtube.com/watch?v=K_7f4eD1l_0",
      "embedUrl": "https://www.youtube.com/embed/K_7f4eD1l_0"
    },
    "tags": [
      "Hát chèo",
      "CLB Chèo Dương Lâm",
      "Chiếu chèo",
      "Nghệ thuật truyền thống",
      "Dân ca",
      "Làng Chuông",
      "Dương Lâm",
      "Xã Nhã Nam"
    ],
    "overview": "Chiếu chèo sân đình Dương Lâm, đình Chuông, chùa Tứ Giáp với các điệu Đào liễu, Quân thư, Luyện năm cung, Tò vò. CLB Chèo Dương Lâm tập định kỳ.",
    "content": {
      "intro": "Chèo ở Nhã Nam gắn với chiếu chèo sân đình trong các kỳ hội làng và lúc nông nhàn. Câu lạc bộ Chèo thôn Dương Lâm được chính quyền địa phương ra quyết định thành lập, tập luyện định kỳ và dạy hát cho học sinh.",
      "originAndMeaning": [
        "**Gắn liền chiếu chèo sân đình và hội làng:** Ra đời từ các buổi sinh hoạt nông nhàn và hội làng cổ xưa tại đình Dương Lâm, đình làng Chuông, chùa Tứ Giáp.",
        "**Nội dung phản ánh cuộc sống:** Ngợi ca tình yêu quê hương, đất nước, đạo hiếu làm con, phê phán thói hư tật xấu và biểu dương lòng kiên trinh của người phụ nữ Việt Nam.",
        "**Đặc trưng chiếu chèo Nhã Nam:** Giữ được chất chèo cổ mộc mạc với các điệu Đào liễu, Quân thư, Luyện năm cung, Tò vò thắm thiết và sâu lắng."
      ],
      "ritualsAndActivities": [
        "Biểu diễn giao lưu tại sân đình vào mỗi dịp lễ hội mùa xuân, ngày hội Đại đoàn kết toàn dân tộc và các sự kiện lớn của xã Nhã Nam.",
        "CLB Chèo Dương Lâm và các thôn thường xuyên tổ chức tập luyện, sinh hoạt định kỳ và mở lớp truyền dạy làn điệu cho các em học sinh, thế hệ trẻ yêu nghệ thuật dân tộc."
      ],
      "preservationValue": "Hát chèo là cây cầu nối tâm hồn, giáo dục tình yêu văn hóa dân tộc trong các hoạt động ngoại khóa của học sinh THPT."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4210834,106.0960966&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4210834,106.0960966",
      "locationName": "Câu lạc bộ Chèo thôn Dương Lâm (khu vực đình Dương Lâm), xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/hat-cheo/clb-cheo-duong-lam-1.jpg",
        "caption": "Các liền anh, liền chị CLB Chèo thôn Dương Lâm trong trang phục biểu diễn truyền thống"
      },
      {
        "url": "./assets/images/hat-cheo/clb-cheo-duong-lam-2.jpg",
        "caption": "Ban chủ nhiệm và hội viên CLB Chèo Dương Lâm chụp ảnh lưu niệm tại buổi sinh hoạt nghệ thuật"
      },
      {
        "url": "./assets/images/hat-cheo/clb-cheo-duong-lam-3.jpg",
        "caption": "Không gian sinh hoạt, tập luyện và truyền dạy các làn điệu chèo cổ tại thôn Dương Lâm"
      },
      {
        "url": "./assets/images/hat-cheo/clb-cheo-duong-lam-4.jpg",
        "caption": "Hội viên CLB Chèo Dương Lâm tích cực tham gia các phong trào văn nghệ quần chúng địa phương"
      },
      {
        "url": "./assets/images/video-tu-lieu/hat-cheo.jpg",
        "caption": "Tiết mục hát chèo (ảnh trích từ video tư liệu \"Duyên hài lứa đôi\")"
      },
      {"url": "./assets/images/hat-cheo/clb-cheo-qd-trang-1.jpg", "caption": "Quyết định số 1270/QĐ-UBND ngày 07/9/2026 của Chủ tịch UBND xã Nhã Nam về việc thành lập Câu lạc bộ Chèo Dương Lâm (trang 1)"},
      {"url": "./assets/images/hat-cheo/clb-cheo-qd-trang-2.jpg", "caption": "Quyết định số 1270/QĐ-UBND ngày 07/9/2026 của Chủ tịch UBND xã Nhã Nam về việc thành lập Câu lạc bộ Chèo Dương Lâm (trang 2)"}
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập ảnh tư liệu chụp thực tế hoạt động biểu diễn và sinh hoạt của Câu lạc bộ Chèo thôn Dương Lâm, xã Nhã Nam",
    "docFile": {
      "fileName": "hat-cheo-truyen-thong-nha-nam.docx",
      "title": "Tư liệu nghệ thuật hát chèo truyền thống xã Nhã Nam",
      "path": "./assets/docs/hat-cheo-truyen-thong-nha-nam.docx",
      "size": "37 KB"
    },
    "relatedDocFiles": [
      {
        "fileName": "quyet-dinh-thanh-lap-clb-cheo-duong-lam.pdf",
        "title": "Quyết định thành lập Câu lạc bộ Chèo thôn Dương Lâm",
        "path": "./assets/docs/quyet-dinh-thanh-lap-clb-cheo-duong-lam.pdf",
        "size": "564 KB"
      }
    ]
  },
  {
    "id": "phi-vat-the-3",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Nghề truyền thống",
    "title": "Nghề làm bánh khảo, kẹo lạc truyền thống xã Nhã Nam",
    "shortTitle": "Bánh khảo và kẹo lạc Nhã Nam",
    "scope": "Các hộ gia đình nghệ nhân làm nghề truyền thống tại xã Nhã Nam",
    "thumbnail": "./assets/images/banh-khao/banh-khao-minh-hoa.jpg",
    "imagePosition": "center 60%",
    "tags": [
      "Bánh khảo",
      "Kẹo lạc",
      "Nghề truyền thống",
      "Ẩm thực dân gian",
      "Đặc sản",
      "Xã Nhã Nam"
    ],
    "overview": "Bánh khảo đóng khuôn gỗ từ bột nếp cái hoa vàng rang xay; kẹo lạc nấu mạch nha với lạc đồi. Quà dâng cúng ngày Tết và ngày hội làng.",
    "content": {
      "intro": "Bánh khảo và kẹo lạc là quà Tết và lễ vật dâng đình chùa của người Nhã Nam. Bánh làm từ gạo nếp cái hoa vàng rang chín, xay mịn, ủ đường rồi đóng khuôn gỗ; kẹo lạc nấu từ mạch nha và lạc đồi rang.",
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
      "embedUrl": "https://www.google.com/maps?q=21.4404,106.0965&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4404,106.0965",
      "locationName": "Làng nghề bánh khảo và kẹo lạc – xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/banh-khao/banh-khao-minh-hoa.jpg",
        "caption": "Bánh khảo – ảnh minh họa sưu tầm trên mạng, không chụp tại Nhã Nam",
        "position": "center 60%"
      },
      {
        "url": "./assets/images/banh-khao/keo-lac-minh-hoa.jpg",
        "caption": "Kẹo lạc – ảnh minh họa sưu tầm trên mạng, không chụp tại Nhã Nam",
        "position": "center 55%"
      }
    ],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh minh họa sưu tầm trên mạng; ảnh chụp thực tế tại các hộ làm nghề ở Nhã Nam đang được Ban biên tập cập nhật",
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
    "badge": "Tập quán xã hội và tín ngưỡng",
    "title": "Tập quán tưởng niệm Lương Văn Nắm và Hoàng Hoa Thám",
    "shortTitle": "Tưởng niệm nghĩa quân Yên Thế",
    "scope": "Địa bàn toàn xã Nhã Nam và vùng di tích khởi nghĩa Yên Thế (đình Hả, đền Gốc Khế, đền Đề Truật, đền thờ Cả Trọng)",
    "thumbnail": "./assets/images/tuong-niem-yen-the/tuong-dai-hoang-hoa-tham.jpg",
    "tags": [
      "Lương Văn Nắm",
      "Hoàng Hoa Thám",
      "Hùm thiêng Yên Thế",
      "Đề Truật",
      "Hoàng Thị Thế",
      "Tưởng niệm",
      "Tập quán tín ngưỡng",
      "Uống nước nhớ nguồn",
      "Xã Nhã Nam"
    ],
    "overview": "Tục phối thờ và dâng hương tưởng niệm Đề Nắm, 'Hùm thiêng' Hoàng Hoa Thám cùng các tướng lĩnh nghĩa quân Yên Thế; lưu truyền câu ca bất khuất 'Đất này là đất cụ Đề'.",
    "content": {
      "intro": "Sau khi cuộc khởi nghĩa Yên Thế (1884–1913) kết thúc, nhân dân xã Nhã Nam và vùng Yên Thế đã đưa bài vị, tượng thờ thủ lĩnh Lương Văn Nắm (Đề Nắm), 'Hùm thiêng' Hoàng Hoa Thám (Đề Thám) cùng các tướng lĩnh (Đề Truật, Cả Trọng...) vào phối thờ tại các đình, đền, chùa địa phương (đình Hả, đền Gốc Khế, đền Đề Truật, đền Gốc Dẻ, đền Thề).",
      "originAndMeaning": [
        "**Khí phách 'Đất này là đất cụ Đề':** Khởi nghĩa Yên Thế kéo dài suốt 29 năm 9 tháng đã để lại trong tâm thức dân gian niềm tự hào bất khuất qua câu truyền tụng: 'Đất này là đất cụ Đề, Tây lên thì có, Tây về thì không'.",
        "**Đạo lý tri ân và phối thờ tiền nhân:** Khi cuộc khởi nghĩa khép lại năm 1913, nhiều công trình bị thực dân Pháp tàn phá, người dân đã gìn giữ và đưa tượng, bài vị cụ Đề Nắm, cụ Đề Thám vào thờ trang trọng tại các ngôi đình, đền, chùa để hương khói đời đời.",
        "**Tấm lòng hướng về cội nguồn của hậu duệ nghĩa quân:** Tiêu biểu như bà Hoàng Thị Thế (1901–1988) – con gái cụ Đề Thám, từng bị đày sang Pháp từ nhỏ; năm 1963 hưởng ứng lời kêu gọi Việt kiều yêu nước của Chủ tịch Hồ Chí Minh đã trở về Tổ quốc và tâm nguyện yên nghỉ vĩnh hằng trên mảnh đất quê hương."
      ],
      "ritualsAndActivities": [
        "Nghi thức thắp hương tưởng niệm vào ngày rằm, mùng một, ngày tế cờ (16/3) và ngày giỗ trận tại đình Hả, đền Gốc Khế, đền Đề Truật, đền thờ Cả Trọng.",
        "Hoạt động ngoại khóa dâng hương báo công, nghe thuyết minh lịch sử của thầy và trò các trường phổ thông trên địa bàn trước thềm các kỳ thi và ngày lễ lớn."
      ],
      "preservationValue": "Kết nối mạch nguồn lịch sử từ lời thề nghĩa quân Yên Thế đến lời Bác Hồ dạy tại Nhã Nam: 'vì dân mà hành động, vì nước mà hy sinh', bồi đắp lý tưởng sống cao đẹp cho học sinh THPT."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang",
      "locationName": "Khu tưởng niệm nghĩa sĩ Yên Thế – xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/tuong-niem-yen-the/tuong-dai-hoang-hoa-tham.jpg",
        "caption": "Tượng đài và hương án tưởng niệm Anh hùng dân tộc Hoàng Hoa Thám – 'Hùm thiêng Yên Thế' (Tư liệu: Báo Pháp luật Việt Nam)"
      },
      {
        "url": "./assets/images/tuong-niem-yen-the/den-the-yen-the.jpg",
        "caption": "Không gian Đền Thề cổ kính – nơi nghĩa quân Yên Thế từng cắt máu ăn thề xuất quân và được nhân dân phối thờ cụ Đề Thám"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 02 ảnh tư liệu thực tế không gian tưởng niệm Anh hùng dân tộc Hoàng Hoa Thám và nghĩa quân Yên Thế",
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
    "badge": "Trò chơi dân gian và võ thuật",
    "title": "Trò chơi dân gian và võ cổ truyền trong lễ hội Nhã Nam",
    "shortTitle": "Trò chơi dân gian và võ cổ truyền",
    "scope": "Không gian lễ hội truyền thống tại các thôn trong xã Nhã Nam",
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
    "overview": "Sới vật đầu xuân, đấu gậy, đấu nỏ, kéo co, cờ người, đập niêu. Nhiều bài võ bắt nguồn từ lối luyện quân của nghĩa binh Đề Nắm, Đề Thám.",
    "content": {
      "intro": "Hội làng mùa xuân ở Nhã Nam thường có sới vật, đấu gậy, biểu diễn võ cổ truyền và các trò kéo co, cờ người, đập niêu. Người địa phương gọi vùng này là 'đất Cầu Vồng'; nhiều bài võ được truyền lại từ thời nghĩa quân Yên Thế.",
      "originAndMeaning": [
        "**Gắn với thao lược quân sự của nghĩa quân Yên Thế:** Nhiều bài võ thuật, đấu gậy, đấu nỏ cổ truyền bắt nguồn từ các bài tập luyện chiến đấu của nghĩa binh thời Đề Nắm, Đề Thám.",
        "**Rèn luyện sức khỏe và ý chí:** Tinh thần thượng võ 'đất Cầu Vồng' hun đúc nên lòng quả cảm, đức tính kiên nhẫn và sức bền bỉ cho người dân."
      ],
      "ritualsAndActivities": [
        "Sới vật dân tộc đầu xuân: Tiếng trống thúc giục, các đô vật tranh tài quyết liệt trên nền cát mịn với tinh thần thượng võ mãnh liệt.",
        "Hội thi cờ người, kéo co, đập niêu đất, chọi gà và giao lưu võ thuật cổ truyền giữa các trường học và câu lạc bộ thanh niên."
      ],
      "preservationValue": "Góp phần rèn luyện thể lực và bồi dưỡng lòng dũng cảm, tinh thần đồng đội cho học sinh THPT và thế hệ trẻ."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4443874,106.0991677&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4443874,106.0991677",
      "locationName": "Sới vật và không gian hội thao dân gian – xã Nhã Nam"
    },
    "gallery": [],
    "hasRealPhoto": false,
    "photoNotice": "Ảnh tư liệu thực tế tại lễ hội/hoạt động đang được Ban biên tập cập nhật",
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
    "badge": "Văn hóa dân gian",
    "title": "Nghệ thuật kể chuyện dân gian – Làng nói phét Dương Sơn",
    "shortTitle": "Làng nói phét Dương Sơn",
    "scope": "Thôn Dương Sơn, xã Nhã Nam, thành phố Bắc Ninh",
    "address": "Thôn Dương Sơn, xã Nhã Nam, thành phố Bắc Ninh",
    "thumbnail": "./assets/images/video-tu-lieu/lang-noi-phet-duong-son.jpg",
    "tags": [
      "Làng nói phét",
      "Nói trạng",
      "Dương Sơn",
      "Dương Sơn hội quán",
      "Cụ Cả Tam",
      "Kể chuyện dân gian",
      "Văn hóa dân gian",
      "Nhã Nam",
      "Bắc Ninh"
    ],
    "video": {
      "title": "Làng nói phét và những câu chuyện đầy hấp dẫn (phóng sự của kênh Trường Giang B&B)",
      "youtubeId": "w-SSxpYTbUs",
      "youtubeUrl": "https://www.youtube.com/watch?v=w-SSxpYTbUs",
      "embedUrl": "https://www.youtube.com/embed/w-SSxpYTbUs"
    },
    "moreVideos": [
      {"title": "Nghệ nhân làng Dương Sơn kể chuyện nói phét – đoạn 1 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-1.mp4"},
      {"title": "Nghệ nhân làng Dương Sơn kể chuyện nói phét – đoạn 2 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-2.mp4"},
      {"title": "Trò chuyện cùng nghệ nhân nói phét bên hiên nhà – đoạn 3 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-3.mp4"},
      {"title": "Nghệ nhân kể chuyện phét ngay bên bờ ruộng – đoạn 4 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-4.mp4"},
      {"title": "Theo chân nghệ nhân qua vườn, ngõ làng Dương Sơn – đoạn 5 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-5.mp4"},
      {"title": "Cảnh quan đường làng, cây cổ thụ làng Dương Sơn – đoạn 6 (tư liệu video quay tại làng Dương Sơn)", "localSrc": "./assets/videos/noi-phet-duong-son/noi-phet-6.mp4"}
    ],
    "overview": "Làng Dương Sơn (thôn Cả, Đỉnh, Húng) giữ tục \"ăn no, nói phét, người cười rụng răng\": kể chuyện phóng đại lúc làm đồng cho quên mệt.",
    "content": {
      "intro": "Làng Dương Sơn gồm các thôn Cả, Đỉnh, Húng; trước ngày 01/7/2025 thuộc xã Liên Sơn, huyện Tân Yên, tỉnh Bắc Giang, nay thuộc xã Nhã Nam, thành phố Bắc Ninh. Làng có tục \"ăn no, nói phét, người cười rụng răng\". Nói phét (nói khoác, nói trạng) ở Dương Sơn là lối kể chuyện phóng đại để mua vui, sinh ra trong lao động của người làm ruộng.",
      "originAndMeaning": [
        "**Sinh ra từ lao động giải trí:** Tục lệ này là hình thức thư giãn sau những giờ lao động đồng áng vất vả. Thay vì mệt mỏi, người dân tụ họp cùng nhau sáng tạo nên những mẩu chuyện phóng đại đầy dí dỏm để cả xóm cùng cười sảng khoái.",
        "**Nghệ thuật nói quá thâm thúy:** Những câu chuyện nói phét thường thể hiện qua thơ ca, vè hoặc mẩu chuyện khoa trương sinh động, thâm thúy chứ hoàn toàn không mang mục đích lừa đảo hay gian dối.",
        "**Câu ca đối sánh dân gian nức tiếng:** Vùng Kinh Bắc xưa từng lưu truyền câu thơ đối sánh tài năng giữa các vùng đất: *\"Hòa Làng nói phét có ca / Dương Sơn nói phét bằng ba Hòa Làng\"*, khẳng định vị thế quán quân về nghệ thuật gây cười dân gian của Dương Sơn.",
        "**Câu ca về cây đa làng:** Người làng còn truyền tụng: *\"Dương Sơn xưa có cây đa / Bóng đa rợp tận sông Đà, sông Lô\"*, thể hiện trí tưởng tượng bay bổng vô bờ bến và lòng tự hào về quê hương."
      ],
      "practice": [
        "**Những 'trạng phét' tiêu biểu:** Làng từng có những nghệ nhân trứ danh được bà con truyền tụng như cụ Cả Tam (đã mất), cụ Vũ Văn Lập, ông Nguyễn Văn Sự, ông Vũ Văn Tứ... với cách kể chuyện tỉnh queo mà người nghe cười nghiêng ngả.",
        "**Không gian kể chuyện dân gian:** Chuyện phét thường được kể ở cổng làng xưa, ở điếm làng (nay còn tấm biển lưu niệm \"Dương Sơn hội quán\"), bên ấm nước chè xanh lúc nông nhàn hay những đêm trăng thanh tụ họp xóm ngõ.",
        "**Bảo tồn và phục hồi:** Trải qua thời gian, trước nguy cơ mai một, chính quyền địa phương và các bô lão trong làng đang tích cực sưu tầm, ghi hình các video tiểu phẩm và phục hồi nét văn hóa độc nhất vô nhị này."
      ],
      "studyNote": "Câu chuyện làng nói phét Dương Sơn cho thấy tiếng cười lạc quan là di sản tinh thần vô giá của cha ông. Học sinh THPT cần phân biệt rõ giữa nghệ thuật nói quá để mua vui và thói nói dối; từ đó trân trọng khiếu hài hước thông tuệ của người dân quê mình."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.408497,106.1126369&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.408497,106.1126369",
      "locationName": "Thôn Dương Sơn (khu vực chùa Dương Sơn), xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/video-tu-lieu/lang-noi-phet-duong-son.jpg",
        "caption": "Điếm làng Dương Sơn – Dương Sơn hội quán (ảnh trích từ video phóng sự \"Chuyện làng nói phét\")"
      },
      {
        "url": "./assets/images/video-tu-lieu/lang-noi-phet-ban-chep-tay.jpg",
        "caption": "Cụ cao niên làng Dương Sơn đọc lại bản chép tay (ảnh trích từ video tư liệu của Ban biên tập)",
        "position": "center 50%"
      },
      {
        "url": "./assets/images/video-tu-lieu/lang-noi-phet-duong-lang.jpg",
        "caption": "Đường làng Dương Sơn (ảnh trích từ video tư liệu của Ban biên tập)",
        "position": "center 50%"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Ảnh trích từ video tư liệu; ảnh chụp thực tế đang được Ban biên tập cập nhật",
    "docFile": {
      "fileName": "lang-noi-phet-duong-son.docx",
      "title": "Tư liệu nghệ thuật kể chuyện dân gian làng nói phét Dương Sơn",
      "path": "./assets/docs/lang-noi-phet-duong-son.docx",
      "size": "37 KB"
    },
    "relatedDocFiles": [
      {
        "fileName": "loi-tua-lang-noi-phet-duong-son.docx",
        "title": "Lời tựa tục ăn no nói phét làng Dương Sơn",
        "path": "./assets/docs/loi-tua-lang-noi-phet-duong-son.docx",
        "size": "13 KB"
      }
    ]
  },
  {
    "id": "phi-vat-the-7",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Dân ca Quan họ",
    "title": "Nghệ thuật Dân ca Quan họ xã Nhã Nam (CLB Dân ca Quan họ)",
    "shortTitle": "Dân ca Quan họ Nhã Nam",
    "scope": "Câu lạc bộ Dân ca Quan họ xã Nhã Nam cùng các nghệ nhân, liền anh liền chị tại các thôn trong toàn xã",
    "address": "Xã Nhã Nam, thành phố Bắc Ninh (sinh hoạt tại Khu lưu niệm 6 điều Bác Hồ dạy CAND và các di tích)",
    "thumbnail": "./assets/images/quan-ho/quan-ho-1.jpg",
    "video": {"title": "Phóng sự truyền hình về dân ca quan họ (nguồn: VTV1)", "localSrc": "./assets/videos/quan-ho-nha-nam/quan-ho-vtv1.mp4"},
    "moreVideos": [
      {"title": "Các liền chị CLB Dân ca Quan họ biểu diễn trước sân đình", "localSrc": "./assets/videos/quan-ho-nha-nam/quan-ho-san-dinh.mp4"}
    ],
    "tags": [
      "Dân ca Quan họ",
      "Quan họ Bắc Ninh",
      "CLB Dân ca Quan họ",
      "Liền anh liền chị",
      "Di sản UNESCO",
      "Áo tứ thân",
      "Nón quai thao",
      "Xã Nhã Nam",
      "Bắc Ninh"
    ],
    "overview": "Câu lạc bộ thành lập theo Quyết định số 756/QĐ-UBND của UBND xã, tập và truyền dạy làn điệu Quan họ Bắc Ninh, di sản UNESCO ghi danh năm 2009.",
    "content": {
      "intro": "Câu lạc bộ Dân ca Quan họ xã Nhã Nam thành lập theo Quyết định số 756/QĐ-UBND của UBND xã Nhã Nam, tập hợp người hát trong xã để tập luyện và truyền dạy các làn điệu Quan họ. Dân ca Quan họ Bắc Ninh được UNESCO ghi danh là di sản văn hóa phi vật thể đại diện của nhân loại năm 2009.",
      "originAndMeaning": [
        "**Kết tinh văn hóa Kinh Bắc ngàn năm:** Kế thừa trọn vẹn nét tinh hoa của Quan họ truyền thống với phong cách ứng xử lịch thiệp, khiêm nhường 'khách đến chơi nhà', trọng nghĩa trọng tình.",
        "**Căn cứ pháp lý chính thức:** Thành lập theo Quyết định số 756/QĐ-UBND ngày 21/5/2026 của Chủ tịch UBND xã Nhã Nam nhằm gìn giữ, phát huy giá trị Dân ca Quan họ Bắc Ninh trên địa bàn xã.",
        "**Lề lối và trang phục cổ truyền:** Liền anh đĩnh đạc trong áo the, khăn xếp, ô đen; liền chị duyên dáng trong tà áo tứ thân mớ ba mớ bảy, khăn mỏ quạ, nón quai thao thêu hoa tinh xảo."
      ],
      "ritualsAndActivities": [
        "**Sinh hoạt và truyền dạy:** CLB tổ chức tập luyện thường xuyên, truyền dạy các câu hát cổ, lối hát vang, rền, nền, nảy cho thế hệ trẻ.",
        "**Giao lưu và biểu diễn:** Biểu diễn phục vụ các ngày lễ kỷ niệm, hội làng mùa xuân, đặc biệt là các chương trình dâng hương tại Khu lưu niệm Sáu điều Bác Hồ dạy CAND và các di tích lịch sử.",
        "**Lan tỏa di sản học đường:** Phối hợp với các trường phổ thông trên địa bàn đưa Dân ca Quan họ vào các buổi trải nghiệm ngoại khóa, giúp học sinh thêm tự hào về văn hóa quê hương."
      ],
      "preservationValue": "Dân ca Quan họ là linh hồn văn hóa của quê hương Kinh Bắc, bồi đắp tâm hồn thanh cao, lối ứng xử văn minh và đạo lý tốt đẹp cho thế hệ trẻ Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4448892,106.0901463&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4448892,106.0901463",
      "locationName": "Khu lưu niệm Sáu điều Bác Hồ dạy CAND (không gian giao lưu Quan họ), xã Nhã Nam"
    },
    "gallery": [
      {
        "url": "./assets/images/quan-ho/quan-ho-1.jpg",
        "caption": "Các liền anh, liền chị CLB Dân ca Quan họ xã Nhã Nam chụp ảnh lưu niệm tại Khu lưu niệm Sáu điều Bác Hồ dạy CAND"
      },
      {
        "url": "./assets/images/quan-ho/quan-ho-2.jpg",
        "caption": "Đại diện liền anh, liền chị nhận hoa chúc mừng tại Lễ ra mắt Câu lạc bộ Dân ca Quan họ xã Nhã Nam"
      },
      {
        "url": "./assets/images/quan-ho/quan-ho-3.jpg",
        "caption": "Các liền chị trong trang phục áo tứ thân, khăn mỏ quạ, nón quai thao truyền thống trước cửa di tích cổ kính"
      },
      {
        "url": "./assets/images/quan-ho/quan-ho-qd-trang-1.jpg",
        "caption": "Quyết định số 756/QĐ-UBND của UBND xã Nhã Nam thành lập CLB Dân ca Quan họ xã Nhã Nam (Trang 1)"
      },
      {
        "url": "./assets/images/quan-ho/quan-ho-qd-trang-2.jpg",
        "caption": "Quyết định số 756/QĐ-UBND của UBND xã Nhã Nam có chữ ký của Phó Chủ tịch UBND xã và dấu đỏ (Trang 2)"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 05 ảnh tư liệu chụp thực tế hoạt động và văn bản pháp lý thành lập CLB Dân ca Quan họ xã Nhã Nam",
    "docFile": {
      "fileName": "nghe-thuat-hat-quan-ho-nha-nam.docx",
      "title": "Tư liệu Nghệ thuật Dân ca Quan họ xã Nhã Nam",
      "path": "./assets/docs/nghe-thuat-hat-quan-ho-nha-nam.docx",
      "size": "38 KB"
    }
  },
  {
    "id": "phi-vat-the-8",
    "category": "phi-vat-the",
    "categoryName": "Di sản phi vật thể",
    "badge": "Văn hóa dân gian",
    "title": "Câu lạc bộ Nghệ thuật Dân gian xã Nhã Nam",
    "shortTitle": "CLB Nghệ thuật Dân gian Nhã Nam",
    "scope": "Toàn thể hội viên, diễn viên nghệ thuật quần chúng tại các thôn trong xã Nhã Nam",
    "address": "Xã Nhã Nam, thành phố Bắc Ninh (trụ sở sinh hoạt tại Hội trường UBND xã và nhà văn hóa thôn)",
    "thumbnail": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-1.jpg",
    "tags": [
      "Nghệ thuật dân gian",
      "CLB Nghệ thuật Dân gian",
      "Múa nón",
      "Múa quạt",
      "Dân ca",
      "Văn nghệ quần chúng",
      "Xã Nhã Nam",
      "Bắc Ninh"
    ],
    "overview": "Thành lập theo Quyết định số 1570/QĐ-UBND ngày 29/8/2025, ra mắt ngày 31/8/2025. Dàn dựng múa nón quai thao, múa lụa, hát then, chèo cổ, dân ca.",
    "content": {
      "intro": "Câu lạc bộ thành lập theo Quyết định số 1570/QĐ-UBND ngày 29/8/2025 của UBND xã Nhã Nam, ra mắt ngày 31/8/2025 tại hội trường UBND xã, do bà Nguyễn Thị Tâm làm Chủ nhiệm. Câu lạc bộ chịu sự quản lý của Phòng Văn hóa – Xã hội xã.",
      "originAndMeaning": [
        "**Mốc son thành lập ý nghĩa:** Ra mắt chính thức ngày 31/8/2025 tại Hội trường UBND xã Nhã Nam chào mừng Đại hội Đảng bộ xã Nhã Nam lần thứ nhất (nhiệm kỳ 2025 – 2030) và kỷ niệm 80 năm Cách mạng Tháng Tám, Quốc khánh 2/9.",
        "**Cơ cấu tổ chức chặt chẽ:** Chịu sự quản lý của Phòng Văn hóa – Xã hội xã. Ban chủ nhiệm gồm Chủ nhiệm bà Nguyễn Thị Tâm; các Phó Chủ nhiệm bà Vũ Thị Thìn, bà Thân Thị Loan; các Ủy viên ông Nguyễn Văn Tân, ông Nguyễn Văn Thanh.",
        "**Sứ mệnh bảo tồn vốn cổ:** Gìn giữ các điệu múa nón quai thao, múa lụa, các bài hát then, chèo cổ và dân ca đặc sắc của quê hương."
      ],
      "ritualsAndActivities": [
        "**Luyện tập và dàn dựng:** Thường xuyên tổ chức tập luyện tại nhà văn hóa thôn, sân đình Dương Lâm và hội trường xã, nâng cao chất lượng nghệ thuật.",
        "**Biểu diễn phục vụ nhân dân:** Phục vụ các sự kiện chính trị trọng đại, lễ hội truyền thống, ngày hội Đại đoàn kết toàn dân tộc và tham gia các hội diễn văn nghệ các cấp.",
        "**Gắn kết cộng đồng:** Khơi dậy tình yêu di sản trong các tầng lớp nhân dân, đặc biệt là sự tham gia hưởng ứng của học sinh THPT."
      ],
      "preservationValue": "CLB Nghệ thuật Dân gian là mái nhà chung nuôi dưỡng ngọn lửa đam mê nghệ thuật truyền thống, thắt chặt khối đại đoàn kết toàn dân và xây dựng đời sống văn hóa lành mạnh tại xã Nhã Nam."
    },
    "map": {
      "embedUrl": "https://www.google.com/maps?q=21.4404,106.0965&output=embed",
      "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=21.4404,106.0965",
      "locationName": "UBND xã Nhã Nam (địa điểm sinh hoạt CLB Nghệ thuật Dân gian), thành phố Bắc Ninh"
    },
    "gallery": [
      {
        "url": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-1.jpg",
        "caption": "Toàn thể ban chủ nhiệm và hội viên CLB Nghệ thuật Dân gian xã Nhã Nam trong lễ ra mắt ngày 31/8/2025"
      },
      {
        "url": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-2.jpg",
        "caption": "Tiết mục múa nón và hát dân ca truyền thống đặc sắc chào mừng Đại hội Đảng bộ xã Nhã Nam"
      },
      {
        "url": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-3.jpg",
        "caption": "Các nghệ sĩ CLB Nghệ thuật Dân gian chụp ảnh lưu niệm tại cổng di tích lịch sử đình Dương Lâm"
      },
      {
        "url": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-qd-trang-1.jpg",
        "caption": "Quyết định số 1570/QĐ-UBND của UBND xã Nhã Nam thành lập CLB Nghệ thuật Dân gian (Trang 1)"
      },
      {
        "url": "./assets/images/clb-nghe-thuat-dan-gian/clb-nt-dan-gian-qd-trang-2.jpg",
        "caption": "Quyết định số 1570/QĐ-UBND có chữ ký phê duyệt của Phó Chủ tịch UBND xã Nhã Nam (Trang 2)"
      }
    ],
    "hasRealPhoto": true,
    "photoNotice": "Bộ sưu tập 05 ảnh tư liệu chụp thực tế Lễ ra mắt và văn bản pháp lý thành lập CLB Nghệ thuật Dân gian xã Nhã Nam",
    "docFile": {
      "fileName": "clb-nghe-thuat-dan-gian-nha-nam.docx",
      "title": "Tư liệu Câu lạc bộ Nghệ thuật Dân gian xã Nhã Nam",
      "path": "./assets/docs/clb-nghe-thuat-dan-gian-nha-nam.docx",
      "size": "38 KB"
    }
  }
];

/**
 * NGÂN HÀNG 40 CÂU HỎI TRẮC NGHIỆM DI SẢN NHÃ NAM (4 phần). Sinh tự động bởi
 * bao-cao-khoa-hoc/ngan_hang_40_cau.py từ file Word của Ban biên tập; đáp án đã cân bằng 10/10/10/10.
 * part: 1–4 theo ma trận; answer: chỉ số phương án đúng (0 = A).
 */
const QUIZ_PARTS = {"1": "Phần I – Lịch sử vùng đất, địa giới hành chính và tổng thể di tích", "2": "Phần II – Hệ thống di tích quốc gia đặc biệt Khởi nghĩa Yên Thế", "3": "Phần III – Di tích quốc gia chùa Tứ Giáp và các di tích cấp tỉnh", "4": "Phần IV – Di sản phi vật thể, làng nghề truyền thống và tuyến tham quan"};
const QUIZ_MATRIX = {"1": 2, "2": 3, "3": 3, "4": 2};
const QUIZ_CONFLICT_GROUPS = [[3, 4, 5, 9], [11, 17, 18], [20, 21], [26, 27, 39], [28, 30], [36, 37, 38], [6, 35], [24, 26], [24, 27], [24, 28], [24, 29], [24, 30], [24, 39]];
const QUIZ_BANK_40 = [
  {"id": 1, "part": 1, "question": "Vùng đất Nhã Nam thời xưa là trung tâm của khu vực nào sau đây?", "options": ["Vùng Yên Thế Hạ", "Vùng Yên Thế Thượng", "Vùng Lục Ngạn", "Vùng Hiệp Hòa"], "answer": 0, "explain": "Nhã Nam xưa là trung tâm vùng Yên Thế Hạ (trước ngày 01/7/2025 thuộc huyện Tân Yên; còn huyện Yên Thế ngày nay là vùng Yên Thế Thượng)."},
  {"id": 2, "part": 1, "question": "Theo đơn vị hành chính mới, xã Nhã Nam được thành lập trên cơ sở hợp nhất từ 04 đơn vị hành chính nào?", "options": ["Thị trấn Cao Thượng, xã Cao Xá, xã Ngọc Lý và xã Phúc Hòa", "Xã Nhã Nam, xã Quang Tiến, xã Lan Giới và xã Đại Hóa", "Thị trấn Nhã Nam, xã Tân Trung, xã An Dương và xã Liên Sơn", "Thị trấn Cầu Gồ, xã Phồn Xương, xã Tam Hiệp và xã Đồng Lạc"], "answer": 2, "explain": "Xã Nhã Nam theo đơn vị hành chính mới được hợp nhất từ 4 đơn vị cũ: Thị trấn Nhã Nam, xã Tân Trung, xã An Dương và xã Liên Sơn."},
  {"id": 3, "part": 1, "question": "Toàn xã Nhã Nam hiện nay sở hữu tổng cộng bao nhiêu di tích lịch sử – văn hóa?", "options": ["16 di tích", "44 di tích", "37 di tích", "21 di tích"], "answer": 2, "explain": "Toàn xã Nhã Nam có tổng cộng 37 di tích lịch sử – văn hóa, bao gồm 16 di tích đã xếp hạng các cấp và 21 di tích nằm trong danh mục kiểm kê bảo vệ."},
  {"id": 4, "part": 1, "question": "Trong tổng số 37 di tích lịch sử – văn hóa của xã Nhã Nam, có bao nhiêu di tích đã được xếp hạng chính thức?", "options": ["16 di tích", "30 di tích", "08 di tích", "21 di tích"], "answer": 0, "explain": "Xã có 16 di tích đã được xếp hạng (8 quốc gia đặc biệt, 1 quốc gia, 7 cấp tỉnh) và 21 di tích trong danh mục kiểm kê."},
  {"id": 5, "part": 1, "question": "Cơ cấu xếp hạng của 16 di tích đã xếp hạng tại xã Nhã Nam được phân chia như thế nào?", "options": ["06 di tích quốc gia đặc biệt, 03 di tích cấp quốc gia, 07 di tích cấp tỉnh", "04 di tích quốc gia đặc biệt, 04 di tích cấp quốc gia, 08 di tích cấp tỉnh", "10 di tích quốc gia đặc biệt, 02 di tích cấp quốc gia, 04 di tích cấp tỉnh", "08 di tích quốc gia đặc biệt, 01 di tích cấp quốc gia, 07 di tích cấp tỉnh"], "answer": 3, "explain": "Cơ cấu chuẩn gồm: 8 di tích quốc gia đặc biệt (thuộc hệ thống Khởi nghĩa Yên Thế), 1 di tích cấp quốc gia (Chùa Tứ Giáp), và 7 di tích cấp tỉnh."},
  {"id": 6, "part": 1, "question": "Sự kiện lịch sử vẻ vang nào diễn ra ngày 16/3/1884 tại đình Hả được xem là mốc mở đầu cuộc khởi nghĩa Yên Thế?", "options": ["Chi bộ Đảng Cộng sản đầu tiên làm lễ ra mắt nhân dân", "Nghĩa quân ký hòa hoãn lần thứ nhất với thực dân Pháp", "Thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ khởi nghĩa", "Hoàng Hoa Thám (Đề Thám) tổ chức đại hội nghĩa quân"], "answer": 2, "explain": "Ngày 16/3/1884, tại đình Hả, thủ lĩnh Lương Văn Nắm (Đề Nắm) đã cùng nghĩa quân làm lễ tế cờ xuất quân chống thực dân Pháp, chính thức mở đầu cuộc khởi nghĩa Yên Thế."},
  {"id": 7, "part": 1, "question": "Địa danh nào tại xã Nhã Nam là nơi thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương?", "options": ["Thôn Đồng Điều", "Thôn Dương Lâm", "Thôn Cầu Thượng", "Thôn Sậy"], "answer": 0, "explain": "Thôn Đồng Điều là nơi thành lập chi bộ Đảng Cộng sản đầu tiên của địa phương. Di tích lịch sử thôn Đồng Điều (trung tâm là chùa Đồng Điều) được xếp hạng di tích cấp tỉnh theo Quyết định số 2087/QĐ-UBND ngày 25/12/2006."},
  {"id": 8, "part": 1, "question": "Trước ngày sáp nhập đơn vị hành chính 01/7/2025, địa bàn xã Nhã Nam thuộc huyện nào của tỉnh Bắc Giang?", "options": ["Huyện Yên Thế", "Huyện Tân Yên", "Huyện Lạng Giang", "Huyện Việt Yên"], "answer": 1, "explain": "Trước ngày 01/7/2025, 4 đơn vị hành chính (Thị trấn Nhã Nam, xã Tân Trung, An Dương, Liên Sơn) đều trực thuộc huyện Tân Yên."},
  {"id": 9, "part": 1, "question": "Toàn xã Nhã Nam có bao nhiêu di tích nằm trong danh mục kiểm kê được Chủ tịch UBND tỉnh phê duyệt bảo vệ?", "options": ["16 di tích", "21 di tích", "37 di tích", "25 di tích"], "answer": 1, "explain": "Ngoài 16 di tích đã được xếp hạng, xã có đúng 21 di tích nằm trong danh mục kiểm kê được phê duyệt bảo vệ."},
  {"id": 10, "part": 2, "question": "Các di tích quốc gia đặc biệt tại Nhã Nam thuộc hệ thống di tích Khởi nghĩa Yên Thế được Thủ tướng Chính phủ xếp hạng theo quyết định nào?", "options": ["Quyết định số 1254/QĐ-TTg", "Quyết định số 548/QĐ-TTg", "Quyết định số 138/QĐ-BVHTTDL", "Quyết định số 240/QĐ-UBND"], "answer": 1, "explain": "Quyết định số 548/QĐ-TTg ngày 10/5/2012 của Thủ tướng Chính phủ xếp hạng di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế, trong đó có 08 điểm trên địa bàn xã Nhã Nam."},
  {"id": 11, "part": 2, "question": "Dãy di tích nào sau đây liệt kê đầy đủ 8 điểm di tích quốc gia đặc biệt tại xã Nhã Nam?", "options": ["Đình – chùa Hả, đền Gốc Khế, đồi Phủ, đình Dương Lâm, chùa Nam Thiên, đình làng Chuông, đền thờ Cả Trọng, nghĩa địa Pháp", "Chùa Nam Thiên, đền Gốc Khế, đình Cầu Thượng, chùa Dương Sơn, đồi Phủ, đình Chuông, đền Cả Trọng, chùa Hả", "Đình Hả, chùa Tứ Giáp, đồi Phủ, đền Đề Truật, đình Nẻo, chùa Đồng Điều, đình Sậy, đền Gốc Khế", "Đình Dương Lâm, nghĩa địa Pháp, đình làng Sặt, chùa Tứ Giáp, đồi Phủ, đình Hả, đền Đề Truật, chùa Nam Thiên"], "answer": 0, "explain": "Chính xác gồm 8 điểm: đình – chùa Hả, đền Gốc Khế, đồi Phủ, đình Dương Lâm, chùa Nam Thiên, đình làng Chuông, đền thờ Cả Trọng và nghĩa địa Pháp."},
  {"id": 12, "part": 2, "question": "Di tích Đồi Phủ tại Nhã Nam giữ vai trò lịch sử quan trọng nào trong thời kỳ Khởi nghĩa Yên Thế?", "options": ["Địa điểm ký kết hiệp ước hòa hoãn giữa nghĩa quân và Pháp", "Kho dự trữ lương thảo và đúc vũ khí chính của nghĩa quân Đề Nắm", "Nơi thực dân Pháp dựng đồn Nhã Nam và đặt tòa đại lý phủ Yên Thế để đàn áp nghĩa quân", "Tổng hành dinh chỉ huy tối cao của Hoàng Hoa Thám"], "answer": 2, "explain": "Đồi Phủ là quả đồi khống chế ngã tư Nhã Nam. Từ năm 1885, quân Pháp chiếm đồi, dựng đồn Nhã Nam và đặt tòa đại lý phủ Yên Thế để đàn áp nghĩa quân Yên Thế."},
  {"id": 13, "part": 2, "question": "Di tích Đình Dương Lâm gắn liền với chiến công thầm lặng của nhân vật lịch sử nào?", "options": ["Cụ Bá Phức xây dựng kho chứa lương thảo", "Cụ Cai Hậu đào hầm bí mật cho nghĩa quân rút lui", "Cụ Đề Truật chỉ huy trận tập kích quân Pháp", "Cụ Cai Sơn tổ chức chế tạo súng kíp cho nghĩa quân"], "answer": 1, "explain": "Đình Dương Lâm gắn với cụ Cai Hậu, người đào hầm bí mật từ hậu cung ra bờ ao để nghĩa quân rút lui. Đề Thám cũng từng bàn với dân dời đình từ Bãi Đình về giữa làng."},
  {"id": 14, "part": 2, "question": "Vị danh tướng được nhân dân lập đền thờ tại Di tích quốc gia đặc biệt “Đền thờ Cả Trọng” có mối quan hệ như thế nào với thủ lĩnh Hoàng Hoa Thám?", "options": ["Là em trai ruột và là quân sư mưu lược của Hoàng Hoa Thám", "Là con trai cả, từng chỉ huy xây dựng căn cứ đồn Hố Chuối của nghĩa quân", "Là thân phụ truyền thụ võ nghệ cho Hoàng Hoa Thám", "Là dũng sĩ hộ vệ trung thành của thủ lĩnh nghĩa quân"], "answer": 1, "explain": "Cả Trọng (Hoàng Đức Trọng) là con trai cả của thủ lĩnh Hoàng Hoa Thám. Thuở nhỏ ông được gửi về Dương Lâm ăn học tại nhà cụ Cai Hậu, sau chỉ huy xây dựng căn cứ đồn Hố Chuối."},
  {"id": 15, "part": 2, "question": "Di tích “Nghĩa địa Pháp” tại Nhã Nam là chứng tích lịch sử phản ánh nội dung gì?", "options": ["Nghĩa trang chôn cất tù binh sau Chiến tranh thế giới thứ nhất", "Nơi an táng các giáo sĩ và thương nhân phương Tây", "Khu nghĩa trang của các chuyên gia nông nghiệp Pháp", "Nơi chôn cất các sĩ quan, binh lính Pháp và tay sai tử trận trong các cuộc giao tranh với nghĩa quân Yên Thế"], "answer": 3, "explain": "Nghĩa địa Pháp nằm cạnh đồn Nhã Nam trên đồi Phủ, là nơi chôn cất sĩ quan, binh lính Pháp tử trận: trong cuộc chiến ở Yên Thế, hàng loạt sĩ quan chỉ huy và lính lê dương Pháp đã bỏ mạng dưới tay nghĩa quân của Đề Nắm và Đề Thám."},
  {"id": 16, "part": 2, "question": "Cụm di tích quốc gia đặc biệt Đình – Chùa Hả hiện nay tọa lạc tại làng nào thuộc xã Nhã Nam?", "options": ["Làng Chuông (thuộc thị trấn Nhã Nam cũ)", "Làng Sậy (thuộc địa bàn xã An Dương cũ)", "Làng Dương Lâm (thuộc địa bàn xã An Dương cũ)", "Làng Hả (thuộc địa bàn xã Tân Trung cũ)"], "answer": 3, "explain": "Cụm di tích lịch sử Đình – chùa Hả nằm tại làng Hả, trước đây thuộc xã Tân Trung (nay là xã Nhã Nam)."},
  {"id": 17, "part": 2, "question": "Ngôi đình cổ nào tại xã Nhã Nam thuộc 8 di tích quốc gia đặc biệt từng là nơi hội họp bàn việc nghĩa của tướng lĩnh nghĩa quân Hoàng Hoa Thám?", "options": ["Đình làng Chuông", "Đình Nẻo", "Đình Cầu Thượng", "Đình làng Sặt"], "answer": 0, "explain": "Đình làng Chuông (đình Nhã Nam) là một trong 08 di tích quốc gia đặc biệt tại Nhã Nam, nơi Hoàng Hoa Thám nhiều lần họp bàn việc quân."},
  {"id": 18, "part": 2, "question": "Ngôi chùa cổ nào tại xã Nhã Nam nằm trong hệ thống 8 di tích quốc gia đặc biệt Khởi nghĩa Yên Thế?", "options": ["Chùa Nam Thiên", "Chùa Tứ Giáp", "Chùa Đồng Điều", "Chùa Dương Sơn"], "answer": 0, "explain": "Chùa Nam Thiên là ngôi chùa thuộc danh mục 8 di tích quốc gia đặc biệt (còn Chùa Tứ Giáp là di tích quốc gia; Đồng Điều và Dương Sơn là cấp tỉnh)."},
  {"id": 19, "part": 2, "question": "Di tích quốc gia đặc biệt Đền Gốc Khế có vị trí và vai trò đặc biệt gì đối với nghĩa quân Yên Thế?", "options": ["Xưởng sửa chữa đại bác và đúc súng trường", "Bệnh xá cứu chữa thương bệnh binh của nghĩa quân", "Nơi giam giữ các chỉ huy quân đội Pháp bị bắt sống", "Trạm tiền tiêu của nghĩa quân ở cửa ngõ đồn Nhã Nam và phủ Yên Thế"], "answer": 3, "explain": "Thời khởi nghĩa Yên Thế, khu rừng Gốc Khế là trạm tiền tiêu của nghĩa quân ở cửa ngõ đồn Nhã Nam và phủ Yên Thế. Đền thuộc cụm Những địa điểm Khởi nghĩa Yên Thế, di tích quốc gia đặc biệt."},
  {"id": 20, "part": 3, "question": "Chùa Tứ Giáp là di tích cấp quốc gia duy nhất của xã Nhã Nam, nơi đây ghi dấu sự kiện lịch sử vẻ vang nào của lực lượng Công an nhân dân?", "options": ["Nơi thành lập Đội Tuyên truyền Giải phóng quân Khu XII", "Nơi mở khóa huấn luyện điệp báo đầu tiên toàn quốc", "Nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân", "Nơi tổ chức Đại hội thi đua Ái quốc ngành Công an"], "answer": 2, "explain": "Giai đoạn 1946–1948, Sở Công an Khu XII đặt trụ sở tại chùa Tứ Giáp, do đồng chí Hoàng Mai làm Giám đốc. Ngày 11/3/1948, Chủ tịch Hồ Chí Minh gửi thư nêu Sáu điều dạy Công an nhân dân."},
  {"id": 21, "part": 3, "question": "Bức thư của Chủ tịch Hồ Chí Minh gửi Công an Khu XII nêu “Sáu điều dạy Công an nhân dân” tại chùa Tứ Giáp được gửi vào thời gian nào?", "options": ["Ngày 19/8/1945", "Ngày 16/3/1948", "Ngày 02/9/1949", "Ngày 11/3/1948"], "answer": 3, "explain": "Bức thư lịch sử mang lời dạy của Bác về tư cách người Công an cách mạng được gửi đi vào ngày 11/3/1948."},
  {"id": 22, "part": 3, "question": "Chùa Tứ Giáp được Bộ Văn hóa – Thông tin (nay là Bộ Văn hóa, Thể thao và Du lịch) xếp hạng di tích cấp quốc gia theo quyết định nào?", "options": ["Quyết định số 548/QĐ", "Quyết định số 138/QĐ", "Quyết định số 225/QĐ", "Quyết định số 79/QĐ"], "answer": 1, "explain": "Chùa Tứ Giáp được xếp hạng di tích cấp quốc gia theo Quyết định số 138/QĐ ngày 31/01/1992 của Bộ Văn hóa – Thông tin."},
  {"id": 23, "part": 3, "question": "Tên gọi “Tứ Giáp” của ngôi chùa bắt nguồn từ nguyên nhân văn hóa – xã hội nào?", "options": ["Chùa nằm ở ngã tư giáp ranh giữa 4 huyện cổ", "Chùa xây trên đất làng Nguộn, do bốn giáp (đơn vị dân cư trong làng) cùng hưng công xây dựng", "Chùa có 4 cửa quay về bốn phương giáp ranh", "Chùa có 4 lớp tường thành bao quanh kiên cố"], "answer": 1, "explain": "Theo tư liệu của di tích, ngôi chùa xây trên đất làng Nguộn chủ yếu do 4 giáp hưng công nên gọi là chùa Tứ Giáp. Chùa còn có tên chữ là Đại Phúc tự, tên Nôm là chùa Gốc Gạo."},
  {"id": 24, "part": 3, "question": "Danh sách 07 di tích lịch sử – văn hóa cấp tỉnh tại xã Nhã Nam gồm những di tích nào?", "options": ["Chùa Dương Sơn, đình Cầu Thượng, đình Sặt, đồi Phủ, nghĩa địa Pháp, đình Dương Lâm, đền Đề Truật", "Đình Hả, chùa Nam Thiên, đền Đề Truật, đình Cầu Thượng, đình Sặt, đình Nẻo, chùa Tứ Giáp", "Đền Đề Truật, đình Cầu Thượng, đình Sậy, chùa Đồng Điều, đình Nẻo, chùa Dương Sơn và đình làng Sặt", "Đền Đề Truật, đền Gốc Khế, chùa Đồng Điều, đình Chuông, đình Sậy, đình Nẻo, chùa Dương Sơn"], "answer": 2, "explain": "Đúng 7 di tích cấp tỉnh: Đền Đề Truật, đình Cầu Thượng, đình Sậy, chùa Đồng Điều, đình Nẻo, chùa Dương Sơn và đình làng Sặt."},
  {"id": 25, "part": 3, "question": "Di tích cấp tỉnh Đền Đề Truật thờ phụng vị nhân vật lịch sử nào?", "options": ["Đề Truật – vị thần tướng thời Hai Bà Trưng", "Đề Truật (Dương Văn Truật) – tướng lĩnh chỉ huy dũng cảm của Khởi nghĩa Yên Thế", "Đề Truật – một vị quan triều Mạc có công dạy học tại vùng Yên Thế", "Đề Truật – một tù trưởng khai phá lập làng thời Lý – Trần"], "answer": 1, "explain": "Đền thờ tướng Dương Văn Truật (Đề Truật). Ông nổi tiếng bắn nỏ, từng chỉ huy dân binh chống giặc Cờ Đen rồi theo nghĩa quân Yên Thế chống Pháp. Đền được xếp hạng di tích cấp tỉnh theo Quyết định số 1987/QĐ-UBND ngày 12/12/2014."},
  {"id": 26, "part": 3, "question": "Di tích cấp tỉnh Đình làng Sặt là công trình văn hóa gắn liền với tín ngưỡng phụng thờ của làng cổ nào?", "options": ["Làng Chuông", "Làng Sặt", "Làng Nguộn", "Làng Hả"], "answer": 1, "explain": "Đình làng Sặt ở thôn Sặt là đình chung của 5 thôn Chài, Quân, Đồn, Thượng và Phố; được xếp hạng di tích lịch sử cấp tỉnh theo Quyết định số 2012/QĐ-UBND ngày 24/12/2018."},
  {"id": 27, "part": 3, "question": "Ngôi đình cổ nào tại Nhã Nam được xếp hạng di tích cấp tỉnh và là nơi sinh hoạt truyền thống của người dân thôn Sậy?", "options": ["Đình Hả", "Đình Chuông", "Đình Nẻo", "Đình Sậy"], "answer": 3, "explain": "Đình Sậy là đình làng thời Nguyễn của thôn Sậy, được xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 2315/QĐ-CT ngày 30/12/2005."},
  {"id": 28, "part": 3, "question": "Di tích chùa Đồng Điều được công nhận xếp hạng ở cấp nào trong hệ thống di tích?", "options": ["Di tích quốc gia đặc biệt", "Di tích cấp quốc gia", "Di tích cấp tỉnh", "Di tích kiểm kê bảo vệ"], "answer": 2, "explain": "Di tích lịch sử thôn Đồng Điều (trung tâm là chùa Đồng Điều), nơi thành lập chi bộ Đảng đầu tiên của địa phương, được xếp hạng di tích cấp tỉnh theo Quyết định số 2087/QĐ-UBND ngày 25/12/2006."},
  {"id": 29, "part": 3, "question": "Ngôi đình nào sau đây tại xã Nhã Nam thuộc danh mục 7 di tích cấp tỉnh?", "options": ["Đình Hả", "Đình làng Chuông", "Đình Dương Lâm", "Đình Cầu Thượng"], "answer": 3, "explain": "Đình Cầu Thượng thuộc nhóm di tích cấp tỉnh; các đình Hả, Dương Lâm, Chuông đều là di tích quốc gia đặc biệt."},
  {"id": 30, "part": 3, "question": "Chùa Dương Sơn tại Nhã Nam là di tích được xếp hạng ở cấp bậc nào?", "options": ["Di tích cấp tỉnh", "Di tích quốc gia đặc biệt", "Công trình tín ngưỡng chưa phân hạng", "Di tích cấp quốc gia"], "answer": 0, "explain": "Chùa Dương Sơn là một trong 07 di tích cấp tỉnh của xã Nhã Nam, được xếp hạng theo Quyết định số 2169/QĐ-UBND ngày 29/12/2010."},
  {"id": 31, "part": 4, "question": "Tục văn hóa dân gian độc đáo, giàu tính khôi hài và nghệ thuật phóng đại trào lộng nổi tiếng tại xã Nhã Nam là gì?", "options": ["Tục thổi cơm thi trên sông", "Tục múa rối cạn làng Hả", "Tục kéo co dây tre", "Tục nói phét Dương Sơn (nói dóc Dương Sơn)"], "answer": 3, "explain": "Tục nói phét Dương Sơn là nét sinh hoạt văn hóa dân gian độc đáo, thể hiện trí thông minh, tính lạc quan yêu đời và khả năng phóng đại dí dỏm của người dân."},
  {"id": 32, "part": 4, "question": "Nghề thủ công và sản phẩm ẩm thực truyền thống tiêu biểu của đất Nhã Nam là nghề nào?", "options": ["Nghề làm bánh khảo – kẹo lạc Nhã Nam", "Nghề làm tương Cự Đà", "Nghề làm bánh chưng Vân Cầu", "Nghề làm bánh đa Thổ Hà"], "answer": 0, "explain": "Nghề bánh khảo – kẹo lạc là sản phẩm ẩm thực truyền thống nức tiếng, gắn với văn hóa hội hè và đời sống người dân Nhã Nam."},
  {"id": 33, "part": 4, "question": "Di sản nghệ thuật diễn xướng dân gian truyền thống gắn liền với bản sắc văn hóa Kinh Bắc được gìn giữ tại Nhã Nam là gì?", "options": ["Nghệ thuật Hát Xoan", "Hát Tuồng cổ và Bài Chòi", "Nghệ thuật Ca trù và Hát Then", "Hát Dân ca Quan họ và nghệ thuật Hát Chèo"], "answer": 3, "explain": "Người dân Nhã Nam gìn giữ và bảo tồn sâu sắc phong trào Dân ca Quan họ và Hát Chèo truyền thống của đất Kinh Bắc."},
  {"id": 34, "part": 4, "question": "Di sản phi vật thể gắn liền với tinh thần thượng võ kiên cường của phong trào Khởi nghĩa Yên Thế tại Nhã Nam là gì?", "options": ["Bắn nỏ dân tộc", "Đua thuyền rồng truyền thống", "Võ cổ truyền (biểu diễn trong lễ hội Nhã Nam)", "Hội đấu vật cầu bùn"], "answer": 2, "explain": "Trò chơi dân gian và võ cổ truyền được tổ chức trong lễ hội ở Nhã Nam, nuôi dưỡng tinh thần thượng võ của vùng đất khởi nghĩa Yên Thế."},
  {"id": 35, "part": 4, "question": "Lễ hội truyền thống nào tại Nhã Nam tưởng nhớ các thủ lĩnh và nghĩa quân nông dân chống Pháp?", "options": ["Lễ hội Đền Hùng", "Lễ hội Chùa Dâu", "Lễ hội Khởi nghĩa Yên Thế (quanh ngày 15–16/3 dương lịch)", "Lễ hội Tịch điền"], "answer": 2, "explain": "Phần chính của lễ hội Khởi nghĩa Yên Thế diễn ra quanh ngày 15–16/3 dương lịch, tái hiện lễ tế cờ tại sân đình Hả, tưởng nhớ Đề Nắm, Đề Thám và nghĩa quân Yên Thế."},
  {"id": 36, "part": 4, "question": "Tuyến tham quan học tập số 1 (chủ đề “Cội nguồn và kháng chiến”) kết nối 3 điểm di tích tiêu biểu nào?", "options": ["Đình làng Chuông, chùa Nam Thiên và đền Cả Trọng", "Đồi Phủ, nghĩa địa Pháp và đền Gốc Khế", "Đình – chùa Hả, chùa Tứ Giáp và đình Dương Lâm", "Địa điểm thôn Đồng Điều, đền Đề Truật và chùa Dương Sơn"], "answer": 2, "explain": "Tuyến 1 “Cội nguồn và kháng chiến” đi qua đình – chùa Hả (nơi Đề Nắm tế cờ năm 1884), chùa Tứ Giáp (nơi phát tích Sáu điều Bác Hồ dạy Công an nhân dân) và đình Dương Lâm (hầm bí mật cho nghĩa quân)."},
  {"id": 37, "part": 4, "question": "Tuyến tham quan học tập số 2 (chủ đề “Mốc son cách mạng và văn hóa”) kết nối các di tích nào?", "options": ["Đồi Phủ, nghĩa địa Pháp, đình làng Sặt", "Chùa Đồng Điều (di tích thôn Đồng Điều), đền Đề Truật và chùa Dương Sơn", "Đình Nẻo, đình Sậy, đình Cầu Thượng", "Đình làng Chuông, đền Gốc Khế, chùa Tứ Giáp"], "answer": 1, "explain": "Tuyến 2 “Mốc son cách mạng và văn hóa” gồm chùa Đồng Điều (nơi thành lập chi bộ Đảng đầu tiên), đền Đề Truật (thờ tướng nghĩa quân Dương Văn Truật) và chùa Dương Sơn."},
  {"id": 38, "part": 4, "question": "Trên bản đồ số của cổng thông tin, tuyến tham quan số 3 “Chiến tích oai hùng và tín ngưỡng cổ truyền” đi qua các di tích theo thứ tự nào?", "options": ["Đền Gốc Khế → đồi Phủ → đình làng Chuông → chùa Nam Thiên → đình Cầu Thượng", "Nghĩa địa Pháp → chùa Tứ Giáp → đình Hả → chùa Dương Sơn → đình Cầu Thượng", "Chùa Đồng Điều → đền Đề Truật → chùa Dương Sơn → đình làng Sặt → đền Cả Trọng", "Đình – chùa Hả → chùa Tứ Giáp → đình Dương Lâm → đình Sậy → đình Nẻo"], "answer": 0, "explain": "Tuyến 3 nối 5 di tích gần trung tâm Nhã Nam: đền Gốc Khế → đồi Phủ (đồn Nhã Nam) → đình làng Chuông → chùa Nam Thiên (chùa Phố) → đình Cầu Thượng."},
  {"id": 39, "part": 3, "question": "Ngôi đình nào sau đây của xã Nhã Nam là di tích cấp tỉnh của thôn Nẻo?", "options": ["Đình Nẻo", "Đình Chuông", "Đình Dương Lâm", "Đình Hả"], "answer": 0, "explain": "Đình Nẻo ở thôn Nẻo thờ Đức thánh Cao Sơn, Quý Minh và Thành hoàng làng Hòa Làng; được xếp hạng di tích lịch sử – văn hóa cấp tỉnh theo Quyết định số 2169/QĐ-UBND ngày 29/12/2010."},
  {"id": 40, "part": 4, "question": "Việc giữ gìn, bảo tồn và số hóa hệ thống 37 di tích cùng các di sản phi vật thể tại xã Nhã Nam mang ý nghĩa trọng tâm nào?", "options": ["Chuyển đổi toàn bộ đất di tích sang mục đích phát triển khu công nghiệp thương mại", "Chỉ phục vụ riêng cho các nhà nghiên cứu lịch sử học thuật", "Thay thế hoàn toàn việc tham quan thực tế bằng trải nghiệm trực tuyến", "Góp phần giáo dục truyền thống yêu nước, tự hào dân tộc và phát triển du lịch di sản địa phương bền vững"], "answer": 3, "explain": "Hệ thống di sản phong phú của Nhã Nam là tài sản vô giá nhằm giáo dục truyền thống cho thế hệ trẻ và thúc đẩy kinh tế du lịch văn hóa bền vững."}
];

/**
 * --------------------------------------------------------------------
 * DANH SÁCH TỪ KHÓA TÌM KIẾM NHANH (QUICK SEARCH TAGS)
 * --------------------------------------------------------------------
 */
const QUICK_SEARCH_TAGS = [
  "Đình – chùa Hả",
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

/**
 * CẨM NANG THAM QUAN theo từng hồ sơ. Chỉ ghi điều có trong hồ sơ và toàn văn tài liệu gốc (doc-texts.js).
 * when: thời điểm nên đến (bỏ trống nếu tư liệu không ghi). see: những gì nên xem tận nơi.
 */
const VISIT_GUIDES = {
  "vat-the-1": { when: "Quanh ngày 15–16/3 dương lịch, khi lễ hội khởi nghĩa Yên Thế tái hiện lễ tế cờ ngay tại sân đình Hả.", see: ["Sân đình, nơi Đề Nắm tế cờ ngày 16/3/1884.", "Khung gỗ lim chồng rường giá chiêng, chạm rồng, lân, hoa cúc dây.", "Chùa Hả (Thanh Âm tự) liền kề: tượng Phật sơn son thếp vàng, chuông đồng, văn bia trùng tu."] },
  "vat-the-2": { when: "Mốc gắn với di tích: ngày 11/3/1948 (ngày Bác Hồ gửi thư nêu Sáu điều dạy CAND) và mùa xuân trẩy hội chùa Tứ Giáp.", see: ["Tượng Chủ tịch Hồ Chí Minh bằng đồng cao 7m cùng bức phù điêu đá xanh cao 13,5m, dài 52m tạo hình dãy núi Việt Bắc.", "Nhà truyền thống trưng bày 3 chuyên đề và kỷ vật của đồng chí Hoàng Mai (Giám đốc Công an Khu XII), tờ báo 'Bạn Dân'.", "Chùa cổ Tứ Giáp (1771–1773): cột gỗ lim còn lưu dấu đạn năm 1947, bia đá Cảnh Hưng (1771) và cây gạo 'Luân hồi' trước sân chùa."] },
  "vat-the-3": { see: ["Bia ghi công tích cách mạng của thôn Đồng Điều.", "Ngôi chùa từng là cơ sở hoạt động bí mật trước năm 1945, nơi lập chi bộ Đảng đầu tiên của địa phương."] },
  "vat-the-4": { when: "Lễ hội đền ngày 15–16 tháng Giêng âm lịch; ngày rằm, mùng một có lễ cúng.", see: ["Ban thờ Thánh Mẫu và nghĩa quân Hoàng Hoa Thám.", "Bia đá ghi sự kiện lịch sử trong khuôn viên.", "Rừng Gốc Khế, trạm tiền tiêu ở cửa ngõ đồn Nhã Nam xưa."] },
  "vat-the-5": { see: ["Dấu tích nền móng đồn lũy trên đồi.", "Vị trí khống chế ngã tư Nhã Nam, nơi Pháp dựng đồn từ năm 1885.", "Nghĩa địa Pháp và chùa Nam Thiên ở ngay gần, cùng tuyến tham quan số 3."] },
  "vat-the-6": { see: ["Đầu dư, kẻ, cốn chạm lộng rồng ổ, phượng múa.", "Bát hương gốm Thổ Hà, kiệu bát cống và 2 đạo sắc phong thời Nguyễn.", "Đình là nơi Đề Thám từng họp bàn việc quân."] },
  "vat-the-7": { see: ["Chuông đồng \"Nam Thiên Tự Chung\" đúc thời Nguyễn.", "Tòa Tiền đường, Thượng điện, nhà Mẫu, nhà Tổ và vườn tháp."] },
  "vat-the-8": { when: "Ngày giỗ tướng Đề Truật, mùng 1 tháng 7 âm lịch.", see: ["Ban thờ tướng Đề Truật và biểu tượng cây nỏ.", "Sân tế lễ dưới tán cây cổ thụ."] },
  "vat-the-9": { see: ["Các bia mộ khắc tên, cấp bậc sĩ quan và binh lính Pháp tử trận trong chiến tranh Yên Thế.", "Nằm cạnh đồn Nhã Nam trên đồi Phủ; nên đi cùng tuyến tham quan số 3."] },
  "vat-the-10": { see: ["Ban thờ Cả Trọng (Hoàng Đức Trọng), con trai cả của Hoàng Hoa Thám.", "Cùng khu vực với đền Gốc Khế (chung một điểm định vị trên bản đồ của Ban biên tập)."] },
  "vat-the-11": { see: ["Đường hầm cụ Cai Hậu cho đào từ hậu cung ra bờ ao cho nghĩa quân.", "Kết cấu gỗ lim của ngôi đình thời Lê.", "Sân đình là nơi CLB Chèo Dương Lâm tập luyện, biểu diễn."] },
  "vat-the-12": { see: ["Vì nóc chồng rường giá chiêng, cột gỗ lim.", "Kiệu thờ, hương án cổ, hoành phi câu đối sơn son thếp vàng."] },
  "vat-the-13": { see: ["Tường gạch chỉ, mái ngói mũi hài của ngôi đình thời Nguyễn.", "Bát hương gốm cổ, hoành phi câu đối."] },
  "vat-the-14": { see: ["Cấu kiện gỗ chạm hoa cúc dây, rồng chầu mặt trời.", "Ngai thờ và sắc phong cổ."] },
  "vat-the-15": { see: ["Tượng Phật sơn son thếp vàng, bia ký và chuông đồng cổ.", "Làng Dương Sơn có tục nói phét; biển \"Dương Sơn hội quán\" ở điếm làng."] },
  "vat-the-16": { see: ["Sắc phong niên hiệu Duy Tân thứ 3 (1909).", "Bát hương gốm Phù Lãng, sập thờ và bộ bát bửu.", "Đình chung của 5 thôn Chài, Quân, Đồn, Thượng, Phố."] },
  "phi-vat-the-1": { when: "Từ ngày 15–17/3 dương lịch hằng năm (từ năm 2025 mở rộng thành Tuần lễ hội 11–18/3 dương lịch); hội làng vào tháng Giêng và tháng Ba âm lịch.", see: ["Lễ tế cờ tái hiện tại sân đình Hả.", "Lễ rước kiệu từ các thôn và lễ dâng hương.", "Phần hội: đấu vật, kéo co, cờ tướng, văn nghệ quần chúng."] },
  "phi-vat-the-2": { when: "Các dịp lễ hội mùa xuân và ngày hội Đại đoàn kết toàn dân tộc.", see: ["Chiếu chèo sân đình Dương Lâm, đình Chuông, chùa Tứ Giáp.", "Các điệu Đào liễu, Quân thư, Luyện năm cung, Tò vò.", "Buổi tập định kỳ của CLB Chèo Dương Lâm."] },
  "phi-vat-the-3": { when: "Dịp Tết Nguyên đán, khi các gia đình làm bánh khảo, kẹo lạc để dâng cúng.", see: ["Công đoạn đóng khuôn gỗ bột nếp rang xay.", "Nấu mạch nha, thả lạc rang, dàn mỏng rồi cắt kẹo."] },
  "phi-vat-the-4": { when: "Ngày rằm, mùng một và ngày giỗ trận.", see: ["Lễ thắp hương tại đình Hả, đền Gốc Khế, đền Đề Truật.", "Lễ dâng hương báo công của học sinh THPT."] },
  "phi-vat-the-5": { when: "Đầu xuân và trong lễ hội khởi nghĩa Yên Thế (quanh 15–16/3 dương lịch).", see: ["Sới vật dân tộc đầu xuân.", "Cờ người, kéo co, đập niêu, giao lưu võ cổ truyền."] },
  "phi-vat-the-6": { see: ["Điếm làng với biển lưu niệm \"Dương Sơn hội quán\".", "Gặp các bô lão kể chuyện phét lúc nông nhàn; xem trước video tiểu phẩm trên trang này."] },
  "phi-vat-the-7": { when: "Hội làng mùa xuân và các chương trình dâng hương tại Khu lưu niệm Sáu điều Bác Hồ dạy CAND.", see: ["Lối hát vang, rền, nền, nảy của câu Quan họ cổ.", "Buổi truyền dạy cho học sinh của CLB."] },
  "phi-vat-the-8": { see: ["Buổi tập tại nhà văn hóa thôn, sân đình Dương Lâm và hội trường xã.", "Tiết mục múa nón và các tiết mục dàn dựng cho hội diễn."] }
};

/** Câu hỏi nhanh bổ sung cho các hồ sơ được người dùng quan tâm nhất (ngoài câu tự sinh từ dữ liệu). */
const MINI_QUIZ_EXTRA = {
  "vat-the-1": [{ q: "Chùa Hả có tên chữ là gì?", options: ["Thanh Âm tự", "Đại Phúc tự", "Nam Thiên tự", "Diên Hựu tự"], answer: 0, explain: "Chùa Hả tên chữ là Thanh Âm tự. Đại Phúc tự là chùa Tứ Giáp; Nam Thiên tự là chùa Phố." }],
  "vat-the-2": [{ q: "Chùa Tứ Giáp còn lưu giữ bia đá mang niên hiệu nào?", options: ["Duy Tân (1909)", "Cảnh Hưng (1771)", "Tự Đức (1848)", "Bảo Đại (1926)"], answer: 1, explain: "Bia đá niên hiệu Cảnh Hưng (1771). Sắc phong Duy Tân thứ 3 (1909) là của đình làng Sặt." }],
  "phi-vat-the-1": [{ q: "Phần chính của lễ hội khởi nghĩa Yên Thế tại Nhã Nam diễn ra quanh ngày nào (dương lịch)?", options: ["11/3", "15–16/3", "1/7", "2/9"], answer: 1, explain: "Quanh ngày 15–16/3 dương lịch, kỷ niệm ngày Đề Nắm tế cờ tại đình Hả (16/3/1884). Ngày 11/3/1948 là ngày Bác Hồ gửi thư cho Công an Khu XII." }],
  "phi-vat-the-2": [{ q: "Điệu nào dưới đây được hồ sơ nêu là điệu của chiếu chèo Nhã Nam?", options: ["Hò kéo pháo", "Lý cây đa", "Luyện năm cung", "Ru con Nam Bộ"], answer: 2, explain: "Hồ sơ nêu các điệu Đào liễu, Quân thư, Luyện năm cung, Tò vò." }],
  "phi-vat-the-6": [
    { q: "Theo hồ sơ, lối nói phét ở Dương Sơn sinh ra từ đâu?", options: ["Các cuộc thi hùng biện của nhà nước", "Lễ tế cờ khởi nghĩa Yên Thế", "Lúc làm đồng, kể chuyện phóng đại cho quên mệt", "Các phường chèo chuyên nghiệp"], answer: 2, explain: "Nói phét là lối kể chuyện phóng đại để mua vui, sinh ra trong lao động của người làm ruộng." },
    { q: "Câu ca \"… nói phét có ca / Dương Sơn nói phét bằng ba …\" so Dương Sơn với làng nào?", options: ["Dương Lâm", "Hòa Làng", "Cầu Thượng", "Đồng Điều"], answer: 1, explain: "\"Hòa Làng nói phét có ca / Dương Sơn nói phét bằng ba Hòa Làng\"." }
  ]
};
