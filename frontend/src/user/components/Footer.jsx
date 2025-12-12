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

          {/* Column 2 - Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/emi-calculator">EMI Calculator</a></li>
              <li><a href="/documents-eligibility">Eligibility & Documents</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>

          {/* Column 3 - Loan Products */}
          <div className="footer-links">
            <h4>Our Loan Products</h4>
            <ul>
              <li><a href="/personal-loan">Personal Loan</a></li>
              <li><a href="/business-loan">Business Loan</a></li>
              <li><a href="/gold-loan">Gold Loan</a></li>
              <li><a href="/home-loan">Home Loan</a></li>
              <li><a href="/car-loan">Car Loan</a></li>
              <li><a href="/education-loan">Education Loan</a></li>
              <li><a href="/loan-against-property">Loan Against Property</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            
            <div className="contact-row">
              <Phone size={20} />
              <div>
                <strong>Toll Free:</strong> <a href="tel: 6207373101">  79920 08145</a><br />
                <strong>Support:</strong> <a href="tel:+91 6207373101">+91  79920 08145</a>
              </div>
            </div>

            <div className="contact-row">
              <Mail size={20} />
              <a href="mailto:support@aadharcapital.com">support@aadharcapital.com</a>
            </div>

            <div className="contact-row">
              <MapPin size={20} />
              <div>
                <strong>Corporate Office:</strong><br />
                Address 76, DEFENCE COLONY, HISAR,<br /> 
                Haryana - 125001 India
              </div>
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><Facebook size={22} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={22} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={22} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={22} /></a>
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

          <div className="disclaimer-text">
            <small>
              *Loans at sole discretion of Aadhar Capital Finance Ltd. Interest rates: 7.99%–24% p.a. 
              Processing fee up to 4% + GST. Foreclosure charges applicable. Subject to credit approval.
            </small>
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