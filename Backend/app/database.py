# AURA Backend - In-memory store (replace with DB later)
import uuid
from datetime import datetime
from typing import Optional

# Users: id -> { id, email, hashed_password, name, role, status, avatar?, phone?, date_of_birth?, medical_history?, allergies?, credits }
users_db: dict = {}

# Packages: id -> { id, name, price, image_credits, duration, active }
packages_db: dict = {}

# Images: id -> { id, user_id, filename, upload_date, type, status }
images_db: dict = {}

# Results: id -> { id, image_id, user_id, risk_level, findings[], created_at, doctor_notes?, doctor_validated? }
results_db: dict = {}

# Payments: id -> { id, user_id, package_id, amount, date, status }
payments_db: dict = {}

# Clinics (users with role=clinic): id -> { user_id, doctors_count, patients_count, status }
# We use users_db for clinic users; status stored in user or separate clinic_profiles
clinic_profiles: dict = {}  # user_id -> { doctors, patients, status }

# Alerts: id -> { id, clinic_id, title, message, level, created_at }
alerts_db: dict = {}


def gen_id() -> str:
    return str(uuid.uuid4())[:8]


def init_seed_data():
    """Seed initial packages and optional admin user."""
    if not packages_db:
        for name, credits, price, duration in [
            ("Basic", 10, 29.99, 30),
            ("Standard", 25, 59.99, 30),
            ("Premium", 50, 99.99, 30),
        ]:
            pid = gen_id()
            packages_db[pid] = {
                "id": pid,
                "name": name,
                "price": price,
                "image_credits": credits,
                "duration": duration,
                "active": True,
            }
