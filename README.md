# Power BI User Guide

## Cách dùng

1. Mở file `app.js`.
2. Tìm dòng `powerBiUrl`.
3. Dán link Power BI dạng `reportEmbed` hoặc link lấy từ:
   Power BI Service → File → Embed report → Website or portal.
4. Chỉnh các thông tin:
   - `projectName`
   - `projectDescription`
   - `projectCode`
   - `primaryColor`
   - `supportEmail`
   - `notes`
5. Upload toàn bộ file lên GitHub.
6. Kết nối repository với Vercel và chọn Deploy.

## Cấu trúc file

- `index.html`: khung giao diện.
- `style.css`: giao diện.
- `app.js`: cấu hình dự án và xử lý.
