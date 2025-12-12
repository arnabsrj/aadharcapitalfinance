// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext.jsx";  // ← ADD THIS
import { CheckCircle, XCircle } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>

    <BrowserRouter>
      <AdminProvider>
        <App />
        {/* YE LINE ADD KAR DE — SABSE NECHE */}
     <Toaster
  position="top-center"
  toastOptions={{
    success: {
      icon: <CheckCircle size={24} color="white" />,
      style: {
        background: '#10b981',
        color: 'white',
      },
    },
    error: {
      icon: <XCircle size={24} color="white" />,
      style: {
        background: '#ef4444',
        color: 'white',
      },
    },
  }}
/>
      </AdminProvider>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>

);