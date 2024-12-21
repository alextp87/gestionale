from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    name = Column(String)
    role = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True)
    customer_name = Column(String, index=True)
    customer_email = Column(String)
    customer_phone = Column(String)
    status = Column(String)
    total_amount = Column(Float)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True)
    order_id = Column(String, ForeignKey("orders.id"))
    part_number = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    received = Column(Integer, default=0)
    price = Column(Float)

    order = relationship("Order", back_populates="items")