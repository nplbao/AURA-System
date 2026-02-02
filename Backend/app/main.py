# AURA Backend - FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_seed_data
from app.routers import auth, users, packages, images, results, dashboard, patients, clinics, alerts

app = FastAPI(
    title="AURA System API",
    description="Backend API for AURA retinal analysis system",
    version="1.0.0",
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


@app.get("/")
def root():
    return {"message": "AURA System API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}
