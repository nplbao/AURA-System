# AURA Backend - FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_seed_data
from app.routers import auth, users, packages, images, results, dashboard, patients, clinics, alerts
from app.models import RootResponse, HealthResponse

tags_metadata = [
    {"name": "auth", "description": "Authentication (login/register/me)"},
    {"name": "users", "description": "User profile and admin user management"},
    {"name": "packages", "description": "Service packages, purchase, credits and payments"},
    {"name": "images", "description": "Retinal image upload and listing"},
    {"name": "results", "description": "Diagnostic results and history"},
    {"name": "dashboard", "description": "Dashboard stats per role"},
    {"name": "patients", "description": "Patients list for doctor/clinic"},
    {"name": "clinics", "description": "Clinic management for admin"},
    {"name": "alerts", "description": "Clinic alerts"},
]

app = FastAPI(
    title="AURA System API",
    description="Backend API for AURA retinal analysis system",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prefix /api for all routes
API_PREFIX = "/api"

app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(users.router, prefix=API_PREFIX)
app.include_router(packages.router, prefix=API_PREFIX)
app.include_router(images.router, prefix=API_PREFIX)
app.include_router(results.router, prefix=API_PREFIX)
app.include_router(dashboard.router, prefix=API_PREFIX)
app.include_router(patients.router, prefix=API_PREFIX)
app.include_router(clinics.router, prefix=API_PREFIX)
app.include_router(alerts.router, prefix=API_PREFIX)


@app.on_event("startup")
def startup():
    init_seed_data()


@app.get("/", response_model=RootResponse)
def root():
    return {"message": "AURA System API", "docs": "/docs"}


@app.get("/api/health", response_model=HealthResponse)
def health():
    return {"status": "ok"}
