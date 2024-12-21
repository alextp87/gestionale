import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { OrderItem } from '../../../types/order';

interface Props {
  parts: OrderItem[];
  onChange: (parts: OrderItem[]) => void;
}

export default function PartsSection({ parts, onChange }: Props) {
  const addPart = () => {
    onChange([...parts, {
      id: (parts.length + 1).toString(),
      partNumber: '',
      description: '',
      quantity: 1,
      price: 0,
      received: 0
    }]);
  };

  const updatePart = (index: number, updates: Partial<OrderItem>) => {
    const newParts = [...parts];
    newParts[index] = { ...newParts[index], ...updates };
    onChange(newParts);
  };

  const removePart = (index: number) => {
    onChange(parts.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Ricambi da Ordinare</h2>
        <button
          type="button"
          onClick={addPart}
          className="flex items-center text-violet-600 hover:text-violet-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Aggiungi Ricambio
        </button>
      </div>

      <div className="space-y-4">
        {parts.map((part, index) => (
          <div key={part.id} className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Codice
              </label>
              <input
                type="text"
                value={part.partNumber}
                onChange={(e) => updatePart(index, { partNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione
              </label>
              <input
                type="text"
                value={part.description}
                onChange={(e) => updatePart(index, { description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantità
              </label>
              <input
                type="number"
                min="1"
                value={part.quantity}
                onChange={(e) => updatePart(index, { quantity: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Importo €
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={part.price}
                onChange={(e) => updatePart(index, { price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                required
              />
            </div>
            <div className="col-span-1 pt-7">
              {parts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePart(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}