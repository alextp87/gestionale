import React from 'react';

interface Props {
  notes: string;
  onChange: (notes: string) => void;
}

export default function NotesSection({ notes, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Note Interne</h2>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
        rows={4}
        placeholder="Note interne (non visibili al cliente)"
      />
    </div>
  );
}