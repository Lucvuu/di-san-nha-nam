/**
 * ====================================================================
 * DI SẢN VĂN HÓA NHÃ NAM - DỮ LIỆU CẤU HÌNH & HỆ THỐNG DI SẢN
 * Thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang, Việt Nam
 * Đơn vị khởi xướng & phối hợp: Trường THPT Nhã Nam
 * ====================================================================
 */

const SITE_CONFIG = {
  portalName: "Di Sản Văn Hóa Nhã Nam",
  portalSubtitle: "Cổng Thông Tin Số Hóa Di Sản Văn Hóa & Lịch Sử Địa Phương",
  schoolName: "Trường THPT Nhã Nam",
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
  adminAddress: "Trường THPT Nhã Nam, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang"
};

/**
 * --------------------------------------------------------------------
 * DANH MỤC DI SẢN VẬT THỂ (TANGIBLE HERITAGE DATA)
 * Yêu cầu chi tiết hiển thị đúng 5 mục:
 * 1. Tên di tích
 * 2. Địa chỉ
 * 3. Nội dung về di tích
 * 4. Chỉ dẫn đi đến đó bằng Google Map (iframe + button chỉ đường)
 * 5. Ảnh về di tích (gallery kèm lightbox)
 * --------------------------------------------------------------------
 */
