// src/user/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/contact/submit', formData);
      toast.success('Your query has been sent successfully! We will contact you soon.', {
        icon: 'Success',
        duration: 5000,
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    "General Inquiry",
    "Loan Application Help",
    "Document Verification",
    "EMI & Repayment",
    "Complaint / Grievance",
    "Partnership Opportunity",
    "Career / Job Inquiry",
    "Other"
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.section className="contact-hero">
        <div className="hero-overlay" />
        <div className="container">
          <motion.div className="hero-content">
            <div className="tagline">We're Here to Help</div>
            <h1>Contact Aadhar Capital Finance</h1>
            <p>Have questions? Our team is ready to assist you 24×7</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Premium Contact Form */}
      <section className="contact-section">
        <div className="container">
          <motion.h2 className="section-title-center">
            Send Us a Message
          </motion.h2>

          <motion.p className="section-intro-premium">
            Fill in your details and our team will reach out within 2 hours.
          </motion.p>

          <motion.div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              {/* Row 1: Name + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label><User size={18} /> Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><Mail size={18} /> Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone + Subject */}
              <div className="form-row">
                <div className="form-group">
                  <label><Phone size={18} /> Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><MessageSquare size={18} /> Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select subject</option>
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="form-row full">
                <div className="form-group">
                  <label><MessageSquare size={18} /> Your Query *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your query in detail..."
                    rows="7"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="submit-btn-premium">
                {loading ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={22} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="icon-circle"><Mail size={38} /></div>
              <h3>Email Support</h3>
              <p>support@aadharcapital.in</p>
            </div>
            <div className="info-card">
              <div className="icon-circle"><Phone size={38} /></div>
              <h3>Call Us</h3>
              <p>1800-123-4567 (Toll Free)</p>
            </div>
            <div className="info-card">
              <div className="icon-circle"><MapPin size={38} /></div>
              <h3>Head Office</h3>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;