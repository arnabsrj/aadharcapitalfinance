// src/context/AdminContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in (on page refresh)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally verify token with backend /api/admin/profile
      setAdmin({ name: 'Admin' }); // temporary
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/admin/login', {
        email,
        password,
      });
      const { token, admin: adminData } = res.data.data;
      localStorage.setItem('adminToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAdmin(adminData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};