const TANGIBLE_HERITAGE_DATA = [
  {
    id: "vat-the-1",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Cụm di tích Đình - Chùa Tứ Giáp",
    shortTitle: "Chùa Tứ Giáp (Đại Phúc Tự)",
    address: "Tổ dân phố Chùa Nguộn, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    tags: ["Chùa Tứ Giáp", "Sáu điều Bác Hồ dạy", "Công an nhân dân", "Đại Phúc Tự", "Làng Nguộn", "Yên Thế"],
    overview: "Nơi phát tích lịch sử thiêng liêng ra đời Sáu điều Bác Hồ dạy Công an nhân dân ngày 11/3/1948, nằm trong hệ thống di tích Quốc gia đặc biệt.",
    
    content: {
      intro: "Chùa Tứ Giáp (tên chữ là Đại Phúc Tự, thường gọi là chùa Làng Nguộn) tọa lạc uy nghiêm tại tổ dân phố Chùa Nguộn, thị trấn Nhã Nam. Ngôi chùa không chỉ là trung tâm tín ngưỡng Phật giáo lâu đời từ thế kỷ XVIII thời hậu Lê (trùng tu lớn năm 1886 thời Nguyễn) mà còn là 'địa chỉ đỏ' cách mạng rực rỡ của toàn quốc.",
      historicalSignificance: [
        "**Nơi phát tích Sáu điều Bác Hồ dạy Công an Nhân dân:** Trong kháng chiến chống thực dân Pháp (1946 - 1948), chùa Tứ Giáp là trụ sở đóng quân và làm việc của Công an Khu XII (phụ trách các tỉnh Lạng Sơn, Bắc Giang, Bắc Ninh, Hải Ninh, Quảng Yên).",
        "**Bức thư lịch sử ngày 11/3/1948:** Nhận được báo Tết 'Bạn Dân' do đồng chí Hoàng Mai (Giám đốc Công an Khu XII) kính biếu, Chủ tịch Hồ Chí Minh đã gửi bức thư lịch sử căn dặn về 'Tư cách người Công an cách mệnh'. Từ đó, Sáu lời dạy thiêng liêng đã trở thành kim chỉ nam rèn luyện của mọi thế hệ chiến sĩ CAND Việt Nam.",
        "**Xếp hạng di tích:** Chùa Tứ Giáp đã được xếp hạng Di tích Lịch sử cấp Quốc gia và nằm trong quần thể Di tích quốc gia đặc biệt Những địa điểm Khởi nghĩa Yên Thế."
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
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Tứ+Giáp,+Tổ+dân+phố+Chùa+Nguộn,+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
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
    id: "vat-the-2",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Đền Gốc Khế",
    shortTitle: "Đền Gốc Khế Nhã Nam",
    address: "Tổ dân phố Cầu Thượng, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80",
    tags: ["Đền Gốc Khế", "Khởi nghĩa Yên Thế", "Hoàng Hoa Thám", "Trần Hưng Đạo", "Đề Thám", "Cầu Thượng"],
    overview: "Căn cứ bí mật tiền tiêu, nơi hội họp quân cơ của các tướng lĩnh nghĩa quân Hoàng Hoa Thám trong cuộc Khởi nghĩa Yên Thế rạng danh non sông.",

    content: {
      intro: "Đền Gốc Khế nằm nép mình uy nghiêm dưới những bóng cây đại thụ tại thị trấn Nhã Nam. Ngôi đền gắn liền với tên gọi dân dã bởi phía trước đền từng có cây khế cổ thụ xum xuê cành lá hàng trăm năm tuổi, là nhân chứng lịch sử cho những năm tháng chiến đấu kiên cường của nhân dân Yên Thế.",
      historicalSignificance: [
        "**Nơi hội họp và xuất quân của nghĩa binh Yên Thế:** Trong giai đoạn ác liệt của cuộc khởi nghĩa Yên Thế (1892 - 1894), Đền Gốc Khế là trạm liên lạc tiền tiêu và là địa điểm họp bàn chiến sự tối mật của chủ tướng Hoàng Hoa Thám cùng các danh tướng kiệt xuất như Đề Công (Tạ Văn Công), Đề Nguyên (Tạ Văn Nguyên), Đề Cần (Tạ Văn Cần), Thống Ngò (Tạ Văn Khấu), Quản Khối (Giáp Văn Khối)...",
        "**Điểm tựa tâm linh vững chắc:** Trước mỗi trận đánh lớn đối đầu quân viễn chinh Pháp, nghĩa quân thường làm lễ tuyên thệ, tế cờ tại đền, cầu nguyện quốc thái dân an và quyết tâm giữ trọn bờ cõi giang sơn.",
        "**Tín ngưỡng thờ phụng:** Đền thờ phụng Đức Thánh Trần (Hưng Đạo Đại Vương Trần Quốc Tuấn) - vị anh hùng dân tộc ba lần đại phá quân Nguyên Mông, cùng Tam Tòa Thánh Mẫu linh thiêng."
      ],
      architecture: [
        "Quy mô đền vừa phải nhưng thâm nghiêm, mái lợp ngói vảy cổ, bờ nóc đắp nổi lưỡng long chầu nguyệt.",
        "Kết cấu gian tiền tế và hậu cung bằng khung gỗ tứ thiết vững chãi, chạm nổi các đề tài tứ linh (Long, Lân, Quy, Phụng) và tứ quý (Tùng, Cúc, Trúc, Mai).",
        "Lưu giữ hương án gỗ thếp vàng, đại tự, câu đối ca ngợi khí phách kiên cường bất khuất của dân tộc và các sắc phong cổ."
      ],
      studyNote: "Đền Gốc Khế nhắc nhở các bạn học sinh Trường THPT Nhã Nam về lòng dũng cảm, mưu trí và tinh thần kiên cường bất khuất của cha ông trong cuộc chiến bảo vệ quê hương."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%81n+G%E1%BB%91c+Kh%E1%BA%BF,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đền+Gốc+Khế,+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Đền Gốc Khế - Di tích Lịch sử Khởi nghĩa Yên Thế"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Cổng đền và mái ngói rêu phong cổ kính của Đền Gốc Khế Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
        caption: "Không gian thờ tự trang nghiêm bên trong hậu cung thờ Đức Thánh Trần"
      }
    ]
  },

  {
    id: "vat-the-3",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Quốc gia đặc biệt",
    title: "Đồn Nhã Nam - Đồi Phủ",
    shortTitle: "Đồn Nhã Nam - Đồi Phủ",
    address: "Đồi Phủ, tổ dân phố Nam Sơn, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tags: ["Đồn Nhã Nam", "Đồi Phủ", "Phủ lỵ Nhã Nam", "Hoàng Hoa Thám", "Khởi nghĩa Yên Thế", "Nam Sơn"],
    overview: "Căn cứ đầu não của quân Pháp xưa kia và là nơi diễn ra các cuộc đấu trí đàm phán kiệt xuất của người anh hùng áo vải Hoàng Hoa Thám.",

    content: {
      intro: "Khu di tích Đồn Nhã Nam nằm trên Đồi Phủ cao ráo, bao quát toàn vùng trung tâm Nhã Nam. Đây từng là vị trí địa lý quân sự yết hầu nối liền đồng bằng với vùng núi rừng Yên Thế hiểm trở.",
      historicalSignificance: [
        "**Lỵ sở quân sự của thực dân Pháp:** Cuối thế kỷ XIX, sau khi chiếm được Bắc Kỳ, thực dân Pháp đã biến Đồi Phủ thành sở chỉ huy quân sự (phủ lỵ Yên Thế) kiên cố, đặt đồn binh dày đặc nhằm bao vây, chia cắt và cô lập nghĩa quân Đề Thám.",
        "**Nơi đấu trí ngoại giao đỉnh cao:** Tại Đồn Nhã Nam và khu vực Đồi Phủ, thủ lĩnh Hoàng Hoa Thám bằng sự mưu lược, bản lĩnh can trường đã nhiều lần gặp gỡ, đấu trí, thương lượng hòa hoãn với các tướng lĩnh, quan lại Pháp (như Toàn quyền Đông Dương Paul Doumer, Đại tá Frey...), buộc đối phương phải nhượng bộ nhiều quyền lợi cho nhân dân và nghĩa quân.",
        "**Dấu mốc Cách mạng Tháng Tám năm 1945:** Tháng 8/1945, dưới sự lãnh đạo của Đảng và Mặt trận Việt Minh, lực lượng tự vệ và nhân dân Tân Yên đã nhất tề đứng lên bao vây, đánh chiếm phủ lỵ Nhã Nam trên Đồi Phủ, lật đổ chính quyền bù nhìn tay sai, thành lập chính quyền cách mạng nhân dân non trẻ."
      ],
      architecture: [
        "Hiện nay tại Đồi Phủ còn lưu dấu vết tường thành lũy đá, cổng đồn xưa, nhà làm việc của viên tri phủ cùng khu nghĩa địa binh lính Pháp.",
        "Toàn bộ khu vực đã được quy hoạch, xây dựng tượng đài chiến thắng, đường dạo rợp bóng cây xanh và bia ghi dấu sự kiện lịch sử vẻ vang.",
        "Từ trên đỉnh Đồi Phủ, du khách và học sinh có thể phóng tầm mắt ngắm nhìn toàn cảnh thị trấn Nhã Nam trù phú đang từng ngày phát triển văn minh, giàu đẹp."
      ],
      studyNote: "Đồi Phủ là chứng nhân cho sự mưu trí của chiến tranh nhân dân: dù vũ khí thô sơ, cha ông ta vẫn hiên ngang đánh bại kẻ thù xâm lược hùng mạnh."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%93i+Ph%E1%BB%A7+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đồi+Phủ+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Đồn Nhã Nam - Khu di tích Lịch sử Đồi Phủ"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
        caption: "Cảnh quan xanh mát trên đỉnh Đồi Phủ - nơi lưu giữ dấu tích lịch sử"
      },
      {
        url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
        caption: "Đường lên di tích Đồi Phủ lịch sử rợp bóng cây xanh tại Nhã Nam"
      }
    ]
  },

  {
    id: "vat-the-4",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Lịch sử - Kiến trúc",
    title: "Đình Nhã Nam",
    shortTitle: "Đình Nhã Nam (Đình Làng Cổ)",
    address: "Tổ dân phố Nam Sơn, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    tags: ["Đình Nhã Nam", "Thành hoàng làng", "Kiến trúc điêu khắc cổ", "Nam Sơn", "Quýt Bo bò Sỏi đình Nhã Nam"],
    overview: "Ngôi đình cổ nổi tiếng xứ Kinh Bắc qua câu ca cổ truyền, biểu tượng sinh hoạt văn hóa làng xã và nghệ thuật chạm khắc gỗ độc đáo thế kỷ XIX.",

    content: {
      intro: "Từ xa xưa, câu ca dao truyền miệng của cha ông vùng Kinh Bắc - Bắc Giang đã khẳng định nét độc đáo của địa phương: 'Quýt Bo, bò Sỏi, gỏi Đinh, đình Nhã Nam...'. Đình Nhã Nam chính là niềm tự hào sâu sắc của các thế hệ người dân nơi đây.",
      historicalSignificance: [
        "**Trung tâm sinh hoạt cộng đồng:** Đình là nơi thờ vị Thành hoàng làng - người có công khai hoang lập ấp, che chở cho dân làng mưa thuận gió hòa, mùa màng tươi tốt, cuộc sống bình yên ấm no.",
        "**Nơi hội tụ lòng dân qua các thời kỳ:** Trong các phong trào kháng chiến, sân đình Nhã Nam là nơi tập hợp nghĩa quân, quyên góp lương thực ủng hộ tiền tuyến và mở các lớp bình dân học vụ sau ngày độc lập.",
        "**Không gian lễ hội truyền thống:** Mỗi độ xuân về, đình Nhã Nam rộn ràng cờ hoa, nơi diễn ra các nghi lễ tế tế thần trang nghiêm và các hội diễn văn nghệ dân gian đặc sắc."
      ],
      architecture: [
        "Đình được dựng bằng gỗ lim già nguyên khối với hệ thống cột cái, cột quân to bản vững chắc.",
        "Nghệ thuật điêu khắc gỗ tinh vi: Đầu dư chạm rồng há miệng ngậm ngọc, bẩy đình chạm khắc họa tiết hoa sen, sóng nước, vân mây và cảnh sinh hoạt dân gian vô cùng sống động.",
        "Mái đình cong vút hình mũi thuyền truyền thống, tạo thế uyển chuyển nhưng bề thế giữa trung tâm làng quê Việt."
      ],
      studyNote: "Đình Nhã Nam giúp học sinh hiểu về thiết chế văn hóa làng xã truyền thống của người Việt, sự tôn kính tổ tiên và truyền thống đạo lý 'Uống nước nhớ nguồn'."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%C3%ACnh+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đình+Nhã+Nam,+Tổ+dân+phố+Nam+Sơn,+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Đình Làng Nhã Nam - Di tích Kiến trúc Nghệ thuật"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
        caption: "Kiến trúc mái đình uốn cong cổ kính đặc trưng phong cách truyền thống Bắc Bộ"
      },
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Các chi tiết vì kèo và điêu khắc gỗ chạm khắc tinh vi tại Đình Nhã Nam"
      }
    ]
  },

  {
    id: "vat-the-5",
    category: "vat-the",
    categoryName: "Di sản Vật thể",
    badge: "Di tích Lịch sử - Văn hóa",
    title: "Chùa Nam Thiên",
    shortTitle: "Chùa Nam Thiên (Chùa Phố)",
    address: "Tổ dân phố Tân Quang, thị trấn Nhã Nam, huyện Tân Yên, tỉnh Bắc Giang",
    heroImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80",
    tags: ["Chùa Nam Thiên", "Chùa Phố", "Tân Quang", "Phật giáo Bắc Giang", "Di tích văn hóa", "Nhã Nam"],
    overview: "Ngôi cổ tự thanh tịnh xây dựng từ năm 1882, nơi gìn giữ hệ thống tượng Phật cổ và lan tỏa tinh thần từ bi hỷ xả trong cộng đồng.",

    content: {
      intro: "Chùa Nam Thiên (nhân dân địa phương thường gọi thân mật là Chùa Phố) tọa lạc tại khu vực trung tâm phố Nhã Nam. Ngôi chùa ban đầu được xây dựng vào khoảng năm 1882 thời vua Tự Đức, sau đó được trùng tu và chuyển về vị trí hiện nay để tiện cho phật tử và nhân dân chiêm bái.",
      historicalSignificance: [
        "**Nơi nuôi dưỡng tâm thiện và tinh thần yêu nước:** Trong thời kỳ biến động của các phong trào kháng chiến chống ngoại xâm, chùa Nam Thiên là nơi che chở, đùm bọc các chiến sĩ cách mạng và nhân dân tản cư.",
        "**Trung tâm giáo dục đạo lý:** Các thế hệ sư trụ trì cùng bà con thị trấn luôn lấy ngôi chùa làm nơi rèn rũa nếp sống lành mạnh, dạy chữ nho, dạy đạo làm con, giữ gìn thuần phong mỹ tục tốt đẹp.",
        "**Xếp hạng bảo tồn:** Chùa Nam Thiên được công nhận là Di tích Lịch sử - Văn hóa, nằm trong danh mục các điểm di tích được gìn giữ, tôn tạo cẩn trọng của huyện Tân Yên."
      ],
      architecture: [
        "Kiến trúc cảnh quan hài hòa gồm Tam quan, Tiền đường, Thượng điện, Nhà thờ Mẫu và Vườn tháp tổ thanh tịnh.",
        "Lưu giữ hệ thống tượng Phật cổ thời Nguyễn bằng gỗ mít sơn son thếp vàng bóng đẹp (tượng Tam Thế Phật, tượng Phật Thích Ca, Quan Âm Bồ Tát).",
        "Có chuông đồng cổ 'Nam Thiên Tự Chung' ngân vang tiếng chuông thanh thoát mỗi buổi hoàng hôn và sớm mai."
      ],
      studyNote: "Chùa Nam Thiên dạy các em học sinh trân quý sự bình an, lòng bao dung, bác ái và ý thức tôn trọng các giá trị tâm linh văn hóa truyền thống."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%C3%B9a+Nam+Thi%C3%AAn,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Nam+Thiên,+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Chùa Nam Thiên (Chùa Phố Nhã Nam)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
        caption: "Cổng chùa Nam Thiên tôn nghiêm tĩnh lặng giữa lòng thị trấn Nhã Nam"
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
        caption: "Điện Phật trang nghiêm với hệ thống tượng cổ sơn son thếp vàng"
      }
    ]
  }
];

