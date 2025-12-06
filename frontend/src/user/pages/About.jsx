// src/user/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lightbulb, PiggyBank, Headphones, ArrowRight, SearchIcon } from 'lucide-react';
import { Shield, Award, Users, Target, HeartHandshake, Building2, CheckCircle, Quote } from 'lucide-react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

   const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { num: '27+', label: 'Years of Expertise' },
    { num: '25,000+', label: 'Loans Approved' },
    { num: '22,400+', label: 'Satisfied Clients' },
  ];

  const testimonials = [
    { 
      name: 'Rohit Sharma', 
      role: 'Salaried Professional', 
      quote: 'Aadhar Capital Finance made my loan approval so easy. The process was smooth, and I received the funds within 24 hours. Truly reliable and transparent service.',
      loan: 'Personal Loan'
    },
    { 
      name: 'Neha Verma', 
      role: 'Entrepreneur', 
      quote: 'I needed funds to expand my small business. Thanks to Aadhar Capital, the loan process was simple, and the interest rates were affordable. Highly recommended!',
      loan: 'Business Loan'
    },
    { 
      name: 'Amit Khanna', 
      role: 'Home Buyer', 
      quote: 'The team explained everything clearly and guided me step by step. With their support, I was able to purchase my first home without stress. Excellent service!',
      loan: 'Home Loan'
    },
    { 
      name: 'Sonia Gupta', 
      role: 'Teacher', 
      quote: 'I was impressed with the quick documentation process. Within two days my loan was verified and approved. Aadhar Capital really values their customers.',
      loan: 'Education Loan'
    },
    { 
      name: 'Vikram Singh', 
      role: 'Small Investor', 
      quote: 'Their team is supportive and transparent. No hidden charges, no delays – just a smooth and professional experience from start to finish.',
      loan: 'Mortgage Loan'
    }
  ];

  return (
    <>
    

      {/* Hero – Starts from Top */}
   <section className="about-hero">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/8293768/pexels-photo-8293768.jpeg")',  // ← TERA IMAGE PATH
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }} />

  {/* Light Green Overlay — Image clear dikhega, text readable */}
  <div className="hero-overlay" style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(64,81,59,0.38), rgba(96,153,102,0.38))',
    zIndex: 1
  }} />

  <div className="container">
    <motion.div 
      className="hero-content" 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
    >
      <div className="tagline">Trusted by Thousands</div>
      <h1>About Aadhar Capital Finance</h1>
      <p className="subtitle">
        Your reliable financial partner since 1998 — Delivering transparent, fast, and affordable loan solutions across India
      </p>
      <div className="hero-cta">
        <button 
          className="btn-primary" 
           onClick={() => navigate('/apply')}
        >
          Apply for Loan <ArrowRight size={20} />
        </button>
        <a href="/track" className="btn-secondary">
          <SearchIcon size={20} /> Track Application
        </a>
      </div>
    </motion.div>
  </div>
