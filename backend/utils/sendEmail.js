// backend/utils/sendEmail.js
import { Resend } from 'resend';

// REMOVE THE GLOBAL INITIALIZATION FROM HERE
// const resend = new Resend(process.env.RESEND_API_KEY); <--- DELETE THIS

export const sendConfirmationEmail = async (toEmail, fullName, applicationId) => {
  try {
    // MOVE IT HERE: Initialize only when the function is called
    // This ensures process.env is fully loaded
    const resend = new Resend(process.env.RESEND_API_KEY); 

    const { data, error } = await resend.emails.send({
      from: 'Aadhar Capital Finance <onboarding@resend.dev>', 
      to: [toEmail],
      subject: `Application Submitted Successfully - ID: ${applicationId}`,
      replyTo: 'support@aadharcapital.in',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f9fff9; border-radius: 20px; border: 4px solid #40513B;">
          <h1 style="text-align: center; color: #40513B; font-size: 32px; margin-bottom: 10px;">
            Aadhar Capital Finance
          </h1>
          <hr style="border: 4px solid #9DC08B; border-radius: 5px; margin: 20px 0;">

          <h2 style="color: #40513B;">Dear ${fullName},</h2>
          <p style="font-size: 18px; line-height: 1.6;">
            Your loan application has been <strong style="color: #16a34a;">successfully submitted</strong>!
          </p>

          <div style="background: linear-gradient(135deg, #f0f8f0, #e8f5e8); padding: 30px; border-radius: 20px; text-align: center; margin: 30px 0; border: 5px dashed #9DC08B;">
            <h3 style="margin: 0 0 15px; color: #40513B; font-size: 24px;">Your Application ID</h3>
            <h1 style="margin: 0; color: #40513B; font-size: 42px; letter-spacing: 6px; font-weight: 900;">
              ${applicationId}
            </h1>
            <p style="margin: 15px 0 0; font-size: 22px; color: #1e40af;">
              <strong>Quick ID:</strong> ${applicationId.slice(-8).toUpperCase()}
            </p>
          </div>

          <p style="font-size: 18px; line-height: 1.6;">
            We are reviewing your documents. You will receive a status update within <strong>24 hours</strong>.
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="https://track.aadharcapital.in" style="background: #40513B; color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 20px; display: inline-block;">
              Track Application Status
            </a>
          </div>

          <hr style="border: 2px solid #9DC08B; margin: 40px 0;">

          <p style="text-align: center; color: #555; font-size: 15px; line-height: 1.6;">
            Thank you for choosing <strong>Aadhar Capital Finance</strong><br>
            Call: <strong>1800-123-4567</strong> | WhatsApp: <strong>+91 98765 43210</strong>
          </p>
        </div>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully via Resend:", data);
    return { success: true, data };

  } catch (err) {
    console.error("Resend Email Failed:", err);
    return { success: false, error: err };
  }
};