/**
 * --------------------------------------------------------------------
 * DANH MỤC DI SẢN PHI VẬT THỂ (INTANGIBLE HERITAGE DATA)
 * Yêu cầu chi tiết hiển thị đúng 5 mục:
 * 1. Tên di sản
 * 2. Phạm vi (Địa bàn thực hành văn hóa tại Nhã Nam, Tân Yên)
 * 3. Nội dung di sản (Nguồn gốc, giá trị, nghi thức, bảo tồn)
 * 4. Chỉ dẫn đi đến đó bằng Google Map (địa điểm trung tâm tổ chức)
 * 5. Ảnh về di tích / di sản (gallery kèm lightbox)
 * --------------------------------------------------------------------
 */
const INTANGIBLE_HERITAGE_DATA = [
  {
    id: "phi-vat-the-1",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Lễ hội Truyền thống Tiêu biểu",
    title: "Lễ hội Chùa Tứ Giáp & Đền Gốc Khế",
    shortTitle: "Lễ hội Chùa Tứ Giáp & Đền Gốc Khế",
    scope: "Thị trấn Nhã Nam và các làng xã lân cận thuộc vùng Cầu Vồng - Tân Yên, tỉnh Bắc Giang",
    heroImage: "./assets/images/hero-phi-vat-the.jpg",
    thumbnail: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80",
    tags: ["Lễ hội truyền thống", "Rước kiệu", "Chùa Tứ Giáp", "Đền Gốc Khế", "Hội xuân", "Tân Yên"],
    overview: "Lễ hội mùa xuân tôn nghiêm kết hợp hài hòa giữa nghi thức tâm linh, tri ân anh hùng dân tộc và lễ báo công dâng Bác xúc động.",

    content: {
      intro: "Hằng năm vào dịp đầu xuân năm mới (từ ngày 15 đến 18 tháng Giêng âm lịch), nhân dân thị trấn Nhã Nam lại tưng bừng mở hội Chùa Tứ Giáp và Đền Gốc Khế. Đây là một trong những lễ hội truyền thống lớn nhất của huyện Tân Yên, thu hút hàng vạn lượt người dân và khách thập phương trẩy hội.",
      originAndMeaning: [
        "**Nguồn gốc lịch sử:** Lễ hội có nguồn gốc từ hàng trăm năm trước nhằm tạ ơn trời đất, Thành hoàng, chư Phật và tưởng nhớ công đức Hưng Đạo Đại Vương Trần Quốc Tuấn cùng các tướng lĩnh khởi nghĩa Yên Thế hy sinh vì bờ cõi.",
        "**Ý nghĩa cách mạng đương đại:** Từ sau năm 1948, lễ hội chùa Tứ Giáp còn mang ý nghĩa đặc biệt: Nơi lực lượng Công an Nhân dân cùng chính quyền và nhân dân địa phương tổ chức lễ kỷ niệm, dâng hương, báo công thực hiện Sáu điều Bác Hồ dạy."
      ],
      ritualsAndActivities: [
        "**Phần Lễ trang nghiêm:** Lễ rước kiệu thánh uy nghi từ các thôn làng về trung tâm đền - chùa; nghi thức tế lễ cổ truyền; lễ dâng hương tưởng niệm danh nhân Hoàng Hoa Thám và các nghĩa sĩ; lễ dâng hoa báo công trước Tượng đài Bác Hồ.",
        "**Phần Hội sôi động:** Các trò chơi dân gian đặc sắc như cờ người, đấu vật cổ truyền, chọi gà, kéo co, đập niêu đất, hội thi làm bánh khảo - kẹo lạc và các đêm giao lưu hát Chèo, dân ca Quan họ trên thuyền rực rỡ sắc màu."
      ],
      preservationValue: "Lễ hội bồi đắp tinh thần đoàn kết cộng đồng, gắn kết bền chặt tình quân - dân và giáo dục truyền thống đạo lý 'Uống nước nhớ nguồn' cho các thế hệ học sinh Trường THPT Nhã Nam."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%C3%B9a+T%E1%BB%A9+Gi%C3%A1p,+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chùa+Tứ+Giáp,+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Khu vực trung tâm Lễ hội truyền thống Chùa Tứ Giáp & Đền Gốc Khế"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
        caption: "Không khí rộn ràng cờ hội và lồng đèn rực rỡ trong ngày khai hội truyền thống"
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
        caption: "Lễ dâng hương báo công tưởng niệm thiêng liêng thu hút đông đảo người dân"
      }
    ]
  },

  {
    id: "phi-vat-the-2",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Nghệ thuật Trình diễn Dân gian",
    title: "Nghệ thuật Hát Chèo truyền thống Nhã Nam",
    shortTitle: "Hát Chèo Cổ Truyền Nhã Nam",
    scope: "Các câu lạc bộ chèo, chiếu chèo truyền thống tại thị trấn Nhã Nam và các xã huyện Tân Yên",
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    tags: ["Hát Chèo", "Nghệ thuật dân gian", "Chiếu chèo Nhã Nam", "Di sản văn hóa", "Tân Yên"],
    overview: "Làn điệu chèo mượt mà, sâu lắng phản ánh tâm hồn thanh cao, tình yêu quê hương đất nước và nghĩa tình nồng hậu của người dân xứ Bắc.",

    content: {
      intro: "Nằm trong cái nôi văn hóa vùng Kinh Bắc và châu thổ sông Hồng màu mỡ, thị trấn Nhã Nam từ xưa đã nổi tiếng với phong trào hát chèo truyền thống. Những chiếu chèo sân đình nơi đây đã ăn sâu vào tiềm thức, trở thành món ăn tinh thần không thể thiếu trong đời sống nhân dân.",
      originAndMeaning: [
        "**Nguồn gốc & Đặc sắc:** Chèo Nhã Nam mang phong vị đặc trưng của vùng trung du Bắc Bộ, kết hợp giữa chất mộc mạc của người nông dân với sự tinh tế của các làn điệu cổ như Lới lơ, Đào liễu, Quân tử vu dịch, Nhịp đuổi...",
        "**Chủ đề tư tưởng:** Ca ngợi cuộc sống lao động cần cù, đạo lý gia đình thủy chung hiếu nghĩa, phê phán thói hư tật xấu và đặc biệt là các vở diễn tái hiện cuộc chiến đấu anh dũng của nghĩa binh Yên Thế chống giặc ngoại xâm."
      ],
      ritualsAndActivities: [
        "**Sinh hoạt chiếu chèo:** Các câu lạc bộ chèo Nhã Nam thường xuyên tổ chức luyện tập vào các buổi tối cuối tuần tại nhà văn hóa tổ dân phố hoặc sân đình.",
        "**Biểu diễn phục vụ lễ hội:** Vào các dịp lễ hội rằm tháng Giêng, Tết Trung thu hay các ngày kỷ niệm lớn, chiếu chèo Nhã Nam luôn là tâm điểm thu hút người già, thanh niên và thiếu nhi quây quần thưởng thức.",
        "**Truyền dạy cho thế hệ trẻ:** Nhiều nghệ nhân cao tuổi tại Nhã Nam tích cực mở lớp truyền dạy làn điệu chèo, cách đánh trống chèo, đàn nhị cho các em học sinh tiểu học và THCS địa phương."
      ],
      preservationValue: "Hát chèo giúp bồi đắp tâm hồn văn hóa dân tộc, nâng cao cảm thụ thẩm mỹ và giữ gìn bản sắc Việt Nam trong thời kỳ hội nhập công nghệ số."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%E1%BB%8B+tr%E1%BA%A5n+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Nhà+văn+hóa+thị+trấn+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Trung tâm Văn hóa Thể thao thị trấn Nhã Nam (Nơi sinh hoạt Chiếu Chèo)"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
        caption: "Nghệ nhân và diễn viên chèo say sưa biểu diễn trích đoạn cổ trên sân khấu"
      }
    ]
  },

  {
    id: "phi-vat-the-3",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Tri thức Dân gian & Ẩm thực",
    title: "Nghề làm bánh khảo, kẹo lạc truyền thống Nhã Nam",
    shortTitle: "Bánh Khảo, Kẹo Lạc Truyền Thống",
    scope: "Các hộ gia đình nghệ nhân và làng nghề ẩm thực tại thị trấn Nhã Nam, huyện Tân Yên",
    heroImage: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=600&q=80",
    tags: ["Bánh khảo", "Kẹo lạc", "Ẩm thực Nhã Nam", "Quà quê truyền thống", "Làng nghề", "Tân Yên"],
    overview: "Thức quà quê mộc mạc thơm lừng hương nếp cái hoa vàng, vị bùi ngọt của vừng lạc, đậm đà tình làng nghĩa xóm xứ Kinh Bắc.",

    content: {
      intro: "Cùng với nét trầm mặc của đình chùa cổ kính, thị trấn Nhã Nam còn níu chân du khách bằng hương vị ngọt ngào, thơm thảo của nghề làm bánh khảo và kẹo lạc cổ truyền. Món quà quê tuy mộc mạc nhưng kết tinh công phu, sự khéo léo và tấm lòng thơm thảo của người dân nơi đây.",
      originAndMeaning: [
        "**Nguồn gốc nghề truyền thống:** Nghề làm bánh khảo, kẹo lạc ở Nhã Nam đã có từ nhiều thế hệ. Xưa kia, mỗi dịp Tết đến xuân về hay hội làng tháng Giêng, các mẹ các chị lại quây quần bên cối xay, bếp lửa rang vừng lạc làm bánh dâng cúng tổ tiên và đãi khách quý.",
        "**Bí quyết gia truyền độc đáo:**",
        "• *Bánh khảo:* Chọn gạo nếp cái hoa vàng hạt mẩy, rang vừa chín tới thơm lừng rồi xay mịn như bột phấn; ủ đường mía ngọt thanh, nhân mỡ phần ướp đường hoặc nhân đỗ xanh thơm bùi; ép trong khuôn gỗ cổ.",
        "• *Kẹo lạc:* Lạc đồi Tân Yên hạt đều, vỏ đỏ, rang giòn rụm; đun mạch nha cùng đường cát theo độ lửa chuẩn; rắc vừng vàng thơm phức; khi cắt kẹo phải nhanh tay khi còn ấm nóng dẻo thơm."
      ],
      ritualsAndActivities: [
        "**Thưởng thức tao nhã:** Cắn một miếng bánh khảo mềm mịn tan ngay trên đầu lưỡi, hay nhâm nhi thanh kẹo lạc giòn bùi bên chén trà xanh Tân Cương nóng hổi là thú vui ẩm thực tao nhã của người dân Nhã Nam.",
        "**Phát triển sản phẩm quà tặng:** Ngày nay, nhiều cơ sở tại Nhã Nam đã áp dụng quy trình vệ sinh an toàn thực phẩm, bao bì bắt mắt để sản phẩm trở thành đặc sản OCOP được ưa chuộng khắp cả nước."
      ],
      preservationValue: "Gìn giữ nghề truyền thống chính là gìn giữ ký ức làng quê, giáo dục lòng biết ơn hạt gạo giọt mồ hôi của người nông dân một nắng hai sương."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=Ch%E1%BB%A3+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chợ+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Khu vực Chợ trung tâm và phố nghề ẩm thực truyền thống Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1000&q=80",
        caption: "Bánh khảo nếp thơm trắng ngần - thức quà truyền thống ngày Tết Nhã Nam"
      }
    ]
  },

  {
    id: "phi-vat-the-4",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Tập quán Xã hội & Tín ngưỡng",
    title: "Tập quán tưởng niệm Hoàng Hoa Thám và nghĩa quân Yên Thế",
    shortTitle: "Tưởng niệm Hoàng Hoa Thám & Nghĩa Quân",
    scope: "Toàn thể nhân dân thị trấn Nhã Nam, huyện Tân Yên và các huyện vùng khởi nghĩa Yên Thế",
    heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    tags: ["Hoàng Hoa Thám", "Đề Thám", "Nghĩa quân Yên Thế", "Tưởng niệm anh hùng", "Uống nước nhớ nguồn"],
    overview: "Tập quán tín ngưỡng thiêng liêng và lòng tri ân sâu nặng của người dân Nhã Nam đối với vị 'Hùm thiêng Yên Thế' cùng nghĩa sĩ vị quốc vong thân.",

    content: {
      intro: "Cuộc khởi nghĩa Yên Thế kéo dài gần 30 năm (1884 - 1913) do người anh hùng dân tộc Hoàng Hoa Thám lãnh đạo đã viết nên trang sử bi tráng bất tử. Tại mảnh đất Nhã Nam - nơi từng thấm đẫm máu xương của các nghĩa sĩ, tập quán tri ân tưởng niệm đã trở thành nét đẹp văn hóa tâm linh thiêng liêng của mọi gia đình.",
      originAndMeaning: [
        "**Nguồn cội tâm linh:** Sau khi cuộc khởi nghĩa kết thúc, dù thực dân Pháp kiểm soát gắt gao, nhân dân Nhã Nam vẫn bí mật thờ cúng thủ lĩnh Đề Thám cùng vợ ông là bà Ba Cẩn (Đặng Thị Nhu) và các tướng lĩnh kiên trung.",
        "**Ý nghĩa giáo dục:** Nhắc nhở thế hệ hôm nay luôn tự hào về dòng máu kiên cường bất khuất, tinh thần quật khởi không chịu khuất phục trước bất kỳ thế lực bạo tàn nào."
      ],
      ritualsAndActivities: [
        "**Ngày giỗ nghĩa quân (16 tháng 3 dương lịch hàng năm):** Người dân cùng chính quyền tổ chức dâng hương tại các di tích Đền Gốc Khế, Đồi Phủ, Chùa Tứ Giáp.",
        "**Nghi thức thắp nến tri ân:** Các đoàn viên, thanh niên và học sinh Nhã Nam tổ chức dọn dẹp vệ sinh các điểm di tích, thắp nến tri ân các nghĩa sĩ và anh hùng liệt sĩ.",
        "**Kể chuyện lịch sử trong trường học:** Các tiết học lịch sử địa phương, hoạt động ngoại khóa 'Về nguồn' thường xuyên được các trường học trên địa bàn tổ chức sinh động."
      ],
      preservationValue: "Tập quán tưởng niệm là ngọn lửa thắp sáng tinh thần yêu nước, lòng tự tôn dân tộc và ý chí vươn lên xây dựng quê hương của tuổi trẻ Nhã Nam."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=%C4%90%E1%BB%93i+Ph%E1%BB%A7+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Đồi+Phủ+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Khu tưởng niệm Hoàng Hoa Thám và Nghĩa quân Yên Thế tại Đồi Phủ"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
        caption: "Lễ dâng hương tri ân vị anh hùng dân tộc Hoàng Hoa Thám và nghĩa quân"
      }
    ]
  },

  {
    id: "phi-vat-the-5",
    category: "phi-vat-the",
    categoryName: "Di sản Phi vật thể",
    badge: "Trò chơi Dân gian & Thể thao Cổ truyền",
    title: "Trò chơi dân gian & Võ cổ truyền trong lễ hội Nhã Nam",
    shortTitle: "Võ Cổ Truyền & Trò Chơi Dân Gian",
    scope: "Sới vật làng, trường học và sân đình trung tâm thị trấn Nhã Nam, huyện Tân Yên",
    heroImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80",
    tags: ["Võ cổ truyền", "Đấu vật dân tộc", "Cờ người", "Trò chơi dân gian", "Hội làng", "Nhã Nam"],
    overview: "Tái hiện khí phách dũng mãnh của nghĩa quân Yên Thế xưa, rèn luyện sức khỏe, ý chí kiên cường và tinh thần thượng võ cho thanh thiếu niên.",

    content: {
      intro: "Nhã Nam - Tân Yên từ lâu được ca ngợi là 'vùng đất thượng võ' của xứ Bắc. Trong mỗi dịp lễ hội xuân, tiếng trống vật dồn dập, những thế cờ người biến hóa và những bài quyền võ cổ truyền uyển chuyển luôn tạo nên bầu không khí hào hứng, sôi nổi đặc biệt.",
      originAndMeaning: [
        "**Nguồn gốc thượng võ:** Xuất phát từ thời kỳ khởi nghĩa Yên Thế, nghĩa quân vừa sản xuất vừa khổ luyện võ nghệ, bắn cung, đánh côn kiếm, đấu vật để tự vệ và đánh đuổi giặc ngoại xâm.",
        "**Ý nghĩa:** Tôn vinh tinh thần dũng cảm, sự dẻo dai, đức tính thượng võ, 'thắng không kiêu, bại không nản' và tinh thần thượng tôn trượng nghĩa của con người Bắc Giang."
      ],
      ritualsAndActivities: [
        "**Hội vật dân tộc:** Sới vật Nhã Nam thu hút nhiều đô vật tài ba trong vùng. Nghi thức 'xe đài' múa chào bái tổ trang nghiêm trước khi vào keo vật kịch tính.",
        "**Biểu diễn võ phái Yên Thế:** Các câu lạc bộ võ thuật trình diễn các bài quyền cổ, đại đao, côn nhị khúc, thế võ cận chiến tái hiện lại hình ảnh nghĩa binh xưa.",
        "**Các trò chơi dân gian cộng đồng:** Đấu cờ người với trang phục tướng sĩ cổ trang, trò chơi bịt mắt đập niêu đất rộn rã tiếng cười, kéo co tập thể thể hiện sức mạnh đoàn kết làng xã."
      ],
      preservationValue: "Tạo sân chơi văn hóa lành mạnh, đẩy lùi các tệ nạn xã hội, giúp học sinh rèn luyện thể chất, tự tin và trân trọng di sản phi vật thể quý báu của quê hương."
    },

    map: {
      embedUrl: "https://www.google.com/maps?q=S%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+Nh%C3%A3+Nam,+T%C3%A2n+Y%C3%AAn,+B%E1%BA%AFc+Giang&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sân+vận+động+thị+trấn+Nhã+Nam,+Tân+Yên,+Bắc+Giang",
      locationName: "Sân vận động & Khu thể thao truyền thống thị trấn Nhã Nam"
    },

    gallery: [
      {
        url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
        caption: "Màn biểu diễn võ thuật cổ truyền tái hiện khí phách nghĩa quân Yên Thế"
      }
    ]
  }
];

