import dotenv from 'dotenv';
dotenv.config();

console.log("RESEND KEY:", process.env.RESEND_API_KEY);



import { configureCloudinary } from './utils/cloudinary.js';
configureCloudinary();
import express from 'express';
import prerender from 'prerender-node';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import userAuthRoutes from './routes/user/authRoutes.js';
import adminAuthRoutes from './routes/admin/authRoutes.js';
import adminLoanRoutes from './routes/admin/loanRoutes.js';
import userLoanRoutes from './routes/user/loanRoutes.js';
import contactRoutes from './routes/user/contactRoutes.js';

const app = express();

// --- ADD THIS SECTION START ---
// 1. Initialize Prerender

// 2. Set your Token (Paste the token you copied from Step 1)
prerender.set('prerenderToken', 'QaYY0ZNAYZa6JGCcdJ0M');

// 3. Forward 'https' protocol (Crucial for secure sites)
prerender.set('protocol', 'https');

// 4. Activate the middleware
app.use(prerender);
// --- ADD THIS SECTION END ---


console.log("=== SERVER FILE STARTED ===");


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // your local frontend port (Vite)
    "https://aadharcapitalfinance.vercel.app",
    "https://www.aadharcapitalfinance.com", 
    "https://aadharcapitalfinance.com",
    "http://localhost:5173",
    "http://localhost:5000"
    
  ],
  credentials: true,
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mount routes
app.use('/api/user', userAuthRoutes);
app.use('/api/admin', adminAuthRoutes);

app.use('/api/user/loan', userLoanRoutes);
app.use('/api/admin', adminLoanRoutes);

app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Loan Management System Backend is LIVE!</h1><p>Use Postman to test:</p><ul><li>POST /api/user/register</li><li>POST /api/user/login</li><li>POST /api/admin/login</li></ul>');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});