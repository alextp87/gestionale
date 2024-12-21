export type OrderStatus =
  | 'RICAMBI_DA_ORDINARE'
  | 'RICAMBI_ORDINATI'
  | 'RICAMBI_ORDINATI_PARZIALMENTE'
  | 'RICAMBI_ARRIVATI'
  | 'RICAMBI_ARRIVATI_PARZIALMENTE'
  | 'IN_ATTESA_DI_RITIRO_CLIENTE'
  | 'ORDINE_COMPLETATO'
  | 'ORDINE_ANNULLATO';

export interface OrderItem {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  received: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  notes?: string;
  deposit?: {
    amount: number;
    date: string;
  } | null;
  payment?: {
    date: string;
  } | null;
}