import React from 'react';

interface CustomerData {
  lastName: string;
  firstName: string;
  phone: string;
}

interface Props {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
}

export default function CustomerSection({ data, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Dati del Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cognome
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recapito Telefonico
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
            required
          />
        </div>
      </div>
    </div>
  );
}