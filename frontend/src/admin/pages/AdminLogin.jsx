// src/admin/pages/AdminLogin.jsx
import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';
import '../styles/AdminLogin.css';  // ← Its own CSS

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-logo">
          <Shield />
        </div>
        <h1 className="login-title">Aadhar Capital Finance</h1>
        <p className="login-subtitle">Admin Portal • Secure Access</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aadhar.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-field"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-login">
            <LogIn size={20} />
            {loading ? 'Signing In...' : 'Admin Login'}
          </button>
        </form>

        <p className="login-footer">
          © 2025 Aadhar Capital Finance • RBI Registered NBFC
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;