</section>

      {/* Company Overview – ULTIMATE PROFESSIONAL & CLEAN */}
      <section className="overview-section ultimate">
        <div className="container">
          <motion.h2 
            className="section-title-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Aadhar Capital Finance
          </motion.h2>

          <motion.p 
            className="overview-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            A trusted RBI-Registered NBFC empowering Indians with fast, transparent, and affordable loans since 1998.
          </motion.p>

          <div className="overview-flex">
            {/* Left: Content */}
            <motion.div 
              className="overview-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="overview-text-block">
                <p>
                  Aadhar Capital Finance Private Limited is a <strong>Reserve Bank of India registered NBFC</strong> (Reg. No. B-14.02876) dedicated to financial inclusion through ethical, digital-first lending.
                </p>
                <p>
                  Headquartered in Haryana, we offer a complete range of retail and business loans — Personal, Business, Home, Education, and Gold Loans — with instant approvals, minimal documentation, and competitive interest rates.
                </p>
              </div>

              {/* Elegant Stats */}
              <div className="stats-elegant">
                {[
                  { value: "27+", label: "Years of Excellence" },
                  { value: "25,000+", label: "Loans Disbursed" },
                  { value: "₹500+ Cr", label: "Assets Under Management" },
                  { value: "98.7%", label: "Customer Satisfaction" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="stat-elegant-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual Card */}
            <motion.div 
              className="overview-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="company-card">
                <div className="card-header">
                  <Building2 size={64} />
                  <div className="location">
                    <span className="city">Haryana, India</span>
                    <span className="tagline">Corporate Headquarters</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <span className="label">CIN</span>
                    <span className="value">U67190DL1995PTC071817</span>
                  </div>
                  <div className="info-row">
                    <span className="label">RBI Registration</span>
                    <span className="value">B-14.02876</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Serving</span>
                    <span className="value">Pan India • 18+ States</span>
                  </div>
                </div>

                <div className="rbi-seal">
                  <Shield size={36} />
                  <div>
                    <strong>RBI Registered</strong>
                    <small>Non-Banking Financial Company</small>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

          {/* Mission, Vision & Values – FINAL PREMIUM & CENTERED */}
      <section className="mv-section premium">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title-center"
          >
            Our Mission, Vision & Core Values
          </motion.h2>

          <div className="mv-grid-premium">
            {/* Mission */}
            <motion.div 
              className="mv-card-premium mission"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mv-icon-wrapper mission">
                <Target size={48} />
              </div>
              <h3>Our Mission</h3>
              <p>To empower every Indian with simple, fast, and transparent financial solutions that help achieve personal and business dreams.</p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="mv-card-premium vision"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mv-icon-wrapper vision">
                <Building2 size={48} />
              </div>
              <h3>Our Vision</h3>
              <p>To become India’s most trusted and customer-first NBFC, setting new standards in ethical lending and digital innovation.</p>
            </motion.div>

            {/* Values */}
            <motion.div 
              className="mv-card-premium values"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mv-icon-wrapper values">
                <HeartHandshake size={48} />
              </div>
              <h3>Our Core Values</h3>
              <ul className="values-list-premium">
                <li><CheckCircle size={22} /> Transparency in every step</li>
                <li><CheckCircle size={22} /> Customer success first</li>
                <li><CheckCircle size={22} /> Ethical & responsible lending</li>
                <li><CheckCircle size={22} /> Innovation with integrity</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
       {/* Why Choose Us – FINAL PREMIUM & CENTERED */}
      <section className="why-section premium">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title-center"
          >
            Why Choose Aadhar Capital Finance
          </motion.h2>

          <motion.p 
            className="section-intro-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Trusted by thousands. Approved in minutes. Built on transparency.
          </motion.p>

          <div className="why-grid-premium">
            {[
              {
                icon: "Lightbulb",
                title: "Simple & Transparent",
                desc: "100% digital process • No hidden fees • Clear terms from day one"
              },
              {
                icon: "PiggyBank",
                title: "Lowest Rates Guaranteed",
                desc: "Starting @ 7.99% p.a. • Flexible tenure • Save thousands in interest"
              },
              {
                icon: "Headphones",
                title: "24×7 Customer Support",
                desc: "Instant help via call, chat & WhatsApp • Dedicated relationship manager"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="why-card-premium"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="why-icon-circle">
                  {item.icon === "Lightbulb" && <Lightbulb size={36} />}
                  {item.icon === "PiggyBank" && <PiggyBank size={36} />}
                  {item.icon === "Headphones" && <Headphones size={36} />}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials – FINAL PREMIUM & CENTERED */}
      <section className="testimonials-section final">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title-center"
          >
            What Our Customers Say
          </motion.h2>

          <div className="testimonials-grid-final">
            {[
              {
                name: "Rohit Sharma",
                role: "Salaried Professional",
                quote: "Got ₹5 Lakh Personal Loan in just 24 hours. 100% online, zero paperwork, completely transparent!",
                rating: "★★★★★"
              },
              {
                name: "Neha Verma",
                role: "Business Owner",
                quote: "Expanded my boutique with their Business Loan. Lowest rates + no hidden charges. Truly the best!",
                rating: "★★★★★"
              },
              {
                name: "Amit Khanna",
                role: "Home Buyer",
                quote: "Dream home made possible with their Home Loan. Fast approval, helpful team — highly recommend!",
                rating: "★★★★★"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                className="testimonial-card-final"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Quote size={44} className="quote-mark" />
                <p className="testimonial-quote">"{t.quote}"</p>
                
                <div className="testimonial-footer">
                  <div className="author-details">
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                  </div>
                  <div className="stars">{t.rating}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
          {/* Certifications – SUPER CONCISE & CENTERED */}
      <section className="certifications-section concise">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title-center"
          >
            Trust & Compliance
          </motion.h2>

          <motion.div 
            className="certs-concise-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="cert-item">
              <Shield size={42} color="#9DC08B" />
              <div>
                <strong>RBI Registered NBFC</strong><br />
                <span>Reg No: B-14.02876</span>
              </div>
            </div>

            <div className="cert-item">
              <Award size={42} color="#9DC08B" />
              <div>
                <strong>ISO 9001:2015</strong><br />
                <span>Quality Certified</span>
              </div>
            </div>

            <div className="cert-item">
              <Users size={42} color="#9DC08B" />
              <div>
                <strong>FIDC Member</strong><br />
                <span>Finance Industry Council</span>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="cin-concise"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            CIN: <strong>U67190DL1995PTC071817</strong>
          </motion.p>
        </div>
      </section>

      {/* Grievance Redressal */}
          {/* Grievance Redressal – CONCISE & CENTERED */}
      <section className="grievance-section concise">
  <div className="container"> {/* Yeh class ab kaam karegi */}
    
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-title-center"
    >
      Grievance Redressal
    </motion.h2>

    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="grievance-text-concise"
    >
      As per RBI guidelines, we ensure <strong>fair, transparent & time-bound resolution</strong> of all complaints — 
      typically resolved within <strong>5 working days</strong>.
    </motion.p>

    {/* YE SABSE BEST WAY — BUTTON PERFECT CENTER MEIN */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="grievance-button-wrapper"
    >
      <button className="btn-primary grievance-btn-large">
        Contact Grievance Officer
      </button>
    </motion.div>

    <motion.p 
      className="rbi-note"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      Regulated by <strong>Reserve Bank of India</strong> | 100% Compliant
    </motion.p>
  </div>
</section>

     
    </>
  );
};

export default About;