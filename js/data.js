/**
 * ====================================================================
 * DI SẢN VĂN HÓA XÃ NHÃ NAM - DỮ LIỆU CẤU HÌNH & HỆ THỐNG DI SẢN
 * Xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang, Việt Nam
 * Đơn vị khởi xướng & phối hợp: Trường THPT Nhã Nam
 * Cập nhật chuẩn hóa theo Báo cáo di tích phục vụ HĐND Xã Nhã Nam & tư liệu địa phương
 * ====================================================================
 */

const SITE_CONFIG = {
  portalName: "Di Sản Văn Hóa Xã Nhã Nam",
  portalSubtitle: "Cổng Thông Tin Số Hóa Di Sản Văn Hóa & Lịch Sử Địa Phương",
  schoolName: "Trường THPT Nhã Nam",
  commune: "Xã Nhã Nam",
  district: "Huyện Tân Yên",
  province: "Tỉnh Bắc Giang",
  schoolTarget: "Dành cho học sinh Trường THPT Nhã Nam, các trường THCS, Tiểu học, thầy cô giáo và nhân dân",
  logoUrl: "./logo-thpt-nha-nam.png",
  
  // Facebook Group Community Configuration
  facebookGroupUrl: "#", 
  facebookGroupStatusNote: "Nhóm có bật chế độ kiểm duyệt bài viết để đảm bảo môi trường học tập văn minh, an toàn cho học sinh",

  // Administrator & Contact Configuration
  adminRole: "Ban điều hành dự án & Quản trị nội dung",
  adminName: "Cô Mến & Nhóm phụ trách Di sản THPT Nhã Nam",
  adminPhone: "0962.629.650",
  adminPhoneRaw: "0962629650",
  adminZaloUrl: "https://zalo.me/0962629650",
  adminEmail: "thptnhanam.disan@gmail.com",
  adminAddress: "Trường THPT Nhã Nam, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang"
};

/**
 * --------------------------------------------------------------------
 * DANH SÁCH BÀI HÁT TRÊN THANH ĐIỀU HƯỚNG (HEADER AUDIO PLAYLIST)
 * --------------------------------------------------------------------
 */
