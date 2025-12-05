// src/admin/layout/AdminLayout.jsx
import { useAdmin } from '../../context/AdminContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, FileText, Users, Shield } from 'lucide-react';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Shield size={40} />
          </div>
          <h1 className="sidebar-title">Aadhar Capital</h1>
          <p className="sidebar-subtitle">Admin Portal</p>
          <p className="admin-name">Welcome, {admin?.name || 'Admin'}</p>
        </div>

        <nav className="sidebar-menu">
          <Link 
            to="/admin/dashboard" 
            className={`menu-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <Home size={22} />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/admin/loan-applications"
            className={`menu-item ${location.pathname.startsWith('/admin/loan-applications') || location.pathname.includes('/admin/application/') ? 'active' : ''}`}
          >
            <FileText size={22} />
            <span>Loan Applications</span>
          </Link>

          <Link to="/admin/customers" className="menu-item">
            <Users size={22} />
            <span>Customers</span>
          </Link>
          
           <Link to="/admin/queries" className="menu-item">
            <Users size={22} />
            <span>Queries</span>
          </Link>
        </nav>

        <div className="logout-section">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="main-content-wrapper">
        <header className="top-header">
          <h2>Loan Applications Management</h2>
          <p>Review and approve customer loan requests</p>
        </header>
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;