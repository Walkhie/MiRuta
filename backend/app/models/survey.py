from pydantic import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer
from ..database import Base, engine

class Survey(Base):
    __tablename__ = 'survey'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    gustaCaminar: Mapped[str] = mapped_column()
    gustaCicla: Mapped[str] = mapped_column()
    ahorroComodidad: Mapped[str] = mapped_column()
    tiempoEspera: Mapped[str] = mapped_column()
    comuna: Mapped[str] = mapped_column()