const MUSIC_PLAYLIST = [
  {
    id: "nha-nam-trong-toi",
    title: "Nhã Nam Trong Tôi",
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
 * 2. Địa chỉ (Xã Nhã Nam, Bắc Giang)
 * 3. Nội dung về di tích (Lịch sử, kiến trúc, sự kiện)
 * 4. Chỉ dẫn Google Map (embedUrl + directionsUrl)
 * 5. Ảnh về di tích (gallery)
 * --------------------------------------------------------------------
 */
const TANGIBLE_HERITAGE_DATA = [
  {
    id: "vat-the-1",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Khu di tích Đình - Chùa Hả",
    shortTitle: "Đình - Chùa Hả",
    address: "Thôn Hả, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    tags: ["Đình Hả", "Chùa Hả", "Đề Nắm", "Lương Văn Nắm", "Khởi nghĩa Yên Thế", "Tế cờ 1884", "Di tích Quốc gia đặc biệt", "Thôn Hả", "Nhã Nam"],
    overview: "Nơi thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ ngày 16/3/1884, chính thức phát động cuộc Khởi nghĩa Yên Thế oanh liệt chống thực dân Pháp.",
    
    content: {
      intro: "Khu di tích Đình - Chùa Hả tọa lạc tại thôn Hả, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang (nguyên thuộc xã Tân Trung trước khi sáp nhập). Đây là một trong những 'địa chỉ đỏ' quan trọng bậc nhất trong hệ thống Di tích Quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế, gắn liền với tên tuổi người anh hùng thủ lĩnh áo vải Lương Văn Nắm.",
      historicalSignificance: [
        "**Nơi tế cờ phát động Khởi nghĩa Yên Thế (16/3/1884):** Ngày 16 tháng 3 năm 1884 (năm Giáp Thân), tại sân đình Hả, thủ lĩnh Lương Văn Nắm (tức Đề Nắm) cùng các nghĩa sĩ ưu tú đã làm lễ tế cờ, cắt máu ăn thề, chính thức dựng cờ khởi nghĩa Yên Thế, mở đầu bản anh hùng ca kháng Pháp trường kỳ gần 30 năm (1884 - 1913).",
        "**Đại bản doanh buổi đầu của nghĩa quân:** Đình Hả là trung tâm hội tụ nhân tài, vũ khí, lương thảo và bàn thảo các kế sách quân sự đánh bại nhiều đợt hành quân càn quét ác liệt của đạo quân viễn chinh Pháp.",
        "**Xếp hạng Di tích Quốc gia đặc biệt:** Với những giá trị lịch sử vô giá, Đình - Chùa Hả đã được Thủ tướng Chính phủ xếp hạng là Di tích Quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg ngày 10/5/2012.",
        "**Công tác bảo tồn:** Giai đoạn 2023 - 2024, di tích đã được đầu tư tu bổ, tôn tạo quy mô lớn với kinh phí gần 8,5 tỷ đồng từ ngân sách nhà nước và nhân dân đóng góp, giữ vững nét cổ kính uy nghiêm."
      ],
      architecture: [
        "Đình Hả thờ Thành hoàng làng Cao Sơn - Quý Minh đại vương, những vị thần có công bảo quốc an dân.",
        "Kiến trúc đình hình chữ Đinh (丁) truyền thống, gồm 5 gian Tiền tế và 2 gian Hậu cung vững chãi.",
        "Bộ khung gỗ lim cổ thụ vững chãi, các vì kèo kết cấu chồng rường giá chiêng với những mảng chạm khắc rồng, lân, hoa cúc dây sinh động mang đậm phong cách nghệ thuật thời Nguyễn.",
        "Chùa Hả (tên chữ 'Thanh Âm Tự') nằm liền kề bên đình, rợp bóng cây cổ thụ, lưu giữ hệ thống tượng Phật cổ sơn son thếp vàng, chuông đồng và các văn bia ghi lại quá trình trùng tu từ thời Lê - Nguyễn."
      ],
      studyNote: "Đối với thế hệ trẻ và học sinh Trường THPT Nhã Nam: Đình - Chùa Hả là cội nguồn của tinh thần quật cường Yên Thế, là bài học đầu tiên về lòng yêu nước nồng nàn và ý chí bất khuất trước quân thù."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Hả,+Thôn+Hả,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Khu di tích Đình - Chùa Hả (Di tích Quốc gia đặc biệt)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
        caption: "Toàn cảnh sân đình Hả - nơi chứng kiến lễ tế cờ lịch sử ngày 16/3/1884 mở đầu Khởi nghĩa Yên Thế"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Hệ thống mái ngói mũi hài rêu phong và đầu đao cong vút thanh thoát của đình Hả"
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
        caption: "Chùa Hả (Thanh Âm Tự) thanh tịnh nằm liền kề trong quần thể di tích quốc gia đặc biệt"
      }
    ]
  },

  {
    id: "vat-the-2",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia",
    title: "Cụm di tích Đình - Chùa Tứ Giáp",
    shortTitle: "Chùa Tứ Giáp (Đại Phúc Tự)",
    address: "Tổ dân phố Chùa Nguộn, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    tags: ["Chùa Tứ Giáp", "Sáu điều Bác Hồ dạy", "Công an nhân dân", "Đại Phúc Tự", "Làng Nguộn", "Yên Thế", "Xã Nhã Nam"],
    overview: "Nơi phát tích lịch sử thiêng liêng ra đời Sáu điều Bác Hồ dạy Công an nhân dân ngày 11/3/1948, Di tích Lịch sử cấp Quốc gia.",
    
    content: {
      intro: "Chùa Tứ Giáp (tên chữ là Đại Phúc Tự, thường gọi là chùa Làng Nguộn) tọa lạc uy nghiêm tại thôn Chùa Nguộn, xã Nhã Nam. Ngôi chùa không chỉ là trung tâm tín ngưỡng Phật giáo lâu đời từ thế kỷ XVIII thời hậu Lê (trùng tu lớn năm 1886 thời Nguyễn) mà còn là 'địa chỉ đỏ' cách mạng rực rỡ của toàn quốc.",
      historicalSignificance: [
        "**Nơi phát tích Sáu điều Bác Hồ dạy Công an Nhân dân:** Trong kháng chiến chống thực dân Pháp (1946 - 1948), chùa Tứ Giáp là trụ sở đóng quân và làm việc của Công an Khu XII (phụ trách các tỉnh Lạng Sơn, Bắc Giang, Bắc Ninh, Hải Ninh, Quảng Yên).",
        "**Bức thư lịch sử ngày 11/3/1948:** Nhận được báo Tết 'Bạn Dân' do đồng chí Hoàng Mai (Giám đốc Công an Khu XII) kính biếu, Chủ tịch Hồ Chí Minh đã gửi bức thư lịch sử căn dặn về 'Tư cách người Công an cách mệnh'. Từ đó, Sáu lời dạy thiêng liêng đã trở thành kim chỉ nam rèn luyện của mọi thế hệ chiến sĩ CAND Việt Nam.",
        "**Xếp hạng di tích:** Chùa Tứ Giáp đã được xếp hạng Di tích Lịch sử - Nghệ thuật cấp Quốc gia, là niềm tự hào lớn của nhân dân xã Nhã Nam."
      ],
      architecture: [
        "Kiến trúc truyền thống kiểu tiền chữ Nhất (-), hậu chữ Đinh (丁) vững chãi, tường gạch cổ, mái lợp ngói mũi hài thanh thoát.",
        "Hệ thống cột gỗ lim chắc khỏe, vì kèo kết cấu con chồng giá chiêng được chạm trổ hoa lá, rồng mây tinh tế.",
        "Lưu giữ nhiều bảo vật quý: bia đá niên hiệu Cảnh Hưng (1771), chuông đồng đúc thế kỷ XIX, các pho tượng Phật sơn son thếp vàng cổ kính.",
        "Khuôn viên hiện nay được mở rộng xây dựng Khu lưu niệm Sáu điều Bác Hồ dạy CAND với tượng đài Bác Hồ trang nghiêm, hoa viên xanh mát và nhà truyền thống giáo dục thế hệ trẻ."
      ],
      studyNote: "Đối với học sinh Trường THPT Nhã Nam: Chùa Tứ Giáp là bài học thực tế sống động nhất về lòng yêu nước, đạo đức chí công vô tư và sự tri ân các anh hùng liệt sĩ cách mạng của quê hương Tân Yên."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%C3%B9a+T%E1%BB%A9+Gi%C3%A1p,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Tứ+Giáp,+Tổ+dân+phố+Chùa+Nguộn,+xã+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Chùa Tứ Giáp & Khu lưu niệm Sáu điều Bác Hồ dạy CAND"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
        caption: "Toàn cảnh tam quan và khuôn viên thanh tịnh rợp bóng cây xanh tại chùa Tứ Giáp"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Nét chạm khắc rồng phượng tinh xảo trên bờ nóc mái chùa cổ Đại Phúc Tự"
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
        caption: "Khuôn viên lưu niệm trang nghiêm - nơi tổ chức các lễ báo công dâng Bác"
      }
    ]
  },

  {
    id: "vat-the-3",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Lịch sử Cách mạng",
    title: "Di tích Lịch sử Thôn Đồng Điều",
    shortTitle: "Chùa Đồng Điều (Căn cứ cách mạng)",
    address: "Thôn Đồng Điều, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    tags: ["Thôn Đồng Điều", "Chùa Đồng Điều", "Chi bộ Đảng đầu tiên", "Lịch sử Cách mạng", "Tân Yên", "Xã Nhã Nam"],
    overview: "Nơi thành lập Chi bộ Đảng Cộng sản đầu tiên của huyện Tân Yên cũ, mốc son chói lọi trong phong trào giải phóng dân tộc tại địa phương.",
    
    content: {
      intro: "Di tích Lịch sử Thôn Đồng Điều (trung tâm là chùa Đồng Điều) thuộc xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang. Đây là cái nôi cách mạng hào hùng, nơi ươm mầm và chứng kiến sự ra đời của Chi bộ Đảng Cộng sản đầu tiên trên địa bàn huyện Tân Yên cũ, mở ra thời kỳ đấu tranh cách mạng có tổ chức dưới sự lãnh đạo quang vinh của Đảng.",
      historicalSignificance: [
        "**Nơi thành lập Chi bộ Đảng đầu tiên của huyện Tân Yên:** Trước Cách mạng Tháng Tám năm 1945, thôn Đồng Điều là cơ sở cách mạng bí mật an toàn. Tại đây, những người con ưu tú của quê hương đã được giác ngộ lý tưởng cộng sản, thành lập chi bộ Đảng đầu tiên, trực tiếp lãnh đạo quần chúng nhân dân vùng lên phá kho thóc Nhật, đánh đuổi giặc Pháp và giành chính quyền về tay nhân dân.",
        "**Căn cứ nuôi giấu cán bộ xứ ủy Bắc Kỳ:** Nhiều cán bộ cao cấp của Đảng và các đội tuyên truyền cứu quốc quân đã dừng chân, hoạt động bí mật tại Đồng Điều nhờ sự đùm bọc, chở che kiên trung của đồng bào và bà con giáo dân nơi đây.",
        "**Xếp hạng di tích:** Di tích đã được Chủ tịch UBND tỉnh xếp hạng Di tích Lịch sử - Văn hóa cấp Tỉnh, hiện đang tiếp tục được bảo tồn và hoàn thành tôn tạo giai đoạn 2."
      ],
      architecture: [
        "Chùa Đồng Điều mang nét kiến trúc tâm linh thôn dã truyền thống vùng đồng bằng trung du Bắc Bộ.",
        "Khung nhà bằng gỗ mộc mạc, mái ngói cổ rêu phong, kết cấu vững chắc hài hòa cùng cảnh quan làng xóm trù phú.",
        "Nơi đây lưu giữ nhiều hiện vật quý, bia ghi công tích cách mạng và các chứng tích lịch sử của phong trào kháng chiến chống thực dân Pháp."
      ],
      studyNote: "Đối với học sinh: Di tích Thôn Đồng Điều là minh chứng hùng hồn cho truyền thống kiên cường cách mạng, lòng son sắt một dạ theo Đảng của nhân dân xã Nhã Nam qua các thời kỳ kháng chiến."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%C3%B9a+%C4%90%E1%BB%93ng+%C4%90i%E1%BB%81u,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Đồng+Điều,+Thôn+Đồng+Điều,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Di tích Lịch sử Thôn Đồng Điều (Chi bộ Đảng đầu tiên)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
        caption: "Toàn cảnh di tích lịch sử cách mạng chùa Đồng Điều - xã Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Mái chùa rêu phong cổ kính gắn liền với những năm tháng hoạt động bí mật của cách mạng"
      }
    ]
  },

  {
    id: "vat-the-4",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Đền Gốc Khế",
    shortTitle: "Đền Gốc Khế",
    address: "Tổ dân phố Cầu Thượng, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    tags: ["Đền Gốc Khế", "Rừng Gốc Khế", "Hoàng Hoa Thám", "Khởi nghĩa Yên Thế", "Căn cứ", "Di tích Quốc gia đặc biệt", "Cầu Thượng"],
    overview: "Địa điểm lịch sử ghi dấu căn cứ quan trọng và các trận đánh oai hùng của nghĩa quân Yên Thế, Di tích Quốc gia đặc biệt.",
    
    content: {
      intro: "Đền Gốc Khế tọa lạc tại thôn Cầu Thượng, xã Nhã Nam, huyện Tân Yên. Di tích nằm trong quần thể Di tích Quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế, gắn liền với khu Rừng Gốc Khế hiểm trở - nơi từng chứng kiến nhiều hội nghị quân sự bí mật và các trận chiến chặn giặc oai hùng của nghĩa quân Hoàng Hoa Thám.",
      historicalSignificance: [
        "**Căn cứ tiền tiêu của phong trào Yên Thế:** Khu vực Đền Gốc Khế nằm ở vị trí yết hầu cửa ngõ vào vùng căn cứ Đồn Nhã Nam và Phủ Yên Thế. Dưới sự chỉ huy của Đề Thám và các tướng lĩnh, nơi đây là trạm tiền tiêu trinh sát nắm bắt tình hình di chuyển của quân đội viễn chinh Pháp.",
        "**Nơi tưởng niệm các nghĩa sĩ bất khuất:** Nhân dân làng Cầu Thượng đã lập đền thờ tại khu rừng Gốc Khế để tưởng nhớ công đức các thủ lĩnh nghĩa quân Yên Thế và các anh hùng nghĩa sĩ đã anh dũng hy sinh vì độc lập dân tộc.",
        "**Dự án tu bổ tôn tạo lớn:** Được sự quan tâm của nhà nước và nhân dân, Đền Gốc Khế đã được triển khai dự án tu bổ quy mô: đền chính, nghi môn, lầu hóa vàng, nhà thủ từ và bia ghi chiến tích khang trang, tôn nghiêm."
      ],
      architecture: [
        "Đền chính được phục dựng theo phong cách kiến trúc cổ truyền dân tộc: kết cấu khung gỗ lim, mái lợp ngói mũi hài, đắp nổi đôi rồng chầu mặt nguyệt oai nghiêm.",
        "Bên trong đền bày trí ban thờ Uy linh Tiên thánh và Anh hùng nghĩa quân Hoàng Hoa Thám với đồ thờ sơn son thếp vàng, hoành phi câu đối ca ngợi khí tiết kiên cường.",
        "Khuôn viên có tấm bia đá ghi tạc chiến tích sự kiện lịch sử, bao quanh là vườn cây lưu niệm rợp bóng mát thanh bình."
      ],
      studyNote: "Đền Gốc Khế nhắc nhở các bạn học sinh về sự mưu trí, dũng cảm và tinh thần dựa vào lòng dân để chống giặc ngoại xâm của thế hệ cha anh đi trước."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%81n+G%E1%BB%91c+Kh%E1%BA%BF,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đền+Gốc+Khế,+Tổ+dân+phố+Cầu+Thượng,+xã+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Đền Gốc Khế & Rừng Gốc Khế Lịch Sử"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
        caption: "Cổng nghi môn và đền chính Đền Gốc Khế uy nghiêm giữa bóng cây xanh ngát"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Nét đắp nổi long chầu mặt nguyệt cổ kính trên mái ngói đền Gốc Khế"
      }
    ]
  },

  {
    id: "vat-the-5",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Đồn Nhã Nam - Đồi Phủ & Nghĩa Địa Pháp",
    shortTitle: "Đồi Phủ Nhã Nam",
    address: "Đồi Phủ, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
    tags: ["Đồi Phủ", "Đồn Nhã Nam", "Nghĩa địa Pháp", "Phủ Yên Thế", "Thực dân Pháp", "Di tích Quốc gia đặc biệt"],
    overview: "Căn cứ chỉ huy đầu não của quân đội viễn chinh Pháp thời thuộc địa, minh chứng lịch sử cho sự thất bại của thực dân trước phong trào Yên Thế.",
    
    content: {
      intro: "Đồn Nhã Nam (hay Đồi Phủ Nhã Nam) tọa lạc trên một quả đồi cao khống chế toàn bộ ngã tư Nhã Nam. Từ năm 1885 trở đi, thực dân Pháp đã biến nơi đây thành đại bản doanh quân sự khét tiếng để chỉ huy toàn bộ các cuộc hành quân càn quét đàn áp cuộc Khởi nghĩa Yên Thế.",
      historicalSignificance: [
        "**Đại bản doanh thực dân Pháp tại Yên Thế (1885):** Để đối phó với nghĩa quân của thủ lĩnh Lương Văn Nắm và sau này là Đề Thám, thực dân Pháp đã thiết lập đồn bốt kiên cố và đặt Tòa đại lý Phủ Yên Thế tại đây. Từ Đồn Nhã Nam, các tướng Pháp như Frey, Godin, Blieđơlin đã xuất quân đàn áp các trận Làng Mạc (1885), Làng Sặt (1889), Cao Thượng (1890)... nhưng đều vấp phải sự kháng cự kiên cường.",
        "**Nghĩa địa Pháp - Nơi chôn cùi tham vọng xâm lược:** Cạnh Đồn Nhã Nam có khu Nghĩa địa Pháp, nơi chôn cất nhiều sĩ quan, binh lính Pháp và lê dương tử trận tại chiến trường Yên Thế, tiêu biểu có bia mộ quan hai BEQVET Alexisz tử trận ngày 25/3/1892 khi tấn công đồn Đề Dương.",
        "**Bằng chứng lịch sử sống động:** Đồi Phủ Nhã Nam là di tích đặc biệt ghi nhận thắng lợi oanh liệt về ý chí quật cường của nghĩa quân Yên Thế trước quân đội xâm lược thiện chiến."
      ],
      architecture: [
        "Đồn được xây dựng bằng gạch dày, tường đá kiên cố, có lỗ châu mai quan sát và hào sâu bao bọc theo sườn đồi.",
        "Hiện nay di tích còn lưu giữ nhiều dấu tích nền móng đồn lũy, tường thành bằng đá cuội ong, cùng các văn bia Pháp cổ bằng đá hoa cương xám.",
        "Không gian Đồi Phủ được quy hoạch thành công viên lịch sử râm mát, nơi đặt đài tưởng niệm và các công trình văn hóa công cộng phục vụ nhân dân."
      ],
      studyNote: "Di tích nhắc nhở thế hệ hôm nay rằng: Mọi thế lực xâm lăng dù vũ khí hiện đại đến đâu cũng đều phải thất bại trước tinh thần yêu nước quật khởi của dân tộc Việt Nam."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%93i+Ph%E1%BB%A7+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đồi+Phủ+Nhã+Nam,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Đồn Nhã Nam - Đồi Phủ & Nghĩa Địa Pháp"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
        caption: "Toàn cảnh đỉnh Đồi Phủ cao lộng gió nhìn bao quát toàn bộ vùng đất Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Bia đá chứng tích lịch sử thời Pháp thuộc được gìn giữ cẩn trọng tại di tích"
      }
    ]
  },

  {
    id: "vat-the-6",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Đình Nhã Nam (Đình Làng Chuông)",
    shortTitle: "Đình Làng Chuông",
    address: "Thôn Tiến Phan 2, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    tags: ["Đình Nhã Nam", "Đình Làng Chuông", "Tiến Phan 2", "Hoàng Hoa Thám", "Khởi nghĩa Yên Thế", "Di tích Quốc gia đặc biệt"],
    overview: "Trung tâm văn hóa tín ngưỡng lớn của làng Chuông xưa, nơi Hoàng Hoa Thám họp bàn chỉ huy những trận đánh lớn chống thực dân Pháp.",
    
    content: {
      intro: "Đình làng Chuông (thường gọi là Đình Nhã Nam) tọa lạc tại thôn Tiến Phan 2, xã Nhã Nam, huyện Tân Yên. Đây là một trung tâm sinh hoạt văn hóa tín ngưỡng lớn của nhân dân làng Chuông xưa, được khởi dựng từ thời Lê Trung Hưng (thế kỷ XVIII) và được xếp hạng là Di tích Quốc gia đặc biệt thuộc cụm Những địa điểm Khởi nghĩa Yên Thế.",
      historicalSignificance: [
        "**Nơi họp bàn cơ mật của Hoàng Hoa Thám:** Trong những năm đầu của cuộc khởi nghĩa Yên Thế, cụ Đề Thám cùng các tướng lĩnh đã nhiều lần tổ chức các cuộc họp quan trọng tại đình làng Chuông, bàn định kế sách xuất quân đánh bại các đợt càn quét của quân Pháp.",
        "**Sự kiện năm 1892 trừng trị kẻ phản bội:** Sau khi thủ lĩnh Đề Nắm bị tên phản bội Đề Sặt mưu hại, cụ Đề Thám lên thay nắm quyền chỉ huy đã sai Đề Hậu cùng các dũng sĩ bắt sống Đề Sặt dẫn về đồn Hố Chuối tế cờ báo thù cho thủ lĩnh Đề Nắm, giữ nghiêm kỷ luật nghĩa quân.",
        "**Di tích Quốc gia đặc biệt:** Đình làng Chuông là minh chứng sống động cho sự gắn bó keo sơn giữa nhân dân làng Chuông với cuộc khởi nghĩa anh hùng."
      ],
      architecture: [
        "Đình khởi dựng vào thế kỷ XVIII, trùng tu lớn vào thời Tự Đức (1870) và Duy Tân (1910). Bố cục kiểu chữ Đinh (丁) gồm 5 gian Tiền tế và 2 gian Hậu cung rộng rãi.",
        "Mái đình lợp ngói mũi hài thanh thoát với 4 đầu đao uốn cong thanh thoát; bờ nóc đắp đôi rồng chầu mặt trời sinh động.",
        "Khung gỗ lim cổ kính, các đầu dư, kẻ chuyền, cốn mê được chạm khắc đề tài rồng ổ, phượng múa, hoa lá cách điệu với kỹ thuật chạm lộng, chạm thủng điêu luyện của bàn tay nghệ nhân xưa.",
        "Đình còn bảo lưu nhiều di vật quý: bia đá cổ, bát hương gốm Thổ Hà, kiệu bát cống, ngai thờ và 2 đạo sắc phong thời Nguyễn tri ân công đức tiền nhân."
      ],
      studyNote: "Đình làng Chuông là niềm tự hào sâu sắc của bà con thôn Tiến Phan 2 và học sinh xã Nhã Nam về nghệ thuật điêu khắc gỗ cổ truyền và truyền thống đánh giặc giữ làng."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Nhã+Nam,+Thôn+Tiến+Phan+2,+xã+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Đình Nhã Nam (Đình Làng Chuông)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
        caption: "Kiến trúc cổ kính với mái đao cong thanh thoát của đình làng Chuông - Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Nghệ thuật chạm khắc gỗ thời Lê - Nguyễn tinh xảo bên trong tiền tế đình làng Chuông"
      }
    ]
  },

  {
    id: "vat-the-7",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Chùa Nam Thiên (Chùa Phố Nhã Nam)",
    shortTitle: "Chùa Nam Thiên",
    address: "Tổ dân phố Tân Quang, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
    tags: ["Chùa Nam Thiên", "Chùa Phố", "Tân Quang", "Năm 1822", "Phật giáo", "Di tích Quốc gia đặc biệt"],
    overview: "Ngôi chùa cổ lập từ năm 1822, trung tâm Phật giáo lâu đời nằm trong quần thể Di tích Quốc gia đặc biệt tại Nhã Nam.",
    
    content: {
      intro: "Chùa Nam Thiên (tục gọi là chùa Phố) tọa lạc tại thôn Tân Quang, xã Nhã Nam, huyện Tân Yên. Chùa được xây dựng từ năm Nhâm Ngọ (1822) dưới thời vua Minh Mạng, ban đầu thuộc làng Cầu. Đến năm 1885, khi phố Nhã Nam hình thành, chùa được chuyển về phố và trở thành trung tâm tâm linh tiêu biểu của cả vùng.",
      historicalSignificance: [
        "**Lịch sử hơn 200 năm đồng hành cùng quê hương:** Chùa Nam Thiên được khởi dựng từ năm 1822, trùng tu lớn năm 1925. Trong kháng chiến chống Pháp năm 1947, tiền đường chùa từng bị bom giặc tàn phá, sau đó được dùng làm kho cất giấu lương thực phục vụ bộ đội.",
        "**Nơi nuôi giấu cán bộ và bộ đội thời kỳ kháng chiến:** Nhờ vị trí kín đáo và sự bảo bọc kiên cường của sư trụ trì cùng Phật tử, chùa Nam Thiên là cơ sở liên lạc tin cậy của nghĩa quân và bộ đội ta.",
        "**Di tích Quốc gia đặc biệt:** Chùa Nam Thiên vinh dự được xếp hạng là Di tích Quốc gia đặc biệt nằm trong cụm di tích Khởi nghĩa Yên Thế."
      ],
      architecture: [
        "Chùa tọa lạc trong khuôn viên thanh tịnh rợp bóng cây xanh cổ thụ, gồm Tòa Tiền đường, Thượng điện, Nhà Mẫu, Nhà Tổ và vườn tháp uy nghiêm.",
        "Hệ thống tượng Phật cổ sơn son thếp vàng tinh xảo, thể hiện phong cách tạo tác tượng thế kỷ XIX với nét mặt hiền từ, tĩnh tại.",
        "Lưu giữ quả chuông đồng cổ 'Nam Thiên Tự Chung' đúc thời Nguyễn, âm vang trầm ấm ngân vang khắp xóm làng mỗi sớm chiều."
      ],
      studyNote: "Chùa Nam Thiên là bài học sâu sắc về tinh thần hộ quốc an dân của Phật giáo Việt Nam trong công cuộc đấu tranh bảo vệ độc lập dân tộc."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%C3%B9a+Nam+Thi%C3%AAn,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Nam+Thiên,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Chùa Nam Thiên (Chùa Phố Nhã Nam)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
        caption: "Khuôn viên chùa Nam Thiên thanh tịnh rợp mát bóng cây cổ thụ giữa phố Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Gian thờ Phật trang nghiêm với các pho tượng sơn son thếp vàng cổ kính"
      }
    ]
  },

  {
    id: "vat-the-8",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Cấp Tỉnh",
    title: "Đền Đề Truật",
    shortTitle: "Đền Đề Truật",
    address: "Thôn Tiến Phan 1, xã Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    tags: ["Đền Đề Truật", "Dương Văn Truật", "Tướng bắn nỏ", "Khởi nghĩa Yên Thế", "Tiến Phan 1", "Di tích cấp tỉnh"],
    overview: "Ngôi đền thờ vị tướng tài ba Dương Văn Truật (Đề Truật) với tài bắn cung nỏ bách phát bách trúng trong nghĩa quân Yên Thế.",
    
    content: {
      intro: "Đền Đề Truật tọa lạc tại thôn Tiến Phan 1, xã Nhã Nam, huyện Tân Yên. Ngôi đền được nhân dân lập nên để tưởng niệm và tri ân công đức to lớn của tướng quân Dương Văn Truật (tục gọi là Đề Truật) - một trong những trụ cột quân sự dũng cảm và tài ba nhất dưới quyền thủ lĩnh Đề Nắm và Đề Thám.",
      historicalSignificance: [
        "**Tướng quân tài ba 'Bách phát bách trúng':** Đề Truật nổi danh khắp vùng Yên Thế bởi tài nghệ bắn cung nỏ tuyệt luân trăm phát trúng cả trăm. Trong các trận đánh giáp lá cà hay phục kích quân Pháp, cây nỏ của ông là nỗi khiếp sợ kinh hoàng của giặc xâm lược.",
        "**Trung kiên báo thù cho thủ lĩnh Đề Nắm:** Tháng 3 năm 1892, khi Đề Nắm bị tên phản bội Đề Sặt mưu sát, Đề Thám đã mật lệnh cho Đề Truật dẫn 12 nghĩa quân cảm tử về làng Sặt vây bắt tên phản trắc áp giải về đồn Hố Chuối đền mạng, giữ vững thanh danh nghĩa quân.",
        "**Tấm gương vì nước vì dân:** Đề Truật hy sinh nhưng khí phách kiên cường của ông vẫn sống mãi trong lòng dân làng Nhã Nam. Ngôi đền đã được xếp hạng Di tích Lịch sử cấp Tỉnh."
      ],
      architecture: [
        "Đền tọa lạc trên thế đất cao ráo, thoáng đãng, mang kiến trúc chữ Đinh truyền thống.",
        "Nội thất đền bài trí trang trọng ban thờ Tướng quân Đề Truật, lư hương đồng, gươm giáo và mô hình cây nỏ thần kỳ - biểu tượng chiến đấu bất khuất của ông.",
        "Khuôn viên có sân tế lễ râm mát và cây cổ thụ che phủ, là nơi sinh hoạt văn hóa truyền thống của nhân dân địa phương."
      ],
      studyNote: "Tấm gương quả cảm, tài năng quân sự và lòng trung thành tuyệt đối của tướng Đề Truật là ngọn lửa truyền cảm hứng mạnh mẽ cho học sinh Trường THPT Nhã Nam rèn luyện tài đức."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%81n+%C4%90%E1%BB%81+Tru%E1%BA%ADt,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đền+Đề+Truật,+Thôn+Tiến+Phan+1,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Đền Đề Truật (Di tích Lịch sử Cấp Tỉnh)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
        caption: "Đền thờ vị tướng tài ba Đề Truật - người con kiên trung của mảnh đất Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Bát hương cổ và gian thờ trang trọng bên trong đền Đề Truật"
      }
    ]
  }
];

