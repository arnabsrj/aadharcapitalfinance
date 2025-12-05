// src/admin/pages/LoanApplications.jsx → FINAL PROFESSIONAL VERSION
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import axios from 'axios';
import { Download, Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/LoanApplications.css';

const StatusBadge = ({ status }) => {
  const colorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Under Review': 'bg-blue-100 text-blue-800 border-blue-200',
    'Approved': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200'
  };
  return (
    <span className={`status-badge-pro ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const AdminLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const delayFn = setTimeout(() => {
      fetchApplications();
    }, 400);
    return () => clearTimeout(delayFn);
  }, [currentPage, search]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/loans`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: itemsPerPage, search }
      });
      setApplications(res.data.applications || []);
      setTotalPages(res.data.pagination?.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application permanently?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/loans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchApplications();
      alert("Deleted successfully!");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const exportCSV = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/loans/export/csv`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `loan-applications-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (err) {
      alert('Export failed');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AdminLayout>
      <div className="loan-apps-container">

        {/* Header */}
        <div className="apps-header">
          <div>
            <h1>Loan Applications</h1>
            <p>{applications.length} applications • Page {currentPage} of {totalPages}</p>
          </div>
          <button onClick={exportCSV} className="export-btn-pro">
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Search */}
        <div className="search-container">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search by name, phone, email, ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="loading-pro">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">No applications</div>
            <p>No loan applications found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="table-wrapper">
              <table className="applications-table-pro">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Applicant</th>
                    <th>Contact</th>
                    <th>Loan Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id} className="app-row">
                      <td>
                        <span className="app-id">#{app._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td>
                        <div className="applicant-info">
                          <strong>{app.fullName}</strong>
                          <small>{app.fatherName}</small>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          {app.phone}<br />
                          <span className="text-gray-500">{app.email}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>₹{Number(app.loanAmount).toLocaleString('en-IN')}</strong><br />
                          <small className="text-gray-600">{app.loanType}</small>
                        </div>
                      </td>
                      <td>
                        <StatusBadge status={app.status} />
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => navigate(`/admin/application/${app._id}`)}
                            className="action-btn view"
                            title="View"
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="action-btn delete"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cards">
              {applications.map(app => (
                <div key={app._id} className="mobile-card">
                  <div className="mobile-card-header">
                    <div>
                      <strong>{app.fullName}</strong>
                      <span className="mobile-id">#{app._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="mobile-card-body">
                    <p><strong>Phone:</strong> {app.phone}</p>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Loan:</strong> ₹{Number(app.loanAmount).toLocaleString('en-IN')} ({app.loanType})</p>
                  </div>
                  <div className="mobile-card-footer">
                    <button onClick={() => navigate(`/admin/application/${app._id}`)} className="mobile-view-btn">
                      View Application
                    </button>
                    <button onClick={() => handleDelete(app._id)} className="mobile-delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-pro">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminLoanApplications;