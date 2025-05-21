from pydantic import BaseModel
from sqlalchemy import Column, String, Integer
from ..database import Base, engine

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True )
    hashed_password = Column(String)


User.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    email: str
    password: str