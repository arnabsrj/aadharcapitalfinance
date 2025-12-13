// src/user/pages/TrackApplication.jsx
import { useState } from 'react';
import { motion } from "framer-motion";

import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  Search, CheckCircle, Clock, XCircle, FileText, User, Phone, 
  Calendar, IndianRupee, MessageCircle, Clipboard, Shield 
} from 'lucide-react';
import './TrackApplication.css';
import { Helmet } from 'react-helmet-async';

const TrackApplication = () => {
  const [searchInput, setSearchInput] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      toast.error('Please enter Application ID or Phone Number', { icon: <XCircle size={20} /> });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/loan/track/${searchInput.trim()}`);
      setApplication(res.data.application);
      toast.success('Application found successfully!', {
        icon: <CheckCircle size={24} color="#9DC08B" />,
        duration: 5000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Application not found', {
        icon: <XCircle size={22} />,
        duration: 6000,
      });
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const copyId = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`, { icon: <Clipboard size={20} color="#9DC08B" /> });
  };




// ... inside component
// src/user/pages/TrackApplication.jsx

// src/user/pages/TrackApplication.jsx

  const generateAndDownloadPDF = async (type) => {
    if (!application) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // User Details to Fill
    const userName = (application.fullName || 'Guest').toUpperCase();
    const loanAmount = `${Number(application.loanAmount).toLocaleString('en-IN')}/-`;
    const date = new Date().toLocaleDateString('en-IN');
    const appId = application._id.slice(-8).toUpperCase();
    const phone = application.phone;
    const email = application.email;
   const userAddress = application.permanentAddress || application.currentAddress || 'Address Not Provided';

   // key fix: Get Identity & Bank Details
    const pan = application.panNumber || 'XXXX-XXXX';
    const aadhaar = application.aadhaarNumber || 'XXXX-XXXX-XXXX';
    const bank = application.bankName || 'Not Provided';
    const account = application.accountNumber || 'XXXX-XXXX';
    const tenure = Number(application.tenure) || 12;
    const ifsc = application.ifscCode || 'Not Provided'; 
    const fullAppId = application._id; 
    
    // const userName = (application.fullName || 'Guest').toUpperCase();




    // Helper to add text at coordinates
    const addText = (text, x, y, size = 12, bold = false, color = 'black', bgColor = null) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      // 2. Draw Background Rectangle (If bgColor is provided)
      if (bgColor) {
        const textWidth = doc.getTextWidth(String(text));
        const textHeight = size * 0.3527; // Convert points to mm roughly
        const padding = 2; // Extra space around text
        
        doc.setFillColor(bgColor); // Sets the box color (e.g., 'white')
        
        // Draw the rectangle slightly above the text baseline
        // args: (x, y, width, height, style) -> 'F' means Fill
        doc.rect(x - 0.5, y - textHeight - 1, textWidth + 1, textHeight + 3, 'F');
      }
      doc.setTextColor(color === 'black' ? '#40513B' : '#25A7DA');
      doc.text(String(text), x, y);
    };


    // Load Image Helper
 // Helper to load image with Error Handling
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log("Image loaded successfully:", src);
            resolve(img);
        };
        img.onerror = () => {
            console.error("FAILED to load image:", src);
            reject(new Error(`Could not load template: ${src}`));
        };
      });
    };

    try {
      let bgImage = null;

      // ===============================================
      // 1. NOC CERTIFICATE
      // ===============================================
      if (type === 'noc') {
        // Load your cleaned NOC template image
        console.log("Attempting to load NOC template...");
        bgImage = await loadImage('/assets/noc-letter.jpg'); 
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Overlay Data (Adjust X, Y numbers to fit your image exactly)
        addText(userName, 81, 90.3, 12,'blue', true, 'white');          // Name in "Mr. ____ has applied"
        // addText(loanAmount, 85, 95, 12, true, 'white');        // Amount in tax section if needed or loan amount
        // addText(appId, 150, 40, 10, true, 'white');            // ID at top
        // addText(date, 80, 113, 12, 'white');                   // Date
        addText(loanAmount, 145, 192, 13, true, 'white');      // Approved Amount bottom


        // // --- PAGE 2 ---
        // doc.addPage(); // <--- THIS ADDS THE NEW BLANK PAGE
        // console.log("Generating Page 2...");
        
        // bgImage = await loadImage('/assets/Agreement_2.jpg'); // Load Page 2 Image
        // doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // // Overlay Text for Page 2 (Bank Details, etc.)
        // // You have to find the correct X, Y coordinates for these:
        // addText(userName, 121, 133.1, 10);                // Name in table
        // // addText(application.panNumber, 90, 65, 10);   // PAN
        // // addText(application.aadhaarNumber, 90, 72, 10); // Aadhaar
        // addText(userName, 107, 152, 10);                // Name in table
        // // addText(application.bankName, 90, 80, 10);    // Bank Name
        // // addText(application.accountNumber, 90, 88, 10); // Account No
        // // addText('Rs. 4,280', 50, 130, 11, true);      // EMI Amount (Example)
        // // 
        
        // // --- PAGE 3---
        // doc.addPage(); // <--- THIS ADDS THE NEW BLANK PAGE
        // console.log("Generating Page 2...");
        
        // bgImage = await loadImage('/assets/Agreement_3.jpg'); // Load Page 2 Image
        // doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // // Overlay Text for Page 2 (Bank Details, etc.)
        // // You have to find the correct X, Y coordinates for these:
        // addText(userName, 90, 55, 10);                // Name in table
        // addText(application.panNumber, 90, 65, 10);   // PAN
        // addText(application.aadhaarNumber, 90, 72, 10); // Aadhaar
        // addText(application.bankName, 90, 80, 10);    // Bank Name
        // addText(application.accountNumber, 90, 88, 10); // Account No
        // addText('Rs. 4,280', 50, 130, 11, true);      // EMI Amount (Example)
      }

      // ===============================================
      // 2. SANCTION / APPROVAL LETTER
      // ===============================================
    // ===============================================
      // 2. SANCTION / APPROVAL LETTER (3 PAGES)
      // ===============================================
      else if (type === 'sanctionLetter') {
        
        // --- CALCULATIONS ---
        const processingFee = '1,999/-';
        const interestRate = '5% Yearly'; 
        // Simple EMI Logic
        // const principal = Number(application.loanAmount);
        // const totalPayable = principal + (principal * 0.05); // 5% Interest
        
        // const emiVal = Math.round(totalPayable / tenure); 

        // --- CALCULATIONS ---
        const principal = Number(application.loanAmount);
        const tenure = Number(application.tenure) || 12;
        const totalPayable = principal + (principal * 0.07); // 5% Interest Formula
        const emiVal = Math.round(totalPayable / tenure); 
        const emiText = `Rs. ${emiVal.toLocaleString('en-IN')}`; // Format nicely

        // ---------------- PAGE 1 ----------------
        console.log("Generating Page 1...");
        bgImage = await loadImage('/assets/Loan-approval-1.png');
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Header Data (Top Left)
        addText(userName, 22, 74, 11, true);          // To: Name
        addText(userAddress, 22, 78, 8);              // Address
        addText(email, 30, 81, 8);                   // Email
        addText(phone, 36, 85, 8);                   // Phone
        
        // Body Data (Center)
        addText(userName, 31, 104.5, 10, true);         // Dear [Name]
        addText(loanAmount, 113, 108, 10, true);      // Approved Amount
        

        // Footer Data (Bottom left)      
        
        addText(loanAmount, 54, 141, 8, true);      // Approved Amount
        addText(aadhaar, 47, 146, 8);        // Aadhaar Number
        addText(pan, 42, 151.26, 8);            // PAN Number
        
        
        
        // Bottom Table (The Real Data You Wanted)
        const startY = 160; 
        // Adjust these X values if they don't align perfectly with your table column
        addText(fullAppId, 90, startY + 33, 10, true);
        addText(userName, 90, startY + 40, 10);            // Name
        addText(userAddress, 90, startY + 47, 10);      // Address (smaller font for long address)
        addText(pan, 90, startY + 54, 10);            // PAN Number
        addText(aadhaar, 90, startY + 61, 10);        // Aadhaar Number
        // addText(bank, 90, startY + 32, 10);           // Bank Name
        addText(bank, 90, startY + 68, 10);             // <--- BANK NAME
        addText(ifsc, 90, startY + 75, 10);        //ifsc code
        addText(account, 90, startY + 82, 10);        // Account Number

       addText(loanAmount, 90, startY + 117, 11, true);      // Loan Amount
       addText(emiText, 90, startY + 124, 11, true);    // <--- NEW: Total EMI


        // ---------------- PAGE 2 ----------------
        doc.addPage();
        console.log("Generating Page 2...");
        bgImage = await loadImage('/assets/Loan-approval-2.png');
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Interest & Fees
        // addText(interestRate, 40, 60, 12, true);      // Interest Rate
        // addText(processingFee, 130, 115, 12, true);   // Processing Fee
        
        // EMI Summary Box
        // addText(`Rs. ${emiVal}`, 40, 150, 11, true);  // EMI Amount
        // addText(loanAmount, 120, 150, 11, true);      // Loan Amount

        // Schedule Header (Month 1)
        // let scheduleY = 220; 
        // addText('1 Month', 25, scheduleY, 10);
        // addText('208.33', 55, scheduleY, 10);         // Interest
        // addText(loanAmount, 80, scheduleY, 10);       // Balance
        // addText(`Rs. ${emiVal}`, 140, scheduleY, 10, true); // Total Payment


        // ---------------- PAGE 3 ----------------
       // ---------------- PAGE 3 ----------------
        doc.addPage();
        console.log("Generating Page 3...");
        bgImage = await loadImage('/assets/Loan-approval-3.png'); 
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Repayment Schedule Loop (Full Table)
        let page3Y = 48; // Adjust this Y start position based on your table header
        let currentBalance = Number(application.loanAmount); // Start with full loan amount

        // Column Headers (Optional: If your image doesn't have headers, uncomment this)
        // addText("Month", 15, 55, 9, true);
        // addText("Interest", 40, 55, 9, true);
        // addText("Balance", 65, 55, 9, true);
        // addText("Principal", 95, 55, 9, true);
        // addText("EMI", 125, 55, 9, true);
        // addText("End Bal", 160, 55, 9, true);

        for (let i = 1; i <= tenure; i++) {
            // 1. Calculate Values
            const startingBalance = currentBalance;
            
            // Interest for this month
            const interest = (startingBalance * 0.05 / 12);
            
            // Principal part of the EMI
            let principalComponent = emiVal - interest;
            
            // Ending Balance
            let endingBalance = startingBalance - principalComponent;

            // Handle last month precision or negative balance
            if (endingBalance < 0) {
                endingBalance = 0;
                principalComponent = startingBalance; // Adjust principal to clear debt exactly
            }
            
            // Update balance for next loop
            currentBalance = endingBalance;

            // 2. Display Data (6 Columns)
            // Adjust these X values to align with your image columns
            addText(`${i} Month`, 28, page3Y, 9);                       // 1. Month
            addText(Math.round(interest).toString(), 55, page3Y, 9);      // 2. Interest
            addText(Math.round(startingBalance).toString(), 80, page3Y, 9); // 3. Loan Balance (Start)
            addText(Math.round(principalComponent).toString(), 107, page3Y, 9); // 4. Principal
            addText(Math.round(emiVal).toString(), 134, page3Y, 9);       // 5. Total Payment (EMI)
            addText(Math.round(endingBalance).toString(), 168, page3Y, 9); // 6. Ending Balance
            
            page3Y += 9; // Row height (smaller space to fit more rows)
            
            // Optional: Break to new page if list is too long
            if (page3Y > 280) {
                 doc.addPage();
                 doc.addImage(bgImage, 'JPEG', 0, 0, width, height);
                 page3Y = 40; // Reset Y for new page
            }
        }
      }

      // ===============================================
      // 3. LOAN AGREEMENT (Stamp Paper)
      // ===============================================
      else if (type === 'agreement') {
        bgImage = await loadImage('/assets/Approval/Agreement_1.jpg'); 
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Overlay Data (Adjust X, Y numbers to fit your image exactly)
        addText(userName, 95, 123, 10,'blue', true, 'white');          // Name in "Mr. ____ has applied"
        // addText(loanAmount, 85, 95, 12, true, 'white');        // Amount in tax section if needed or loan amount
        addText(appId, 150, 40, 10, true, 'white');            // ID at top
        addText(date, 80, 113, 12, 'white');                   // Date
        addText(loanAmount, 88, 172.5, 10, true, 'white');      // Approved Amount bottom


        // --- PAGE 2 ---
        doc.addPage(); // <--- THIS ADDS THE NEW BLANK PAGE
        console.log("Generating Page 2...");
        
        bgImage = await loadImage('/assets/Agreement_2.jpg'); // Load Page 2 Image
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Overlay Text for Page 2 (Bank Details, etc.)
        // You have to find the correct X, Y coordinates for these:
        addText(userName, 121, 133.1, 10);                // Name in table
        // addText(application.panNumber, 90, 65, 10);   // PAN
        // addText(application.aadhaarNumber, 90, 72, 10); // Aadhaar
        addText(userName, 107, 152, 10);                // Name in table
        // addText(application.bankName, 90, 80, 10);    // Bank Name
        // addText(application.accountNumber, 90, 88, 10); // Account No
        // addText('Rs. 4,280', 50, 130, 11, true);      // EMI Amount (Example)
        // 
        
        // --- PAGE 3---
        doc.addPage(); // <--- THIS ADDS THE NEW BLANK PAGE
        console.log("Generating Page 2...");
        
        bgImage = await loadImage('/assets/Agreement_3.jpg'); // Load Page 2 Image
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Overlay Text for Page 2 (Bank Details, etc.)
        // You have to find the correct X, Y coordinates for these:
        // addText(userName, 90, 55, 10);                // Name in table
        // addText(application.panNumber, 90, 65, 10);   // PAN
        // addText(application.aadhaarNumber, 90, 72, 10); // Aadhaar
        // addText(application.bankName, 90, 80, 10);    // Bank Name
        // addText(application.accountNumber, 90, 88, 10); // Account No
        // addText('Rs. 4,280', 50, 130, 11, true);      // EMI Amount (Example)
    
      }

      // ===============================================
      // 4. REPAYMENT SCHEDULE
      // ===============================================
      else if (type === 'repaymentSchedule') {
        bgImage = await loadImage('/assets/customer.jpg');
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);

        // Header
        addText(userName, 127, 129, 12, true);
        // addText(loanAmount, 150, 45, 12, true);
         addText(phone, 127, 132, 10); 
        addText(loanAmount, 37, 152, 10, true, 'white');      // Approved Amount bottom


        // The Table Rows - This requires a loop
        // We assume the template has the grid lines, we just print numbers
        // let y = 85; // Start height of first row
        // const emi = 4280; // Calculate real EMI if you have the formula
        
        // for (let i = 1; i <= 12; i++) {
        //     addText(`${i} Month`, 25, y, 10);         // Month
        //     addText('Rs. ' + emi, 130, y, 10);        // Total Payment
        //     y += 10; // Move down for next row
        // }



         doc.addPage(); // <--- THIS ADDS THE NEW BLANK PAGE
        console.log("Generating Page 2...");
        
        bgImage = await loadImage('/assets/customer-1.jpg'); // Load Page 2 Image
        doc.addImage(bgImage, 'JPEG', 0, 0, width, height);
         addText(userName, 40, 45, 12, true);



      }

      doc.save(`${userName}_${type}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Could not generate PDF. Missing templates?");
    }
  };




  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#9DC08B';
      case 'Rejected': return '#ef4444';
      case 'Under Review': return '#3b82f6';
      default: return '#f59e0b';
    }
  };


    // HIDDEN PDF TEMPLATE FOR DOWNLOAD (same as Loan Form)
  const generateApplicationPDF = () => {
    const pdfElement = document.createElement('div');
    pdfElement.style.position = 'absolute';
    pdfElement.style.left = '-9999px';
    pdfElement.style.top = '-9999px';
    pdfElement.style.width = '210mm';
    document.body.appendChild(pdfElement);

    pdfElement.innerHTML = `
      <div style="padding:50px 40px; background:white; font-family:Arial; border:14px solid #40513B; border-top:24px solid #40513B; min-height:297mm;">
        <div style="position:absolute; top:0; left:0; right:0; height:14px; background:linear-gradient(90deg,#40513B,#609966,#9DC08B);"></div>
        
        <div style="text-align:center; margin-bottom:35px;">
          <h1 style="font-size:36px; font-weight:900; color:#40513B; margin:0 0 10px;">AADHAR CAPITAL FINANCE</h1>
          <p style="color:#555;">RBI Registered NBFC • Instant Loans</p>
          <div style="display:inline-block; background:#f0f8f0; padding:18px 40px; border-radius:50px; border:4px solid #9DC08B; margin:25px 0; font-size:20px; font-weight:900; color:#40513B;">
            Application ID: <span style="font-size:32px;">${application._id}</span>
          </div>
          <p style="color:#666;">Submitted on: ${new Date(application.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <hr style="border:3px solid #9DC08B; margin:40px 0;">

        <h2 style="text-align:center; color:#40513B; font-size:30px; font-weight:900; margin-bottom:35px;">Loan Application Details</h2>

        <table style="width:100%; border-collapse:collapse; background:#f8fbf6; border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(64,81,59,0.15);">
          <tbody>
            <tr style="background:#ffffff;"><td style="padding:18px 25px; font-weight:700; color:#40513B; width:45%;">Applicant Name</td><td style="padding:18px 25px; font-weight:600;">${application.fullName || 'Guest User'}</td></tr>
            <tr style="background:#f8fbf6;"><td style="padding:18px 25px; font-weight:700; color:#40513B;">Phone</td><td style="padding:18px 25px; font-weight:600;">${application.phone}</td></tr>
            <tr style="background:#ffffff;"><td style="padding:18px 25px; font-weight:700; color:#40513B;">Loan Amount</td><td style="padding:18px 25px; font-weight:600;">₹${Number(application.loanAmount).toLocaleString('en-IN')}</td></tr>
            <tr style="background:#f8fbf6;"><td style="padding:18px 25px; font-weight:700; color:#40513B;">Loan Type</td><td style="padding:18px 25px; font-weight:600;">${(application.loanType || 'personal').charAt(0).toUpperCase() + (application.loanType || 'personal').slice(1)} Loan</td></tr>
            <tr style="background:#ffffff;"><td style="padding:18px 25px; font-weight:700; color:#40513B;">Tenure</td><td style="padding:18px 25px; font-weight:600;">${application.tenure} months</td></tr>
            <tr style="background:#f8fbf6;"><td style="padding:18px 25px; font-weight:700; color:#40513B;">Status</td><td style="padding:18px 25px; font-weight:600; color:${getStatusColor(application.status)};">${application.status || 'Pending'}</td></tr>
          </tbody>
        </table>

        <div style="margin:50px 0;">
          <h3 style="color:#40513B; font-size:26px; font-weight:900; margin-bottom:20px; border-bottom:5px solid #9DC08B; display:inline-block; padding-bottom:10px;">Documents Uploaded</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:20px; padding:25px; background:#f0f8f0; border-radius:20px; border:3px dashed #9DC08B;">
            ${Object.keys(application.files || {})
              .filter(key => application.files[key])
              .map(key => `
                <div style="background:white; padding:18px; border-radius:16px; text-align:center; border:2px solid #9DC08B;">
                  <div style="font-size:28px; color:#9DC08B; margin-bottom:10px;">Check</div>
                  <p style="font-weight:700; color:#40513B; margin:8px 0;">${key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p style="color:#666; font-size:14px;">File uploaded</p>
                </div>
              `).join('')}
          </div>
        </div>

        <div style="margin-top:70px; padding:35px; background:linear-gradient(135deg,#40513B,#609966); color:white; border-radius:24px; text-align:center;">
          <h3 style="margin:0 0 15px; font-size:28px; font-weight:900;">Thank You for Choosing Aadhar Capital</h3>
          <p style="margin:12px 0; font-size:20px;">Call: <strong>1800-123-4567</strong></p>
          <p style="margin:0; font-size:14px; opacity:0.9;">This is a system-generated document • No signature required</p>
        </div>
      </div>
    `;

    html2canvas(pdfElement, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`AadharCapital_Application_${application._id.slice(-8).toUpperCase()}.pdf`);
      document.body.removeChild(pdfElement);
    });
  };


  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I track my loan application at Aadhar Capital Finance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can track your loan application by entering your Application ID or registered phone number on the Track Application page."
      }
    },
    {
      "@type": "Question",
      "name": "Is loan tracking secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Aadhar Capital Finance uses secure systems to protect your personal and financial information."
      }
    },
    {
      "@type": "Question",
      "name": "What details are required to track my loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You only need your Application ID or registered mobile number to check your loan status."
      }
    }
  ]
};


  return (
    <>


    <Helmet>
  {/* Title */}
  <title>
    Track Loan Application Status Online | Aadhar Capital Finance
  </title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Track your Aadhar Capital Finance loan application online using Application ID or phone number. Get real-time loan status, approval updates, and download sanction letters securely."
  />

  {/* Keywords */}
  <meta
    name="keywords"
    content="Track loan application, Aadhar Capital Finance loan status, loan application tracking, online loan status India, Aadhar Capital loan tracking"
  />

  {/* Canonical */}
  <link
    rel="canonical"
    href="https://www.aadharcapitalfinance.com/track-application"
  />

  {/* Open Graph (Social & WhatsApp preview) */}
  <meta property="og:title" content="Track Loan Application | Aadhar Capital Finance" />
  <meta
    property="og:description"
    content="Check real-time status of your loan application at Aadhar Capital Finance. Secure, fast and RBI-regulated NBFC."
  />
  <meta property="og:url" content="https://www.aadharcapitalfinance.com/track-application" />
  <meta property="og:type" content="website" />

  {/* Robots */}
  <meta name="robots" content="index, follow" />



  <script type="application/ld+json">
  {JSON.stringify(faqSchema)}
</script>

</Helmet>

      {/* HERO SECTION - EXACT SAME AS ABOUT PAGE */}
      {/* <section className="track-hero">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <span className="tagline">Real-Time Application Tracking</span>
            <h1>Track Your Loan Application</h1>
            <p>Enter your <strong>Application ID</strong> or <strong>Phone Number</strong> to view live status</p>
          </div>
        </div>
      </section> */}



<section className="track-hero">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/7947998/pexels-photo-7947998.jpeg")',  // ← TERA IMAGE PATH
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
      <span className="tagline">Real-Time Application Tracking</span>
      <h1>Track Your Loan Application</h1>
      <p>Enter your <strong>Application ID</strong> or <strong>Phone Number</strong> to view live status</p>
    </motion.div>
  </div>
</section>



      {/* MAIN CONTENT */}
      <section className="track-section">
        <div className="container">
          <div className="track-card-premium">
            <div className="card-header">
              <div className="logo-circle">
                <FileText size={48} color="#40513B" />
              </div>
              <h2>Application Status Tracker</h2>
              <p className="subtitle">100% secure • Real-time updates • RBI regulated</p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
              <div className="search-box">
                <Search size={26} color="#40513B" />
                <input
                  type="text"
                  placeholder="e.g. 67a1b2c3... or 9876543210"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className="search-btn">
                {loading ? 'Searching...' : 'Track Now'}
              </button>
            </form>

            {application && (
              <div className="result-card">
                {/* Success Header */}
                <div className="success-header">
                  <CheckCircle size={64} color="#9DC08B" />
                  <h3>Application Found!</h3>
                </div>

                {/* Application ID Section */}
                <div className="id-section">
                  <div className="id-full">
                    <span>Application ID:</span>
                    <strong>{application._id}</strong>
                    <button onClick={() => copyId(application._id, 'Full ID')} className="copy-btn">
                      <Clipboard size={18} /> Copy
                    </button>
                  </div>
                  <div className="id-short">
                    <small>Quick Reference ID:</small>
                    <strong className="short-id">{application._id.slice(-8).toUpperCase()}</strong>
                    <button onClick={() => copyId(application._id.slice(-8).toUpperCase(), 'Short ID')} className="copy-btn small">
                      Copy
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="details-grid">
                  <div className="detail-item">
                    <User size={22} color="#40513B" />
                    <div>
                      <p>Applicant Name</p>
                      <strong>{application.fullName || 'Guest User'}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Phone size={22} color="#40513B" />
                    <div>
                      <p>Phone</p>
                      <strong>{application.phone}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <IndianRupee size={22} color="#40513B" />
                    <div>
                      <p>Loan Amount</p>
                      <strong>₹{Number(application.loanAmount).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Calendar size={22} color="#40513B" />
                    <div>
                      <p>Applied On</p>
                      <strong>{new Date(application.createdAt).toLocaleDateString('en-IN')}</strong>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="status-card" style={{ borderColor: getStatusColor(application.status) }}>
                  <h3>Current Status</h3>
                  <div className="status-display">
                    {application.status === 'Approved' && <CheckCircle size={48} color="#9DC08B" />}
                    {application.status === 'Rejected' && <XCircle size={48} color="#ef4444" />}
                    {application.status === 'Under Review' && <Clock size={48} color="#3b82f6" />}
                    {(!application.status || application.status === 'Pending') && <Clock size={48} color="#f59e0b" />}
                    <span style={{ color: getStatusColor(application.status) }}>
                      {application.status || 'Pending'}
                    </span>
                  </div>
                </div>

                                {/* ADD THIS BUTTON AFTER STATUS CARD */}
                {/* <div style={{ textAlign: 'center', margin: '30px 0' }}>
                  <button
                    onClick={generateApplicationPDF}
                    className="btn-primary pdf-download-btn"
                    style={{
                      padding: '16px 40px',
                      fontSize: '18px',
                      fontWeight: '700',
                      background: '#40513B',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      margin: '0 auto',
                      boxShadow: '0 10px 30px rgba(64,81,59,0.3)',
                    }}
                  >
                    <Download size={24} />
                    Download Application PDF
                  </button>
                </div> */}




                {/* pdf of application letters  */}

                
{/* Approved Documents Section - FULLY SAFE NOW */}
{application && application.userVisibleDocs && Object.keys(application.userVisibleDocs).length > 0 && (
  <div className="documents-section">
    <h2 style={{ color: '#40513B', textAlign: 'center', marginBottom: '30px' }}>
      <FileText size={28} style={{ marginRight: '10px' }} />
      Your Approved Documents
    </h2>
    <div className="documents-grid">
      {Object.keys(application.userVisibleDocs)
        .filter(key => application.userVisibleDocs[key] === true)  // sirf true wale dikhao
        .map(key => {
          const labels = {
            noc: 'No Objection Certificate (NOC)',
            sanctionLetter: 'Sanction Letter',
            agreement: 'Loan Agreement',
            repaymentSchedule: 'Repayment Schedule'
          };
          return (
            <div key={key} className="document-card">
              <div className="pdf-icon">
                <FileText size={60} color="#40513B" />
                <span style={{ color: '#40513B', fontSize: '14px' }}>PDF</span>
              </div>
              <p style={{ fontWeight: '700', color: '#40513B', margin: '15px 0 10px' }}>
                {labels[key] || key}
              </p>
              <button 
                onClick={() => generateAndDownloadPDF(key)} 
                className="download-link"
                style={{
                  background: '#40513B',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto'
                }}
              >
                <Download size={20} /> Download PDF
              </button>
            </div>
          );
        })}
    </div>

    {/* Agar koi document visible nahi hai to bhi kuch mat dikhao */}
    {Object.keys(application.userVisibleDocs).filter(key => application.userVisibleDocs[key]).length === 0 && (
      <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', marginTop: '20px' }}>
        No documents released yet. Please wait for approval.
      </p>
    )}
  </div>
)}


                {/* Timeline */}
                <div className="timeline">
                  <div className="timeline-item active">
                    <div className="dot active"></div>
                    <div><strong>Application Submitted</strong><p>Your form has been received</p></div>
                  </div>
                  {['Under Review', 'Approved', 'Rejected'].includes(application.status) && (
                    <div className="timeline-item active">
                      <div className="dot active"></div>
                      <div><strong>Under Review</strong><p>Documents being verified</p></div>
                    </div>
                  )}
                  {application.status === 'Approved' && (
                    <div className="timeline-item success">
                      <div className="dot success"></div>
                      <div><strong>Approved!</strong><p>Congratulations! Loan approved</p></div>
                    </div>
                  )}
                  {application.status === 'Rejected' && (
                    <div className="timeline-item danger">
                      <div className="dot danger"></div>
                      <div><strong>Rejected</strong><p>See message below</p></div>
                    </div>
                  )}
                </div>

                {/* Admin Note */}
                {application.adminNotes && (
                  <div className="admin-note">
                    <MessageCircle size={22} color="#40513B" />
                    <div>
                      <strong>Message from Aadhar Capital Team:</strong>
                      <p>{application.adminNotes}</p>
                    </div>
                  </div>
                )}

                {/* Trust Badge */}
                <div className="trust-badge">
                  <Shield size={20} color="#9DC08B" />
                  <span>RBI Registered NBFC • 100% Secure • Instant Updates</span>
                </div>

                <div className="help-text">
                  Need help? Call <strong>1800-123-4567</strong> or WhatsApp <strong>+91 98765 43210</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <p style={{ display: "none" }}>
  Track your Aadhar Capital Finance loan application online. We are an RBI-regulated NBFC offering instant online loans, transparent approvals, and secure application tracking across India.
</p>

    </>
  );
};

export default TrackApplication;