/**
 * --------------------------------------------------------------------
 * DANH MỤC DI SẢN PHI VẬT THỂ (INTANGIBLE HERITAGE DATA - 5 DI SẢN TIÊU BIỂU)
 * --------------------------------------------------------------------
 */
const INTANGIBLE_HERITAGE_DATA = [
  {
    id: "phi-vat-the-1",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Lễ hội Truyền thống",
    title: "Lễ hội Khởi nghĩa Yên Thế tại Xã Nhã Nam",
    shortTitle: "Lễ hội Yên Thế tại Nhã Nam",
    scope: "Địa bàn toàn xã Nhã Nam (trọng tâm tại Đình - Chùa Hả, Chùa Tứ Giáp và Đồi Phủ)",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80",
    tags: ["Lễ hội Yên Thế", "Lễ hội Đình Hả", "Chùa Tứ Giáp", "16 tháng 3", "Tế cờ", "Lễ hội truyền thống", "Xã Nhã Nam"],
    overview: "Lễ hội truyền thống tưởng nhớ ngày thủ lĩnh Lương Văn Nắm tế cờ phát động khởi nghĩa ngày 16/3 và tri ân các anh hùng nghĩa sĩ Yên Thế.",
    
    content: {
      intro: "Lễ hội truyền thống tại xã Nhã Nam diễn ra vào tháng Giêng và tháng Ba âm lịch hàng năm (đặc biệt là ngày 15 - 16/3 dương lịch gắn với lễ hội Khởi nghĩa Yên Thế). Đây là ngày hội non sông tôn vinh hào khí quật cường của nghĩa quân áo vải và giáo dục truyền thống cách mạng cho muôn đời sau.",
      originAndMeaning: [
        "**Tưởng niệm ngày lễ tế cờ lịch sử 16/3/1884:** Tái hiện trang nghiêm nghi lễ cắt máu ăn thề của Đề Nắm và nghĩa quân tại sân đình Hả.",
        "**Tôn vinh thủ lĩnh Lương Văn Nắm và Hoàng Hoa Thám:** Khẳng định tầm vóc lịch sử của cuộc khởi nghĩa nông dân vĩ đại nhất cuối thế kỷ XIX - đầu thế kỷ XX.",
        "**Cố kết cộng đồng làng xã:** Dịp tụ hội của con em quê hương Nhã Nam khắp mọi miền đất nước trở về nguồn cội."
      ],
      ritualsAndActivities: [
        "**Phần lễ trang nghiêm:** Lễ rước kiệu truyền thống từ các làng thôn, lễ dâng hương tưởng niệm, lễ tế cờ tái hiện lịch sử hào hùng.",
        "**Phần hội tưng bừng:** Hội diễn văn nghệ quần chúng, thi đấu cờ tướng, kéo co, đấu vật dân tộc, giải bóng chuyền, hội chọi gà và các trò chơi dân gian đặc sắc."
      ],
      preservationValue: "Lễ hội là không gian văn hóa sống động kết nối các thế hệ học sinh trường THPT Nhã Nam với cội nguồn lịch sử oanh liệt của ông cha."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Hả,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Trung tâm Lễ hội Yên Thế tại Đình Hả - Xã Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
        caption: "Không khí lễ hội tưng bừng cờ hoa rực rỡ sắc màu truyền thống tại Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
        caption: "Đoàn rước kiệu trang nghiêm của các dòng họ tiến về sân đình dự hội"
      }
    ]
  },

  {
    id: "phi-vat-the-2",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Nghệ thuật Trình diễn Dân gian",
    title: "Nghệ thuật Hát Chèo truyền thống Xã Nhã Nam",
    shortTitle: "Hát Chèo Nhã Nam",
    scope: "Các câu lạc bộ Chèo tại các thôn: Làng Chuông, Chùa Nguộn, Cầu Thượng, xã Nhã Nam",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    tags: ["Hát Chèo", "Chiếu chèo", "Nghệ thuật truyền thống", "Dân ca", "Làng Chuông", "Xã Nhã Nam"],
    overview: "Di sản văn hóa phi vật thể đặc sắc, những làn điệu chèo mượt mà thắm đượm tình làng nghĩa xóm của người dân vùng đất Cầu Vồng.",
    
    content: {
      intro: "Nghệ thuật Hát Chèo từ lâu đã bén rễ sâu đậm trong đời sống tinh thần của nhân dân xã Nhã Nam. Những làn điệu chèo ngọt ngào, hóm hỉnh mà sâu lắng đã nuôi dưỡng tâm hồn biết bao thế hệ người dân quê hương đất Cầu Vồng.",
      originAndMeaning: [
        "**Gắn liền chiếu chèo sân đình:** Ra đời từ các buổi sinh hoạt nông nhàn và hội làng cổ xưa tại đình làng Chuông, chùa Tứ Giáp.",
        "**Nội dung phản ánh cuộc sống:** Ngợi ca tình yêu quê hương, đất nước, đạo hiếu làm con, phê phán thói hư tật xấu và biểu dương lòng kiên trinh.",
        "**Đặc trưng chiếu chèo Nhã Nam:** Giữ được chất chèo cổ mộc mạc với các điệu Đào liễu, Quân thư, Luyện năm cung thắm thiết."
      ],
      ritualsAndActivities: [
        "Biểu diễn giao lưu tại sân đình vào mỗi dịp lễ hội mùa xuân, ngày hội Đại đoàn kết toàn dân tộc.",
        "Các câu lạc bộ chèo thường xuyên mở lớp truyền dạy làn điệu cho các em học sinh, thế hệ thanh thiếu niên địa phương."
      ],
      preservationValue: "Hát chèo là cây cầu nối tâm hồn, giáo dục tình yêu văn hóa dân tộc trong các hoạt động ngoại khóa của học sinh THPT Nhã Nam."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Nhã+Nam,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Chiếu Chèo Làng Chuông - Xã Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
        caption: "Các liền anh liền chị câu lạc bộ Chèo Nhã Nam trong trang phục tứ thân truyền thống"
      }
    ]
  },

  {
    id: "phi-vat-the-3",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Nghề Truyền thống",
    title: "Nghề làm bánh khảo, kẹo lạc truyền thống Xã Nhã Nam",
    shortTitle: "Bánh khảo & Kẹo lạc Nhã Nam",
    scope: "Các hộ gia đình nghệ nhân làm nghề truyền thống tại xã Nhã Nam",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    tags: ["Bánh khảo", "Kẹo lạc", "Nghề truyền thống", "Ẩm thực dân gian", "Đặc sản", "Xã Nhã Nam"],
    overview: "Đặc sản ẩm thực dân gian nức tiếng, thức quà quê mộc mạc thơm đượm hương vị gạo nếp cái hoa vàng và mật mía quê nhà.",
    
    content: {
      intro: "Bánh khảo và kẹo lạc Nhã Nam là thức quà ẩm thực truyền thống nức tiếng gần xa. Mỗi phong bánh khảo thơm dịu hương nếp, từng thanh kẹo lạc giòn tan bùi ngậy đã trở thành nét đẹp văn hóa gắn bó thiết thân với mâm cỗ Tết và lễ vật dâng cúng đình chùa của người dân xã Nhã Nam.",
      originAndMeaning: [
        "**Nét văn hóa hiếu nghĩa:** Bánh khảo, kẹo lạc là thức quà quý dâng cúng tổ tiên, trời đất trong các dịp Tết Nguyên đán và lễ hội cổ truyền.",
        "**Kế thừa tinh hoa ẩm thực:** Nguyên liệu được tuyển chọn từ gạo nếp cái hoa vàng hạt mẩy, lạc đồi thơm bùi của vùng đất đồi bãi Tân Yên kết hợp mật mía đường phèn tự nhiên."
      ],
      ritualsAndActivities: [
        "Quy trình tỉ mỉ: Rang gạo nếp vừa độ chín tới, xay mịn thành bột, ủ đường cho ngấu rồi đem đóng khuôn gỗ thủ công.",
        "Làm kẹo lạc: Nấu đường mạch nha sôi dẻo, thả lạc rang chín vàng đều, dàn mỏng trên mặt bàn rồi cắt thành thanh thơm giòn."
      ],
      preservationValue: "Gìn giữ hương vị cội nguồn của quê hương, khơi gợi niềm tự hào về sản vật nông nghiệp của địa phương trong các dự án học tập sáng tạo."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Làng nghề Bánh Khảo & Kẹo Lạc - Xã Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        caption: "Bánh khảo trắng tinh khôi đóng khuôn chữ Phúc - Lộc thơm mùi gạo nếp cái hoa vàng"
      }
    ]
  },

  {
    id: "phi-vat-the-4",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Tập quán Xã hội & Tín ngưỡng",
    title: "Tập quán tưởng niệm Lương Văn Nắm và Hoàng Hoa Thám",
    shortTitle: "Tưởng niệm nghĩa quân Yên Thế",
    scope: "Địa bàn toàn xã Nhã Nam, trung tâm tại Đình Hả, Đền Gốc Khế, Đền Đề Truật",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Lương Văn Nắm", "Hoàng Hoa Thám", "Đề Truật", "Tưởng niệm", "Tập quán tín ngưỡng", "Uống nước nhớ nguồn", "Xã Nhã Nam"],
    overview: "Tập quán tín ngưỡng tâm linh thành kính của nhân dân Nhã Nam đối với các vị thủ lĩnh và nghĩa sĩ hy sinh vì nền độc lập của Tổ quốc.",
    
    content: {
      intro: "Tập quán tưởng niệm thủ lĩnh Đề Nắm, cụ Hoàng Hoa Thám cùng các nghĩa binh Yên Thế là nét đẹp văn hóa tâm linh thấm đượm truyền thống 'Uống nước nhớ nguồn'. Qua hàng trăm năm dâu bể, nhân dân xã Nhã Nam vẫn gìn giữ vẹn nguyên lòng thành kính, đời đời hương khói tri ân những người con anh hùng của quê hương.",
      originAndMeaning: [
        "**Đạo lý tri ân ngàn đời:** Xuất phát từ lòng biết ơn vô hạn của người dân đối với những người đã xả thân cứu nước cứu làng.",
        "**Biểu tượng tinh thần độc lập:** Hình tượng Đề Nắm và Đề Thám trở thành biểu tượng tinh thần của ý chí không khuất phục trước ngoại bang."
      ],
      ritualsAndActivities: [
        "Nghi thức thắp hương tưởng niệm vào ngày rằm, mùng một và ngày giỗ trận tại đình Hả, đền Gốc Khế, đền Đề Truật.",
        "Lễ dâng hương báo công của học sinh trường THPT Nhã Nam trước thềm các kỳ thi và sự kiện trọng đại của nhà trường."
      ],
      preservationValue: "Là bài học đạo đức, lý tưởng cách mạng sâu sắc nhất cho đoàn viên, học sinh xã Nhã Nam trên con đường rèn đức luyện tài."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+H%E1%BA%A3,+T%C3%A2n+Trung,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Hả,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Khu tưởng niệm Nghĩa sĩ Yên Thế - Xã Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
        caption: "Nghi lễ dâng hương thành kính tri ân các anh hùng nghĩa sĩ tại di tích lịch sử"
      }
    ]
  },

  {
    id: "phi-vat-the-5",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Trò chơi Dân gian & Võ thuật",
    title: "Trò chơi dân gian & Võ cổ truyền trong lễ hội Nhã Nam",
    shortTitle: "Trò chơi dân gian & Võ cổ truyền",
    scope: "Không gian lễ hội truyền thống tại các thôn trong xã Nhã Nam",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
    tags: ["Võ cổ truyền", "Vật dân tộc", "Trò chơi dân gian", "Cờ người", "Kéo co", "Hội làng", "Xã Nhã Nam"],
    overview: "Kho tàng các thế võ Yên Thế anh hùng cùng các môn thể thao dân gian tráng kiện, thể hiện tinh thần thượng võ kiên cường của vùng đất Cầu Vồng.",
    
    content: {
      intro: "Vùng đất Nhã Nam - Tân Yên từ ngàn xưa đã nổi danh là 'đất Cầu Vồng' với tinh thần thượng võ ngút trời. Trong các dịp hội làng mùa xuân, các bài quyền võ cổ truyền, môn vật dân tộc và trò chơi dân gian luôn là tâm điểm thu hút đông đảo nam thanh nữ tú và bà con khắp vùng.",
      originAndMeaning: [
        "**Gắn với thao lược quân sự của nghĩa quân Yên Thế:** Nhiều bài võ thuật, đấu gậy, đấu nỏ cổ truyền bắt nguồn từ các bài tập luyện chiến đấu của nghĩa binh thời Đề Nắm, Đề Thám.",
        "**Rèn luyện sức khỏe và ý chí:** Tinh thần thượng võ 'đất Cầu Vồng' hun đúc nên lòng quả cảm, đức tính kiên nhẫn và sức bền bỉ cho người dân."
      ],
      ritualsAndActivities: [
        "Sới vật dân tộc đầu xuân: Tiếng trống thúc giục, các đô vật tranh tài quyết liệt trên nền cát mịn với tinh thần thượng võ mãnh liệt.",
        "Hội thi cờ người, kéo co, đập niêu đất, chọi gà và giao lưu võ thuật cổ truyền giữa các trường học và câu lạc bộ thanh niên."
      ],
      preservationValue: "Góp phần rèn luyện thể lực và bồi dưỡng lòng dũng cảm, tinh thần đồng đội cho học sinh thế hệ trẻ Trường THPT Nhã Nam."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sới+vật+lễ+hội,+xã+Nhã+Nam,+huyện+Tân+Yên,+tỉnh+Bắc+Giang",
      locationName: "Sới vật & Không gian Hội thao Dân gian - Xã Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80",
        caption: "Không khí tưng bừng hào hứng của sới vật dân gian truyền thống đầu xuân tại Nhã Nam"
      }
    ]
  }
];

