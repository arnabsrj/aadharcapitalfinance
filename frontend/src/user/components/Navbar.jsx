// src/user/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';  // ← ADD useNavigate
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';  // ← YE ADD KAR DE
import './Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  // ← Add this

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Documents & Eligibility', path: '/documents-eligibility' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleApplyClick = (e) => {
    e.preventDefault();
    navigate('/apply');  // ← This does smooth navigation
    setMobileOpen(false); // Close mobile menu
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="navbar-container">
        {/* Logo */}
      <Link to="/" className="logo">
  <img src="/assets/logo.jpeg" alt="Aadhar Capital Finance Logo" className="logo-img" />
  {/* <span className="logo-text">Aadhar Capital Finance</span> */}
</Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.span className="active-underline" layoutId="underline" />
              )}
            </Link>
          ))}

          {/* Apply Now Button - Now Works! */}
          <motion.button
            className="apply-btn"
            onClick={handleApplyClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
  className="mobile-toggle"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
>
  {mobileOpen ? <X size={28} /> : <Menu size={28} />}
</button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={mobileOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.4 }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active-mobile' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        
        <button className="apply-btn mobile" onClick={handleApplyClick}>
          Apply Now
        </button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;