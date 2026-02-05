# AURA – System for Retinal Vascular Health Screening

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
cd Frontend
npm install
npm run dev
```
