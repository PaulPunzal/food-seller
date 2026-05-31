import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from './services/api';
import useAuthStore from './store/authStore';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const { setAuth, clearAuth, token, seller } = useAuthStore();
  const navigate = useNavigate();

  async function login(email, password) {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAuth(data.token, data.seller);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed. Check your credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAuth();
    toast('Logged out', { icon: '👋' });
    navigate('/login');
  }

  return {
    login,
    logout,
    loading,
    token,
    seller,
    isAuthenticated: !!token,
  };
}