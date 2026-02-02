# AURA Backend - Pydantic models (match Frontend types)
from enum import Enum
from typing import Optional, Literal
from pydantic import BaseModel


class UserRole(str, Enum):
    user = "user"
    doctor = "doctor"
    clinic = "clinic"
    admin = "admin"
RiskLevel = Literal["low", "medium", "high", "critical"]
ImageType = Literal["Fundus", "OCT"]
ImageStatus = Literal["pending", "processing", "completed", "failed"]
UserStatus = Literal["active", "disabled", "pending"]
ClinicStatus = Literal["approved", "pending", "suspended"]


# --- Auth ---
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: UserRole


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: UserRole
    avatar: Optional[str] = None


class AuthResponse(BaseModel):
    user: UserResponse
    token: str


# --- User ---
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[str] = None
    medical_history: Optional[str] = None
    allergies: Optional[str] = None


class UserListResponse(BaseModel):
    id: str
    name: str
    email: str
    role: UserRole
    status: UserStatus


class UserStatusUpdate(BaseModel):
    status: UserStatus


# --- Retinal Image ---
class RetinalImageResponse(BaseModel):
    id: str
    filename: str
    upload_date: str
    type: ImageType
    status: ImageStatus


# --- Diagnostic Result ---
class DiagnosticResultResponse(BaseModel):
    id: str
    image_id: str
    risk_level: RiskLevel
    findings: list[str]
    annotated_image_url: Optional[str] = None
    created_at: str
    doctor_notes: Optional[str] = None
    doctor_validated: Optional[bool] = None


# --- Patient (for doctor/clinic) ---
class PatientResponse(BaseModel):
    id: str
    name: str
    email: str
    risk_level: RiskLevel
    last_analysis_date: Optional[str] = None


# --- Service Package ---
class ServicePackageResponse(BaseModel):
    id: str
    name: str
    price: float
    image_credits: int
    duration: int
    active: Optional[bool] = True


class ServicePackageCreate(BaseModel):
    name: str
    price: float
    image_credits: int
    duration: int


class ServicePackageUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    image_credits: Optional[int] = None
    duration: Optional[int] = None
    active: Optional[bool] = None


# --- Payment ---
class PaymentHistoryResponse(BaseModel):
    id: str
    amount: float
    date: str
    package_name: str
    status: Literal["completed", "pending", "failed"]


class PurchaseRequest(BaseModel):
    package_id: str


# --- Clinic (admin) ---
class ClinicResponse(BaseModel):
    id: str
    name: str
    email: str
    doctors: int
    patients: int
    status: ClinicStatus


class ClinicStatusUpdate(BaseModel):
    status: ClinicStatus


# --- Dashboard stats ---
class UserDashboardStats(BaseModel):
    remaining_credits: int
    total_analyses: int
    high_risk_cases: int
    pending_results: int
    recent_results: list


class ClinicDashboardStats(BaseModel):
    total_doctors: int
    total_patients: int
    images_analyzed: int
    remaining_credits: int
    high_risk_patients: int
    recent_alerts: list


class AdminDashboardStats(BaseModel):
    total_users: int
    total_doctors: int
    total_clinics: int
    total_images: int
    revenue: float
    ai_accuracy: float
    risk_distribution: dict
    recent_activity: list


# --- Alerts ---
class AlertResponse(BaseModel):
    id: str
    title: str
    message: str
    level: Literal["high-risk", "medium-risk", "info"]
    created_at: str