const QUIZ_DATA = [
  {
    id: 1,
    question: "Chùa Tứ Giáp (Nhã Nam) gắn liền với sự kiện lịch sử vẻ vang nào của lực lượng Công an Nhân dân?",
    options: [
      "Nơi Bác Hồ gửi thư nêu Sáu điều dạy về tư cách người Công an cách mệnh (11/3/1948)",
      "Nơi tổ chức Đại hội Đảng toàn quốc lần thứ nhất",
      "Nơi thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
      "Nơi ký hiệp định đình chiến năm 1954"
    ],
    correctAnswer: 0,
    explanation: "Ngày 11/3/1948, tại chùa Tứ Giáp (trụ sở Công an Khu XII), đồng chí Hoàng Mai đã nhận được bức thư của Bác Hồ với Sáu điều dạy CAND thiêng liêng."
  },
  {
    id: 2,
    question: "Đền Gốc Khế tại thị trấn Nhã Nam trong cuộc khởi nghĩa Yên Thế là nơi gắn liền với hoạt động nào?",
    options: [
      "Kho chứa vũ khí bí mật của thực dân Pháp",
      "Trạm liên lạc tiền tiêu và nơi hội họp xuất quân của các tướng lĩnh nghĩa quân Hoàng Hoa Thám",
      "Nơi mở trường dạy chữ Pháp đầu tiên",
      "Khu chợ buôn bán nông sản lớn nhất vùng trung du"
    ],
    correctAnswer: 1,
    explanation: "Đền Gốc Khế là căn cứ tiền tiêu, nơi chủ tướng Hoàng Hoa Thám và các danh tướng (Đề Công, Đề Nguyên, Thống Ngò...) họp bàn quân cơ và tế cờ xuất trận."
  },
  {
    id: 3,
    question: "Câu ca dao truyền miệng cổ nào ca ngợi vẻ đẹp kiến trúc của ngôi đình cổ tại Nhã Nam?",
    options: [
      "Thứ nhất là đình Đông Khang, thứ nhì đình Bảng...",
      "Đình làng em nghiêng nghiêng bóng đa...",
      "Quýt Bo, bò Sỏi, gỏi Đinh, đình Nhã Nam...",
      "Bao giờ Đầm Mới cạn lau, cờ lau tập trận..."
    ],
    correctAnswer: 2,
    explanation: "Câu ca dao 'Quýt Bo, bò Sỏi, gỏi Đinh, đình Nhã Nam' là câu cửa miệng lưu truyền nhiều đời ca ngợi ngôi đình bề thế chạm khắc tinh xảo tại Nhã Nam."
  },
  {
    id: 4,
    question: "Lễ hội truyền thống Chùa Tứ Giáp và Đền Gốc Khế thường được tổ chức vào thời gian nào hàng năm?",
    options: [
      "Từ ngày 15 đến 18 tháng Giêng âm lịch",
      "Dịp Tết Đoan Ngọ (mùng 5 tháng 5 âm lịch)",
      "Rằm tháng Tám Trung thu",
      "Dịp Tết Nguyên Đán ngày mùng 1 Tết"
    ],
    correctAnswer: 0,
    explanation: "Lễ hội mùa xuân Chùa Tứ Giáp và Đền Gốc Khế diễn ra rộn ràng từ ngày 15 đến 18 tháng Giêng âm lịch hằng năm."
  },
  {
    id: 5,
    question: "Đặc sản ẩm thực dân dã truyền thống nổi tiếng của thị trấn Nhã Nam là gì?",
    options: [
      "Bánh cốm Hà Nội",
      "Bánh cáy Thái Bình",
      "Bánh khảo bột nếp nhung và kẹo lạc vừng giòn bùi",
      "Bánh gai Tứ Kỳ"
    ],
    correctAnswer: 2,
    explanation: "Bánh khảo bột nếp nhung thơm mịn cùng kẹo lạc vừng giòn ngọt là hai thức quà quê cổ truyền nức tiếng của các nghệ nhân thị trấn Nhã Nam."
  }
];

const QUICK_SEARCH_TAGS = [
  "Chùa Tứ Giáp",
  "Đền Gốc Khế",
  "Đồn Nhã Nam",
  "Đình Nhã Nam",
  "Chùa Nam Thiên",
  "Sáu điều Bác Hồ dạy",
  "Khởi nghĩa Yên Thế",
  "Hoàng Hoa Thám",
  "Hát Chèo",
  "Bánh khảo",
  "Kẹo lạc",
  "Võ cổ truyền"
];
