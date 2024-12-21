import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Car } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Car className="w-8 h-8 text-violet-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">
              Sistema Gestione Ordini
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Esci
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}