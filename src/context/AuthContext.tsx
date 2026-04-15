'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
  turma?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: { name: string; email: string; password: string; turma: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ana Carolina Silva', email: 'ana@colegiomarista.br', role: 'student', turma: '3º Ano A', bio: 'Redatora e fotógrafa' },
  { id: 'admin', name: 'Prof. Roberto', email: 'admin@colegiomarista.br', role: 'admin' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const stored = localStorage.getItem('conexao_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800)); // simulate network
    const found = MOCK_USERS.find(u => u.email === email);
    if (!found || password.length < 4) throw new Error('Credenciais inválidas');
    setUser(found);
    localStorage.setItem('conexao_user', JSON.stringify(found));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('conexao_user');
  };

  const register = async (data: { name: string; email: string; password: string; turma: string }) => {
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'student',
      turma: data.turma,
    };
    setUser(newUser);
    localStorage.setItem('conexao_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
