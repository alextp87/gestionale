import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/dashboard/Dashboard';
import NewOrderForm from './components/orders/NewOrderForm';
import Header from './components/layout/Header';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/new"
          element={
            <PrivateRoute>
              <>
                <Header />
                <NewOrderForm />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}