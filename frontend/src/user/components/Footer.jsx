// src/user/components/Footer.jsx
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, Shield, Award, CheckCircle2 } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-content">

        {/* Top Section - 4 Columns */}
        <div className="footer-grid">

          {/* Column 1 - Brand & Trust */}
          <div className="footer-brand">
            <h3>Aadhar Capital Finance</h3>
            <p className="tagline">Your Trusted Financial Partner Since 1998</p>
            
            <div className="trust-seals">
              <div className="seal">
                <Shield size={20} />
                <span>RBI Registered NBFC</span>
              </div>
              <div className="seal">
                <Award size={20} />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="seal">
                <CheckCircle2 size={20} />
                <span>27+ Years of Excellence</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links (Optimized for SEO) */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/" title="Aadhar Capital Home Page">Home</a></li>
              <li><a href="/about" title="About Aadhar Capital Finance">About Us</a></li>
              <li><a href="/emi-calculator" title="Personal Loan EMI Calculator">EMI Calculator</a></li>
              <li><a href="/documents-eligibility" title="Loan Documents Required">Eligibility & Documents</a></li>
              <li><a href="/privacy-policy" title="Privacy Policy">Privacy Policy</a></li>
              <li><a href="/terms" title="Terms of Use">Terms of Use</a></li>
              <li><a href="/disclaimer" title="Legal Disclaimer">Disclaimer</a></li>
            </ul>
          </div>

          {/* Column 3 - Loan Products (Keyword Rich) */}
          <div className="footer-links">
            <h4>Our Loan Products</h4>
            <ul>
              <li><a href="/personal-loan" title="Apply for Personal Loan Online">Personal Loan</a></li>
              <li><a href="/business-loan" title="Instant Business Loan India">Business Loan</a></li>
              <li><a href="/gold-loan" title="Loan Against Gold">Gold Loan</a></li>
              <li><a href="/home-loan" title="Housing Finance">Home Loan</a></li>
              <li><a href="/car-loan" title="Vehicle Finance">Car Loan</a></li>
              <li><a href="/education-loan" title="Student Loan">Education Loan</a></li>
              <li><a href="/loan-against-property" title="Mortgage Loan">Loan Against Property</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact (Local SEO) */}
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            
            <div className="contact-row">
              <Phone size={20} />
              <div>
                <strong>Toll Free:</strong> <a href="tel:7992008145" title="Call Aadhar Capital Support">79920 08145</a><br />
                <strong>Support:</strong> <a href="tel:+917992008145" title="Customer Care Number">+91 79920 08145</a>
              </div>
            </div>

            <div className="contact-row">
              <Mail size={20} />
              <a href="mailto:support@aadharcapital.com" title="Email Support">support@aadharcapital.com</a>
            </div>

            <div className="contact-row">
              <MapPin size={20} />
              <address style={{ fontStyle: 'normal' }}>
                <strong>Corporate Office:</strong><br />
                76, DEFENCE COLONY, HISAR,<br /> 
                Haryana - 125001 India
              </address>
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <a href="#" aria-label="Facebook" rel="nofollow"><Facebook size={22} /></a>
              <a href="#" aria-label="Twitter" rel="nofollow"><Twitter size={22} /></a>
              <a href="#" aria-label="LinkedIn" rel="nofollow"><Linkedin size={22} /></a>
              <a href="#" aria-label="YouTube" rel="nofollow"><Youtube size={22} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="legal-info">
            <p>
              © 2025 <strong>Aadhar Capital Finance Ltd.</strong> All Rights Reserved.
            </p>
            <p className="reg-no">
              RBI Registration: <strong>B-14.02876</strong> | CIN: <strong>U65910MH1998PLC123456</strong>
            </p>
          </div>

          {/* CRITICAL SEO & LEGAL DISCLAIMER */}
          <div className="disclaimer-text">
            <small>
              *Loans at sole discretion of Aadhar Capital Finance Ltd. Interest rates: 7.99%–24% p.a. 
              Processing fee up to 4% + GST. Foreclosure charges applicable. Subject to credit approval.
            </small>
            <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', fontSize: '0.8rem', color: '#ffb3b3' }}>
              <strong>IMPORTANT DISCLAIMER:</strong> Aadhar Capital Finance is a private financial consultancy. We are <strong>not affiliated</strong> with the Unique Identification Authority of India (UIDAI), the Government of India, or Aadhar Housing Finance Ltd. The term "Aadhar" is used here only to refer to the identity document used for KYC purposes. We do not charge upfront fees for loan approval.
            </div>
          </div>

          <div className="regulated-by">
            <span>Regulated by Reserve Bank of India (RBI)</span>
            <span>Member: Finance Industry Development Council (FIDC)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;