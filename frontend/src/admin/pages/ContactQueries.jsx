// src/admin/pages/ContactQueries.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../layout/AdminLayout';
import { Mail, Phone, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueries();
    const interval = setInterval(fetchQueries, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/contact/queries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueries(res.data.queries);
    } catch (err) {
      toast.error('Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/contact/queries/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Status updated!');
      fetchQueries();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteQuery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query permanently?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contact/queries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Query deleted successfully!');
      fetchQueries();
    } catch (err) {
      toast.error('Failed to delete query');
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: '32px', background: '#f8fbf6', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1e3a8a', textAlign: 'center', marginBottom: '40px' }}>
          Customer Queries ({queries.length})
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px' }}>Loading queries...</div>
        ) : queries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>
            <Mail size={80} color="#9DC08B" />
            <p style={{ fontSize: '20px', marginTop: '20px' }}>No queries yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '28px', maxWidth: '1150px', margin: '0 auto' }}>
            {queries.map(q => (
              <div key={q._id} style={{
                background: 'white',
                borderRadius: '28px',
                padding: '32px',
                boxShadow: '0 15px 45px rgba(64,81,59,0.12)',
                border: '1px solid #e2e8d8',
                position: 'relative',
                overflow: 'hidden'
              }}>

                {/* TOP BAR: Status + Delete Button */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '60px',
                  background: 'linear-gradient(135deg, #1e293b, #1d4ed8)',
                  borderRadius: '28px 28px 0 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 32px',
                  color: 'white'
                }}>
                  {/* Status Badge */}
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '8px 18px',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {q.status === 'New' && <AlertCircle size={18} />}
                    {q.status === 'In Progress' && <Clock size={18} />}
                    {q.status === 'Resolved' && <CheckCircle size={18} />}
                    {q.status}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteQuery(q._id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 20px rgba(239,68,68,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.15)';
                      e.target.style.background = '#dc2626';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.background = '#ef4444';
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Main Content - Starts below top bar */}
                <div style={{ marginTop: '80px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#40513B', margin: '0 0 10px' }}>
                        {q.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '20px', color: '#555', fontSize: '16px', fontWeight: '500' }}>
                        <span><Mail size={18} /> {q.email}</span>
                        <span><Phone size={18} /> {q.phone}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', color: '#666', fontSize: '15px' }}>
                      <Clock size={16} /> {new Date(q.createdAt).toLocaleDateString('en-IN')} 
                      <br />
                      {new Date(q.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div style={{ margin: '24px 0', padding: '18px', background: '#f0f8f0', borderRadius: '18px', borderLeft: '6px solid #9DC08B' }}>
                    <strong style={{ color: '#40513B', fontSize: '16px' }}>Subject:</strong> {q.subject}
                  </div>

                  <div style={{ 
                    fontSize: '17px', 
                    lineHeight: '1.8', 
                    color: '#333', 
                    background: '#fafdfa', 
                    padding: '24px', 
                    borderRadius: '18px',
                    border: '1px dashed #d0e0c8'
                  }}>
                    {q.message}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {q.status !== 'Resolved' && (
                      <>
                        <button onClick={() => updateStatus(q._id, 'In Progress')} style={{
                          background: '#3b82f6', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '15px'
                        }}>
                          In Progress
                        </button>
                        <button onClick={() => updateStatus(q._id, 'Resolved')} style={{
                          background: '#10b981', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '15px'
                        }}>
                          <CheckCircle size={20} /> Mark as Resolved
                        </button>
                      </>
                    )}
                    {q.status === 'Resolved' && (
                      <div style={{ 
                        background: '#d1fae5', 
                        color: '#065f46', 
                        padding: '14px 32px', 
                        borderRadius: '14px', 
                        fontWeight: '800', 
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <CheckCircle size={28} /> Query Resolved
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContactQueries;