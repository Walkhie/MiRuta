# schemas/survey.py
from pydantic import BaseModel

class SurveyCreate(BaseModel):
    gusta_caminar: str
    gusta_cicla: str
    ahorro_comodidad: str
    tiempo_espera: str
    comuna: str
