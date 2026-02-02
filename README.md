# AURA – System for Retinal Vascular Health Screening

## Backend (FastAPI)

API base: `http://localhost:8000`. Tất cả route dưới prefix `/api`.

- **Auth:** `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`
- **Users:** `GET /api/users/me`, `PATCH /api/users/me`, `GET /api/users` (admin), `PATCH /api/users/:id/status` (admin)
- **Packages:** `GET /api/packages`, `GET /api/packages/payments`, `GET /api/packages/credits`, `POST /api/packages/purchase`, `GET/POST/PATCH /api/packages` (admin)
- **Images:** `POST /api/images/upload`, `GET /api/images`
- **Results:** `GET /api/results`, `GET /api/results/history`, `GET /api/results/:id`
- **Dashboard:** `GET /api/dashboard/stats`
- **Patients:** `GET /api/patients` (doctor/clinic)
- **Clinics:** `GET /api/clinics`, `PATCH /api/clinics/:id/approve|suspend` (admin)
- **Alerts:** `GET /api/alerts` (clinic)

Chạy backend:

   - Bước 1: Tạo môi trường ảo với Python (3.x)
     ## Windows:
     		python -m venv venv
     ## Unix/MacOS:
     		python3 -m venv venv
   - Bước 2: Kích hoạt môi trường:
     ## Windows:
     		venv\Scripts\activate
     ### Nếu xảy ra lỗi active .venv trên winos run powshell -->Administrator
         Set-ExecutionPolicy RemoteSigned -Force
     ## Unix/MacOS:
     		source venv/bin/activate
    - Bước 3: Cài đặt các thư viện cần thiết
     ## Install:
     		pip install -r requirements.txt
   - Bước 4: Chạy server
     ## Run:
     		uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   - Swagger UI: http://localhost:8000/docs

## Frontend

Cấu hình API: tạo file `.env` trong thư mục Frontend (tuỳ chọn) với `VITE_API_URL=http://localhost:8000/api` nếu backend chạy ở URL khác.

    - Bước 1: 
        cd frontend
    - Bước 2:
        npm install       
    - Bước 3: 
        npm run build      
    - Bước 4: 
        npm run dev   
