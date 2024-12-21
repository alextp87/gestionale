import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import CustomerSection from './sections/CustomerSection';
import PartsSection from './sections/PartsSection';
import PaymentSection from './sections/PaymentSection';
import NotesSection from './sections/NotesSection';
import { OrderItem } from '../../types/order';
import { useAuthStore } from '../../store/authStore';
import { useOrdersStore } from '../../store/ordersStore';
import { formatDateTime } from '../../utils/dateFormatter';

export default function NewOrderForm() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const addOrder = useOrdersStore(state => state.addOrder);

  const [customerData, setCustomerData] = useState({
    lastName: '',
    firstName: '',
    phone: ''
  });

  const [parts, setParts] = useState<OrderItem[]>([{
    id: '1',
    partNumber: '',
    description: '',
    quantity: 1,
    price: 0,
    received: 0
  }]);

  const [notes, setNotes] = useState('');
  const [deposit, setDeposit] = useState({
    hasDeposit: false,
    amount: 0,
    date: new Date().toISOString().split('T')[0]
  });
  const [payment, setPayment] = useState({
    isPaid: false,
    date: new Date().toISOString().split('T')[0]
  });

  const totalAmount = parts.reduce((sum, part) => sum + (part.quantity * part.price), 0);
  const remainingAmount = payment.isPaid ? 0 : (totalAmount - (deposit.hasDeposit ? deposit.amount : 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder = {
      id: crypto.randomUUID(),
      customerName: `${customerData.lastName} ${customerData.firstName}`,
      customerPhone: customerData.phone,
      items: parts,
      status: 'RICAMBI_DA_ORDINARE',
      totalAmount,
      notes,
      createdAt: formatDateTime(new Date()),
      updatedAt: formatDateTime(new Date()),
      createdBy: user?.username || 'unknown',
      deposit: deposit.hasDeposit ? {
        amount: deposit.amount,
        date: deposit.date
      } : null,
      payment: payment.isPaid ? {
        date: payment.date
      } : null
    };

    addOrder(newOrder);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuovo Ordine</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <CustomerSection
            data={customerData}
            onChange={setCustomerData}
          />

          <PartsSection
            parts={parts}
            onChange={setParts}
          />

          <NotesSection
            notes={notes}
            onChange={setNotes}
          />

          <PaymentSection
            totalAmount={totalAmount}
            remainingAmount={remainingAmount}
            deposit={deposit}
            payment={payment}
            onDepositChange={setDeposit}
            onPaymentChange={setPayment}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-violet-600 text-white px-6 py-2 rounded-md hover:bg-violet-700 transition-colors"
            >
              Salva Ordine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}