from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderItemBase(BaseModel):
    part_number: str
    description: str
    quantity: int
    price: float
    received: int = 0

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: str
    order_id: str

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    status: str
    total_amount: float
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: str
    created_at: datetime
    updated_at: datetime
    items: List[OrderItem]

    class Config:
        from_attributes = True