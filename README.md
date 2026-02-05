# AURA – System for Retinal Vascular Health Screening
### Project Structure
AURA-System/
├── Backend/                         # Backend API (FastAPI)
│   ├── app/
│   │   ├── routers/                 # Các endpoint API (chia theo tính năng)
│   │   │   ├── auth.py              # Đăng nhập, đăng ký, lấy thông tin user hiện tại
│   │   │   ├── users.py             # Quản lý người dùng (profile + admin quản lý user)
│   │   │   ├── packages.py          # Gói dịch vụ, credits, thanh toán, mua gói
│   │   │   ├── images.py            # Upload & liệt kê ảnh võng mạc
│   │   │   ├── results.py           # Kết quả chẩn đoán & lịch sử
│   │   │   ├── dashboard.py         # Thống kê dashboard theo từng role (user/doctor/clinic/admin)
│   │   │   ├── patients.py          # Danh sách bệnh nhân cho bác sĩ/phòng khám
│   │   │   ├── clinics.py           # Quản lý phòng khám (admin duyệt/treo)
│   │   │   └── alerts.py            # Cảnh báo cho phòng khám
│   │   ├── auth_utils.py            # Xử lý JWT, băm mật khẩu, tìm user
│   │   ├── deps.py                  # Dependency: lấy current user, kiểm tra quyền (roles)
│   │   ├── database.py              # “Database” in-memory, seed dữ liệu mẫu (gói dịch vụ, user,…)
│   │   ├── models.py                # Pydantic models (schema request/response, enums, dashboard,…)
│   │   ├── config.py                # Cấu hình bảo mật (SECRET_KEY, thuật toán JWT, thời gian sống token)
│   │   └── main.py                  # Khởi tạo FastAPI app, cấu hình CORS, include router, health check
│   └── requirements.txt             # Danh sách dependency Python cho backend
│
├── Frontend/                        # Giao diện người dùng (React + Vite + TypeScript)
│   ├── public/                      # Static assets (favicon, icon mắt,…)
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts            # API client, cấu hình base URL, gắn Authorization Bearer token
│   │   ├── components/              # Component dùng chung (layout, ProtectedRoute,…)
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # Quản lý trạng thái đăng nhập, token, role
│   │   ├── pages/                   # Các màn hình cho từng loại user
│   │   │   ├── Login.tsx            # Trang đăng nhập
│   │   │   ├── Register.tsx         # Trang đăng ký (user/doctor/clinic)
│   │   │   ├── User*.tsx            # Trang dashboard, lịch sử, gói dịch vụ, upload ảnh cho user
│   │   │   ├── Doctor*.tsx          # Trang dashboard, danh sách bệnh nhân, reviews cho bác sĩ
│   │   │   ├── Clinic*.tsx          # Trang dashboard, cảnh báo, bulk upload cho phòng khám
│   │   │   └── Admin*.tsx           # Trang dashboard, quản lý user, clinic, gói, cấu hình AI,… cho admin
│   │   ├── types/
│   │   │   └── index.ts             # Kiểu TypeScript (User, Result, Package, Patient,… khớp backend)
│   │   ├── App.tsx / main.tsx       # Entry React app, định nghĩa routes, bọc AuthProvider
│   │   └── *.css                    # Style cho layout, dashboard, auth,…
│   ├── package.json                 # Cấu hình npm, scripts (dev/build)
│   ├── vite.config.ts               # Cấu hình Vite
│   └── tsconfig*.json               # Cấu hình TypeScript
│
├── README.md                        # Hướng dẫn cài đặt & chạy backend/frontend, link Swagger UI
└── (Git repo, cấu hình khác)        # .git, .gitignore, cấu hình Cursor/IDE (nếu có)
### Cài đặt & chạy backend

Yêu cầu: Python 3.10+ (khuyến nghị 3.12/3.13).

1) Vào thư mục backend:

```bash
cd Backend
```

2) Tạo và kích hoạt môi trường ảo:

Windows (PowerShell):

```powershell
Tạo môi trường:
    python -m venv venv
Kích hoạt môi trường:
    venv\Scripts\Activate.ps1
```

Nếu PowerShell chặn chạy script:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

3) Cài dependencies:

```bash
py -m pip install -r requirements.txt
```

4) Chạy server:

```bash
py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Swagger / OpenAPI

- Swagger UI: `http://localhost:8000/docs`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

### Auth (Bearer token)

Sau khi `POST /api/auth/login` hoặc `POST /api/auth/register`, lấy `token` và gửi header:

`Authorization: Bearer <token>`

## Frontend

Cấu hình API: tạo file `.env` trong thư mục Frontend (tuỳ chọn) với `VITE_API_URL=http://localhost:8000/api` nếu backend chạy ở URL khác.

### Cài đặt & chạy frontend

```bash
Bước 1:
    cd Frontend
Bước 2:
    npm install
Bước 3:
npm run dev
```
