import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-violet-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-violet-600" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Accesso Dipendenti
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}