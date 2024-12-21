import { create } from 'zustand';

interface AuthState {
  user: {
    id: string;
    username: string;
    name: string;
    role: string;
  } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Default credentials:
// username: admin
// password: admin123
const DEFAULT_USER = {
  id: '1',
  username: 'admin',
  password: 'admin123', // In production, this should be hashed
  name: 'Amministratore',
  role: 'admin'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username: string, password: string) => {
    if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
      const { password: _, ...user } = DEFAULT_USER;
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null })
}));