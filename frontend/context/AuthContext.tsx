"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

type LoginData = {
    email: string;
    password: string;
};

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
        setError(null);
        const response = await api.post('/users/login', data);
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        router.push('/');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (data: RegisterData) => {
    try {
        setError(null);
        const response = await api.post('/users', data);
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        router.push('/');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
