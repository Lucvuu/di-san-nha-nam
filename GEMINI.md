# QUY TẮC BẢO MẬT HỆ THỐNG - DỰ ÁN DI SẢN VĂN HÓA XÃ NHÃ NAM

## YÊU CẦU BẮT BUỘC VỀ BẢO MẬT TÀI CHÍNH VÀ HỒ SƠ HỢP ĐỒNG

> **QUY TẮC BẤT DI BẤT DỊCH (CRITICAL MANDATORY RULE):**  
> Tuyệt đối KHÔNG BAO GIỜ được đưa các biểu mẫu/file đề xuất dự trù kinh phí và hồ sơ hợp đồng lên git/GitHub trong bất kỳ tình huống nào!

### 1. Danh mục tài liệu tuyệt đối cấm đưa lên Git:
- **Tất cả các file đề xuất dự trù kinh phí, dự toán, báo giá**:
  - `*.xls`, `*.xlsx`, các file chứa từ khóa `dự trù`, `du tru`, `kinh phí`, `kinh phi`, `đề xuất`, `de xuat`, `báo giá`, `bao gia`, `budget`, `proposal`, `cost`.
- **Tất cả các file thuộc hồ sơ hợp đồng, thanh toán, nghiệm thu**:
  - Thư mục `Hồ sơ hợp đồng*`, `Ho so hop dong*`, `contracts/`.
  - Các file hợp đồng dịch vụ, hợp đồng nguyên tắc, hợp đồng bảo trì, biên bản nghiệm thu & bàn giao, giấy đề nghị thanh toán, biên bản thanh lý hợp đồng, hóa đơn (`*hop dong*`, `*hợp đồng*`, `*bien ban nghiem thu*`, `*de nghi thanh toan*`, `*thanh ly*`, `*hoa don*`, `*contract*`, `*invoice*`).
  - Toàn bộ thư mục hồ sơ hợp đồng và các file bên trong.

### 2. Quy trình kiểm soát khi commit / push mã nguồn:
1. Luôn duy trì bộ lọc chặn nghiêm ngặt trong file `.gitignore`.
2. Trước mọi lệnh `git add`, `git commit` hay `git push`, phải kiểm tra kỹ danh sách file thay đổi bằng `git status` và `git ls-files`.
3. Nếu phát hiện bất kỳ file nào thuộc diện trên xuất hiện trong git tracking hoặc staging, phải lập tức gỡ bỏ khỏi git cache (`git rm --cached`) và chặn lại ngay lập tức.
4. Mọi tài liệu tài chính, đề xuất dự trù kinh phí và hồ sơ hợp đồng chỉ được lưu cục bộ trên máy của Ban Biên tập để phục vụ thủ tục hành chính, không công khai lên mã nguồn dự án.
