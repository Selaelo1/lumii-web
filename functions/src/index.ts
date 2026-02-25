// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { CallableRequest } from 'firebase-functions/https';

admin.initializeApp();

// Configure your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendCustomPasswordReset = functions.https.onCall(
  async (request: CallableRequest) => {
    const { email } = request.data;
    
    if (!email) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'Email is required'
      );
    }

    try {
      // Generate password reset link
      const resetLink = await admin.auth().generatePasswordResetLink(email, {
        url: 'https://your-app.com/login',
      });

      // Get user details
      let userName = '';
      try {
        const user = await admin.auth().getUserByEmail(email);
        userName = user.displayName || email.split('@')[0];
      } catch (error) {
        userName = 'there';
      }

      // Email content
      const mailOptions = {
        from: '"Lumii Learning" <noreply@lumii.com>',
        to: email,
        subject: '🔐 Reset Your Lumii Password',
        html: generatePasswordResetEmail(resetLink, userName)
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      return { 
        success: true, 
        message: 'Password reset email sent successfully' 
      };
      
    } catch (_error) {
        console.error('Error sending password reset email:', _error);
        
        throw new functions.https.HttpsError(
            'internal',
            'Failed to send password reset email'
        );
    }
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function generatePasswordResetEmail(resetLink: string, userName: string): string {
  const year = new Date().getFullYear();
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Lumii Password</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #1F2937;
          margin: 0;
          padding: 0;
          background-color: #F3F4F6;
        }
        
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #7C3AED 0%, #C084FC 100%);
          padding: 40px 30px;
          text-align: center;
        }
        
        .logo {
          font-size: 48px;
          margin-bottom: 10px;
        }
        
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        
        .header p {
          color: rgba(255, 255, 255, 0.9);
          margin: 10px 0 0 0;
          font-size: 16px;
        }
        
        .content {
          padding: 40px 30px;
          background: white;
        }
        
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 20px;
        }
        
        .message {
          color: #4B5563;
          margin-bottom: 30px;
          font-size: 16px;
        }
        
        .reset-button-container {
          text-align: center;
          margin: 35px 0;
        }
        
        .reset-button {
          display: inline-block;
          background: #7C3AED;
          color: white !important;
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        
        .reset-button:hover {
          background: #6D28D9;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
        }
        
        .link-fallback {
          margin: 20px 0;
          padding: 15px;
          background: #F9FAFB;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          font-size: 14px;
          word-break: break-all;
        }
        
        .link-fallback p {
          color: #6B7280;
          margin-bottom: 10px;
        }
        
        .link-fallback a {
          color: #7C3AED;
          text-decoration: none;
        }
        
        .security-box {
          background: #FEF3C7;
          border-left: 4px solid #F59E0B;
          padding: 20px;
          border-radius: 12px;
          margin: 30px 0;
        }
        
        .security-box h3 {
          color: #92400E;
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .security-box ul {
          margin: 0;
          padding-left: 20px;
          color: #92400E;
        }
        
        .security-box li {
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .info-box {
          background: #EFF6FF;
          border-radius: 12px;
          padding: 20px;
          margin: 30px 0;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .info-icon {
          font-size: 20px;
          margin-right: 12px;
        }
        
        .info-text {
          color: #1E40AF;
          font-size: 14px;
        }
        
        .info-text strong {
          color: #1E3A8A;
        }
        
        .footer {
          background: #F9FAFB;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #E5E7EB;
        }
        
        .footer-links {
          margin-bottom: 15px;
        }
        
        .footer-links a {
          color: #6B7280;
          text-decoration: none;
          font-size: 14px;
          margin: 0 10px;
          transition: color 0.2s ease;
        }
        
        .footer-links a:hover {
          color: #7C3AED;
        }
        
        .copyright {
          color: #9CA3AF;
          font-size: 12px;
          margin-top: 15px;
        }
        
        .badge {
          background: #ECFDF3;
          color: #067647;
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        @media only screen and (max-width: 600px) {
          .container {
            margin: 20px;
            border-radius: 16px;
          }
          
          .header {
            padding: 30px 20px;
          }
          
          .content {
            padding: 30px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">📚</div>
          <h1>Lumii Learning</h1>
          <p>Your personal learning companion</p>
        </div>
        
        <div class="content">
          <div class="badge">🔐 Password Reset Request</div>
          
          <div class="greeting">
            Hello ${userName},
          </div>
          
          <div class="message">
            We received a request to reset the password for your Lumii account. 
            If you didn't make this request, you can safely ignore this email.
          </div>
          
          <div class="reset-button-container">
            <a href="${resetLink}" class="reset-button">
              Reset Your Password
            </a>
          </div>
          
          <div class="link-fallback">
            <p>🔗 If the button doesn't work, copy and paste this link into your browser:</p>
            <a href="${resetLink}">${resetLink.substring(0, 60)}...</a>
          </div>
          
          <div class="security-box">
            <h3>🛡️ Security Tips</h3>
            <ul>
              <li>This link will expire in <strong>1 hour</strong></li>
              <li>Never share this link with anyone</li>
              <li>Choose a strong, unique password</li>
              <li>Enable two-factor authentication for extra security</li>
            </ul>
          </div>
          
          <div class="info-box">
            <div class="info-item">
              <span class="info-icon">⏰</span>
              <div class="info-text">
                <strong>Link expires in 1 hour</strong> - For security reasons, this password reset link will expire after 60 minutes.
              </div>
            </div>
            
            <div class="info-item">
              <span class="info-icon">🔒</span>
              <div class="info-text">
                <strong>Secure connection</strong> - All password resets are encrypted and processed securely.
              </div>
            </div>
            
            <div class="info-item">
              <span class="info-icon">📱</span>
              <div class="info-text">
                <strong>Access anywhere</strong> - You can reset your password on any device.
              </div>
            </div>
          </div>
          
          <div style="background: #F9FAFB; border-radius: 12px; padding: 20px; margin-top: 20px;">
            <p style="color: #4B5563; margin: 0 0 10px 0; font-weight: 500;">Need help?</p>
            <p style="color: #6B7280; font-size: 14px; margin: 0;">
              If you're having trouble resetting your password, contact our support team at 
              <a href="mailto:support@lumii.com" style="color: #7C3AED; text-decoration: none;">support@lumii.com</a>
            </p>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-links">
            <a href="#">About</a> •
            <a href="#">Features</a> •
            <a href="#">Pricing</a> •
            <a href="#">Help Center</a> •
            <a href="#">Privacy</a> •
            <a href="#">Terms</a>
          </div>
          
          <div style="margin: 20px 0;">
            <span style="color: #6B7280; font-size: 14px; margin: 0 10px;">📚 Lumii Learning App</span>
            <span style="color: #6B7280; font-size: 14px;">✨ Master your certifications</span>
          </div>
          
          <div class="copyright">
            © ${year} Lumii Learning. All rights reserved.<br>
            <span style="color: #9CA3AF; font-size: 11px;">Made with ❤️ for learners everywhere</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}