import React, { useEffect, useState } from 'react';
import { AuthContext } from './authContext.js';
import { authApi } from '../api';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('bloodconnect_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await authApi.me();
      setUser(data);
    } catch {
      localStorage.removeItem('bloodconnect_token');
      localStorage.removeItem('bloodconnect_user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const createUser = async (email, password, extra = {}) => {
    const { data } = await authApi.register({ email, password, ...extra });
    localStorage.setItem('bloodconnect_token', data.token);
    setUser(data.user);
    return data;
  };

  const signInUser = async (email, password) => {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem('bloodconnect_token', data.token);
    setUser(data.user);
    return data;
  };

  const signOutUser = () => {
    localStorage.removeItem('bloodconnect_token');
    localStorage.removeItem('bloodconnect_user');
    setUser(null);
  };

  const authData = {
    user,
    setUser,
    createUser,
    signInUser,
    signOutUser,
    loading,
    setLoading,
    refreshUser: loadUser,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
}