/**
 * --------------------------------------------------------------------
 * BỘ CÂU HỎI TRẮC NGHIỆM TƯƠNG TÁC (QUIZ CHALLENGE - 5 CÂU HỎI)
 * Cập nhật các câu hỏi theo dữ liệu mới của Xã Nhã Nam
 * --------------------------------------------------------------------
 */
const HERITAGE_QUIZ_DATA = [
  {
    id: 1,
    question: "Ngày 16 tháng 3 năm 1884, sự kiện lịch sử trọng đại nào đã diễn ra tại Đình Hả (xã Nhã Nam)?",
    options: [
      "Thủ lĩnh Lương Văn Nắm (Đề Nắm) làm lễ tế cờ, chính thức phát động Khởi nghĩa Yên Thế",
      "Bác Hồ gửi thư khen cán bộ chiến sĩ Công an Khu XII",
      "Thực dân Pháp xây dựng xong Đồn Nhã Nam trên đỉnh Đồi Phủ",
      "Thành lập chi bộ Đảng Cộng sản đầu tiên của huyện Tân Yên"
    ],
    correctAnswer: 0,
    explanation: "Đúng! Ngày 16/3/1884, tại đình Hả, thủ lĩnh Lương Văn Nắm đã làm lễ tế cờ xuất quân khởi nghĩa, mở đầu 30 năm kháng chiến Yên Thế oanh liệt."
  },
  {
    id: 2,
    question: "Sáu điều Bác Hồ dạy Công an nhân dân được phát tích tại ngôi chùa nào ở xã Nhã Nam vào ngày 11/3/1948?",
    options: [
      "Chùa Nam Thiên (Chùa Phố)",
      "Chùa Tứ Giáp (Đại Phúc Tự)",
      "Chùa Đồng Điều",
      "Chùa Hả (Thanh Âm Tự)"
    ],
    correctAnswer: 1,
    explanation: "Chính xác! Tại chùa Tứ Giáp (trụ sở Công an Khu XII), bức thư lịch sử của Chủ tịch Hồ Chí Minh đã ra đời ngày 11/3/1948."
  },
  {
    id: 3,
    question: "Chi bộ Đảng Cộng sản đầu tiên của huyện Tân Yên cũ được thành lập tại thôn nào thuộc xã Nhã Nam?",
    options: [
      "Thôn Tiến Phan 1",
      "Thôn Cầu Thượng",
      "Thôn Đồng Điều",
      "Thôn Chùa Nguộn"
    ],
    correctAnswer: 2,
    explanation: "Chính xác! Thôn Đồng Điều (chùa Đồng Điều) là cái nôi cách mạng, nơi thành lập Chi bộ Đảng đầu tiên của địa phương."
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
    question: "Địa điểm Đồn Nhã Nam và Đồi Phủ gắn liền với dấu tích gì của quân đội viễn chinh Pháp thời bấy giờ?",
    options: [
      "Đại bản doanh chỉ huy của thực dân Pháp và khu Nghĩa địa Pháp",
      "Trụ sở đàm phán hòa hoãn lần thứ hai giữa Đề Thám và Pháp",
      "Xưởng chế tạo vũ khí nổ bí mật của nghĩa quân",
      "Kho dự trữ muối ăn của quân đội triều đình"
    ],
    correctAnswer: 0,
    explanation: "Chính xác! Đồn Nhã Nam trên Đồi Phủ từng là trung tâm chỉ huy quân sự khét tiếng của Pháp tại Yên Thế từ năm 1885."
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
  "Đình - Chùa Hả",
  "Chùa Tứ Giáp",
  "Thôn Đồng Điều",
  "Đền Gốc Khế",
  "Đồi Phủ Nhã Nam",
  "Đình Nhã Nam",
  "Chùa Nam Thiên",
  "Đền Đề Truật",
  "Đề Nắm",
  "Lương Văn Nắm",
  "Khởi nghĩa Yên Thế",
  "Hoàng Hoa Thám",
  "Sáu điều Bác Hồ dạy",
  "Hát Chèo",
  "Bánh khảo",
  "Kẹo lạc",
  "Võ cổ truyền"
];
