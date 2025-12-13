import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-label="Loading Aadhar Capital Finance Website"
    >
      <div className="loading-content">

        {/* 🔹 Brand Initials (Visual Only) */}
        <motion.div
          className="logo-acp"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          ACF
        </motion.div>

        {/* 🔹 SEO-Readable Brand Name */}
        <motion.h1
          className="logo-text"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          Aadhar Capital Finance
        </motion.h1>

        {/* 🔹 SEO Supporting Text */}
        <p className="loading-tagline">
          RBI Registered NBFC · Instant Online Loan Application
        </p>

        {/* 🔹 Subtle Loader */}
        <motion.div
          className="loader-bar"
          aria-hidden="true"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
