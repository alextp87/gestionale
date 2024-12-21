from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from . import models, schemas
import uuid

# Security configuration
SECRET_KEY = "your-secret-key-here"  # In production, use a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

def get_orders_summary(db: Session):
    to_process = db.query(models.Order).filter(
        models.Order.status.in_(["RICAMBI_DA_ORDINARE", "RICAMBI_ORDINATI_PARZIALMENTE"])
    ).count()
    
    arrived = db.query(models.Order).filter(
        models.Order.status.in_(["RICAMBI_ARRIVATI", "RICAMBI_ARRIVATI_PARZIALMENTE"])
    ).count()
    
    awaiting_pickup = db.query(models.Order).filter(
        models.Order.status == "IN_ATTESA_DI_RITIRO_CLIENTE"
    ).count()
    
    return {
        "to_process": to_process,
        "arrived": arrived,
        "awaiting_pickup": awaiting_pickup
    }

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        id=str(uuid.uuid4()),
        **order.dict(exclude={'items'})
    )
    db.add(db_order)
    
    for item in order.items:
        db_item = models.OrderItem(
            id=str(uuid.uuid4()),
            order_id=db_order.id,
            **item.dict()
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()