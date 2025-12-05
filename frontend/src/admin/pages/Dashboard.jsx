// src/admin/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import AdminLayout from '../layout/AdminLayout';
import axios from 'axios';
import { Users, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0, pending: 0, underReview: 0, approved: 0, rejected: 0
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats(res.data); // Direct full count milega
    } catch (err) {
      console.log("Failed to fetch stats");
    }
  };

  useEffect(() => {
    fetchStats();

    // Har 10 second mein update
    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '40px', textAlign: 'center', color: '#1e40af', fontWeight: '800' }}>
          Admin Dashboard
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(59,130,246,0.15)', border: '1px solid #dbeafe' }}>
            <FileText size={48} color="#3b82f6" />
            <h2 style={{ fontSize: '56px', margin: '16px 0', fontWeight: '900', color: '#1e40af' }}>
              {stats.total}
            </h2>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px' }}>Total Applications</p>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(251,191,36,0.15)', border: '1px solid #fef3c7' }}>
            <Clock size={48} color="#f59e0b" />
            <h2 style={{ fontSize: '56px', margin: '16px 0', fontWeight: '900', color: '#d97706' }}>
              {stats.pending}
            </h2>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px' }}>Pending</p>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(139,92,246,0.15)', border: '1px solid #e9d5ff' }}>
            <Users size={48} color="#8b5cf6" />
            <h2 style={{ fontSize: '56px', margin: '16px 0', fontWeight: '900', color: '#7c3aed' }}>
              {stats.underReview}
            </h2>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px' }}>Under Review</p>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(16,185,129,0.15)', border: '1px solid #d1fae5' }}>
            <CheckCircle size={48} color="#10b981" />
            <h2 style={{ fontSize: '56px', margin: '16px 0', fontWeight: '900', color: '#059669' }}>
              {stats.approved}
            </h2>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px' }}>Approved</p>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(239,68,68,0.15)', border: '1px solid #fee2e2' }}>
            <XCircle size={48} color="#ef4444" />
            <h2 style={{ fontSize: '56px', margin: '16px 0', fontWeight: '900', color: '#dc2626' }}>
              {stats.rejected}
            </h2>
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px' }}>Rejected</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;