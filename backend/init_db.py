# backend/init_db.py

from app.database import Base, engine
import app.models.survey  # importa el modelo para que se registre en Base.metadata
import app.models.user

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Base de datos inicializada.")

if __name__ == "__main__":
    init_db()
