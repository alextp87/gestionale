import { create } from 'zustand';
import { Order } from '../types/order';

interface OrdersState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  updateOrder: (orderId, updates) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    )
  }))
}));