// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./context/AdminContext.jsx";
import { CheckCircle, XCircle } from "lucide-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔹 Enables SEO on all pages via Helmet */}
    <HelmetProvider>
      <BrowserRouter>
        <AdminProvider>
          <App />

          {/* 🔹 Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                icon: <CheckCircle size={24} color="white" />,
                style: {
                  background: "#10b981",
                  color: "white",
                },
              },
              error: {
                icon: <XCircle size={24} color="white" />,
                style: {
                  background: "#ef4444",
                  color: "white",
                },
              },
            }}
          />
        </AdminProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
