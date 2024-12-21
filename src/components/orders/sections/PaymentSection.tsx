import React from 'react';

interface DepositData {
  hasDeposit: boolean;
  amount: number;
  date: string;
}

interface PaymentData {
  isPaid: boolean;
  date: string;
}

interface Props {
  totalAmount: number;
  remainingAmount: number;
  deposit: DepositData;
  payment: PaymentData;
  onDepositChange: (data: DepositData) => void;
  onPaymentChange: (data: PaymentData) => void;
}

export default function PaymentSection({
  totalAmount,
  remainingAmount,
  deposit,
  payment,
  onDepositChange,
  onPaymentChange
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pagamento</h2>
      
      <div className="space-y-6">
        {/* Deposit Section */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={deposit.hasDeposit}
              onChange={(e) => onDepositChange({ ...deposit, hasDeposit: e.target.checked })}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex-grow">
            <label className="font-medium text-gray-700">Acconto</label>
            {deposit.hasDeposit && (
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Acconto Lasciato (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={deposit.amount}
                    onChange={(e) => onDepositChange({ ...deposit, amount: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Acconto
                  </label>
                  <input
                    type="date"
                    value={deposit.date}
                    onChange={(e) => onDepositChange({ ...deposit, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={payment.isPaid}
              onChange={(e) => onPaymentChange({ ...payment, isPaid: e.target.checked })}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex-grow">
            <label className="font-medium text-gray-700">Ordine Saldato</label>
            {payment.isPaid && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Saldo
                </label>
                <input
                  type="date"
                  value={payment.date}
                  onChange={(e) => onPaymentChange({ ...payment, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-lg">
            <span className="font-medium">Totale Ordine:</span>
            <span className="font-bold">{totalAmount.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-medium">Rimanenza da Pagare:</span>
            <span className="font-bold text-violet-600">{remainingAmount.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}