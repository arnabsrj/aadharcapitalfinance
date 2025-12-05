// src/admin/pages/Customers.jsx → FINAL PROFESSIONAL BLUE + PAGINATION
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Phone, Mail, User, Eye, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Customers.css';
import AdminLayout from '../layout/AdminLayout';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid = 9 cards per page

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/user/loan/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(res.data.customers || []);
    } catch (err) {
      alert('Error loading customers');
    } finally {
      setLoading(false);
    }
  };

  // Search Filter
  const filtered = customers.filter(c =>
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm) ||
    c.email?.toLowerCase().includes(searchTerm)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusClass = (status) => status.toLowerCase().replace(/\s+/g, '-');

  return (
    <AdminLayout>
      <div className="customers-pro-container">

        {/* Header */}
        <div className="pro-header">
          <div>
            <h1>All Customers</h1>
            <p>{filtered.length} total applicants</p>
          </div>
          <div className="search-wrapper">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, phone, email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="loading-pro">
            <div className="spinner-pro"></div>
            <p>Loading customers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="no-data-pro">
            <User size={64} />
            <h3>No customers found</h3>
            <p>Try adjusting your search</p>
          </div>
        ) : (
          <>
            {/* Customers Grid - 2 to 3 per row */}
            <div className="customers-pro-grid">
              {currentData.map((c) => (
                <div key={c._id} className="customer-card-pro">
                  <div className="card-header-pro">
                    <div className="name-section">
                      <div className="avatar-circle">
                        <User size={20} />
                      </div>
                      <div>
                        <h3>{c.fullName}</h3>
                        <span className="phone">{c.phone}</span>
                      </div>
                    </div>
                    <span className={`status-pill ${getStatusClass(c.status)}`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <Mail size={14} /> <span>{c.email}</span>
                    </div>
                    <div className="detail-row">
                      <strong>PAN:</strong> {c.panNumber}
                    </div>
                    <div className="detail-row loan-amount">
                      <IndianRupee size={16} />
                      {Number(c.loanAmount).toLocaleString('en-IN')} <small>({c.loanType})</small>
                    </div>
                  </div>

                  <Link to={`/admin/application/${c._id}`} className="view-btn-pro">
                    <Eye size={16} /> View Application
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-pro">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
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

export default Customers;