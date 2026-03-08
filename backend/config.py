from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
INSTANCE_DIR = BASE_DIR / "instance"
DATABASE_PATH = INSTANCE_DIR / "bandready.db"


class Config:
    SECRET_KEY = os.environ.get("FLASK_SECRET_KEY", "band-ready-dev-secret")
    DATABASE_PATH = DATABASE_PATH
    TEACHER_PIN = os.environ.get("BANDREADY_TEACHER_PIN", "3025")
    FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173")
