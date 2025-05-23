from fastapi import Depends, APIRouter, status
from sqlalchemy.orm import Session  # si usas SQLAlchemy

from app.models.survey import Survey
from app.schemas.survey import SurveyCreate
from app.database import SessionLocal
from app.main import verify_token


router = APIRouter(tags = ["Survey"])

# Crear encuesta

