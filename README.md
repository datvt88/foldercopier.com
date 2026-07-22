# FolderCopier - Google Drive Duplication Utility

FolderCopier là một ứng dụng web (Web App) chuyên nghiệp được thiết kế để giải quyết một hạn chế cốt lõi của Google Drive: Không cho phép sao chép trực tiếp các thư mục chứa nhiều thư mục con và tệp tin bên trong (Nested Folders).

Hệ thống sử dụng kiến trúc Hybrid linh hoạt, kết hợp sức mạnh giao diện của Next.js và khả năng xử lý tác vụ nền bền bỉ của Python (FastAPI + Celery).

## 🚀 Tính năng nổi bật

*   **Sao chép cấu trúc phức tạp:** Tự động đệ quy và nhân bản chính xác toàn bộ cây thư mục từ nguồn sang đích.
*   **Xử lý phía máy chủ (Server-side Processing):** Toàn bộ quá trình sao chép diễn ra trực tiếp giữa các máy chủ của Google, không tiêu tốn băng thông (bandwidth) của người dùng.
*   **Chống sập do Rate Limit:** Tích hợp thuật toán *Exponential Backoff* tự động tạm ngưng và thử lại khi chạm ngưỡng giới hạn API của Google (Lỗi 403, 429).
*   **Giao diện Tối giản & Tối ưu SEO/AEO:** Giao diện tập trung vào tính năng. Tích hợp sẵn Schema Markup (JSON-LD) và cấu trúc chuẩn cho Answer Engine (AI Bots).

## 🏗️ Kiến trúc Hệ thống (Tech Stack)

Hệ thống được chia làm 2 phần hoàn toàn độc lập:

**1. Frontend (Triển khai trên Vercel - Serverless)**
*   **Framework:** Next.js 14 (App Router)
*   **Ngôn ngữ:** TypeScript
*   **Styling:** Tailwind CSS
*   **Xác thực:** `@react-oauth/google` (Sử dụng luồng mã ủy quyền - Offline Access)

**2. Backend (Triển khai trên VPS Hetzner - Dockerized)**
*   **API Gateway:** FastAPI (Python)
*   **Background Worker:** Celery
*   **Message Broker / Trạng thái:** Redis
*   **Cơ sở dữ liệu:** SQLite (Lưu trữ `refresh_token` với chế độ WAL)
*   **Tương tác Google:** `google-api-python-client`

## ⚙️ Hướng dẫn Cài đặt & Triển khai

### 1. Chuẩn bị tài nguyên (Google Cloud Console)
Để hệ thống hoạt động, bạn cần tạo dự án trên Google Cloud và lấy thông tin xác thực OAuth 2.0:
1.  Truy cập Google Cloud Console.
2.  Bật **Google Drive API**.
3.  Tạo thông tin xác thực **OAuth client ID** (Loại: Web application).
4.  Thêm nguồn gốc JavaScript hợp lệ (Authorized JavaScript origins): Domain Vercel của bạn (VD: `https://foldercopier.com`).
5.  Thêm URI chuyển hướng được ủy quyền (Authorized redirect URIs): `postmessage`.
6.  Lấy `Client ID` và `Client Secret`.

### 2. Triển khai Backend (Trên VPS)
Yêu cầu máy chủ (Ubuntu/Debian) đã cài đặt sẵn Docker và Docker Compose.

```bash
# 1. Clone kho lưu trữ chứa mã nguồn Backend
git clone <your-backend-repo-url>
cd backend

# 2. Tạo file cấu hình môi trường
cat <<EOT>> .env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
EOT

# 3. Khởi chạy toàn bộ dịch vụ ngầm qua Docker
docker-compose up -d
