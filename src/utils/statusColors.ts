import { OrderStatus } from '../types/order';

export const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, { bg: string; text: string }> = {
    RICAMBI_DA_ORDINARE: { bg: 'bg-violet-100', text: 'text-violet-800' },
    RICAMBI_ORDINATI: { bg: 'bg-blue-100', text: 'text-blue-800' },
    RICAMBI_ORDINATI_PARZIALMENTE: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    RICAMBI_ARRIVATI: { bg: 'bg-green-100', text: 'text-green-800' },
    RICAMBI_ARRIVATI_PARZIALMENTE: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    IN_ATTESA_DI_RITIRO_CLIENTE: { bg: 'bg-purple-100', text: 'text-purple-800' },
    ORDINE_COMPLETATO: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    ORDINE_ANNULLATO: { bg: 'bg-red-100', text: 'text-red-800' },
  };

  return colors[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
};