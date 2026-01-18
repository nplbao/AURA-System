#System for Retinal Vascular Health Screening 
## Backend
   - Bước 1: Tạo môi trường ảo co Python (phiên bản 3.x)
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
## Frontend 
    - Bước 1: 
        cd frontend
    - Bước 2:
        npm install       
    - Bước 3: 
        npm run build      
    - Bước 4: 
        npm run dev   
