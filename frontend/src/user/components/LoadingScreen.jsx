import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css'; // CSS file neeche diya hai

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* ACP - Big Bold */}
        <motion.div
          className="logo-acp"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          ACP
        </motion.div>

        {/* Full Name - Sliding from Right to Left */}
       <motion.div
  className="logo-text"
 initial={{ x: '100%', opacity: 0 }}  // ← '100%' parent ke relative hota hai
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.4, ease: 'easeInOut' }}
>
  Aadhar Capital Finance
</motion.div>

        {/* Optional Subtle Loader */}
        <motion.div
          className="loader-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;