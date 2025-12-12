// src/user/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Contact.css';
import { Helmet } from 'react-helmet-async';

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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`, formData);
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


  const domain = "https://www.aadharcapitalfinance.com";
  const officialName = "Aadhar Capital Finance Private Limited";

  // JSON-LD structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: officialName,
    url: domain,
    logo: `${domain}/logo.png`,
    telephone: "+91-18001234567",
    address: { "@type": "PostalAddress", addressLocality: "Hisar", addressRegion: "Haryana", addressCountry: "IN" },
    sameAs: ["https://www.facebook.com/yourpage", "https://www.linkedin.com/company/yourcompany"]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us - Aadhar Capital Finance",
    url: `${domain}/contact`,
    description: "Contact Aadhar Capital Finance for loan queries, office address, and customer support information."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I contact Aadhar Capital Finance?",
        acceptedAnswer: { "@type": "Answer", text: "You can contact us via email at support@aadharcapital.in, call 1800-123-4567, or fill out the contact form on our website." }
      },
      {
        "@type": "Question",
        name: "Where is your head office located?",
        acceptedAnswer: { "@type": "Answer", text: "Our head offices are in Haryana and Maharashtra, serving customers across India." }
      },
      {
        "@type": "Question",
        name: "What are the working hours?",
        acceptedAnswer: { "@type": "Answer", text: "Our customer support is available 24x7 via phone, email, and WhatsApp." }
      }
    ]
  };


  return (
    <>

    <Helmet>
        <title>Contact Aadhar Capital Finance — Customer Care & Office Address</title>
        <meta name="description" content="Contact Aadhar Capital Finance for personal, business, home & gold loan queries. Visit our offices or call our 24x7 support." />
        <meta name="keywords" content="Aadhar Capital Finance contact, customer support, loan queries, RBI registered NBFC" />
        <link rel="canonical" href={`${domain}/contact`} />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Aadhar Capital Finance — Trusted NBFC" />
        <meta property="og:description" content="Reach out to Aadhar Capital Finance for any loan-related questions. 24x7 support available." />
        <meta property="og:url" content={`${domain}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${domain}/og-contact.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Aadhar Capital Finance — Trusted NBFC" />
        <meta name="twitter:description" content="Reach out to Aadhar Capital Finance for personal or business loan support." />
        <meta name="twitter:image" content={`${domain}/og-contact.jpg`} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(contactPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>



<motion.section className="contact-hero">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg")',  // ← TERA IMAGE PATH
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }} />

  {/* Light Green Overlay */}
  <div className="hero-overlay" style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(64,81,59,0.38), rgba(96,153,102,0.32))',
    zIndex: 1
  }} />

  <div className="container">
    <motion.div 
      className="hero-content"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}
    >
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
                    placeholder="loan@gmail.com"
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
                    placeholder="1234567890"
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
              <p>Haryana, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;