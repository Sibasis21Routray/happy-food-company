import axios from 'axios';

interface EmailOptions {
  to: string | string[];
  subject: string;
  htmlContent: string;
  sender?: {
    email: string;
    name: string;
  };
  replyTo?: {
    email: string;
    name: string;
  };
}

/**
 * Send email using Brevo API directly via Axios
 */
export const sendEmail = async (options: EmailOptions): Promise<any> => {
  try {
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    
    const payload = {
      sender: options.sender || {
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com',
        name: process.env.BREVO_SENDER_NAME || 'Your Website',
      },
      to: recipients.map(email => ({
        email: email,
        name: email.split('@')[0],
      })),
      ...(options.replyTo && { replyTo: options.replyTo }),
      subject: options.subject,
      htmlContent: options.htmlContent,
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error sending email:', error.response?.data || error.message);
    throw new Error('Failed to send email');
  }
};

/**
 * Send password reset email
 */
export const sendResetPasswordEmail = async (email: string, resetToken: string): Promise<any> => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const siteName =  'HappyBar';
  const themeColor = '#f05a22';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password - ${siteName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
          background-color: #f9fafb; 
          line-height: 1.5; 
        }
        .container { 
          max-width: 560px; 
          margin: 0 auto; 
          padding: 40px 20px; 
        }
        .card { 
          background-color: #ffffff; 
          border-radius: 16px; 
          overflow: hidden; 
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1); 
        }
        .header { 
          background: linear-gradient(135deg, ${themeColor} 0%, #d9441a 100%); 
          padding: 32px 24px; 
          text-align: center; 
        }
        .header h1 { 
          font-size: 32px; 
          font-weight: 800; 
          color: #ffffff; 
          letter-spacing: -0.5px; 
          margin: 0 0 8px 0; 
        }
        .header p { 
          font-size: 14px; 
          color: rgba(255, 255, 255, 0.9); 
          font-weight: 500; 
          margin: 0; 
        }
        .content { 
          padding: 32px 28px; 
        }
        .content h2 { 
          font-size: 24px; 
          font-weight: 600; 
          color: #1a1a2e; 
          margin: 0 0 8px 0; 
        }
        .content p { 
          font-size: 15px; 
          color: #4a5568; 
          margin: 0 0 16px 0; 
        }
        .button { 
          display: inline-block; 
          background-color: ${themeColor}; 
          color: #ffffff; 
          padding: 14px 32px; 
          text-decoration: none; 
          border-radius: 50px; 
          font-weight: 600; 
          font-size: 16px; 
          text-align: center; 
          box-shadow: 0 4px 12px rgba(240, 90, 34, 0.25); 
        }
        .button:hover {
          background-color: #d9441a;
          box-shadow: 0 6px 16px rgba(240, 90, 34, 0.35);
        }
        .footer { 
          background-color: #f8f9fa; 
          padding: 20px 28px; 
          text-align: center; 
          border-top: 1px solid #e9ecef; 
        }
        .footer p { 
          font-size: 12px; 
          color: #6c757d; 
          margin: 0; 
        }
        .security-note {
          background-color: #fff5f0; 
          border-left: 3px solid ${themeColor}; 
          padding: 12px 16px; 
          border-radius: 8px; 
          margin-bottom: 24px;
        }
        .fallback-link {
          font-size: 12px; 
          color: ${themeColor}; 
          background-color: #f8f9fa; 
          padding: 12px; 
          border-radius: 8px; 
          word-break: break-all; 
          margin: 0 0 24px 0; 
          font-family: monospace;
        }
        @media only screen and (max-width: 480px) {
          .container { padding: 20px 10px; }
          .content { padding: 24px 16px; }
          .header { padding: 24px 16px; }
          .header h1 { font-size: 24px; }
          .button { padding: 12px 24px; font-size: 14px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>${siteName}</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Forgot your password?</h2>
            <p>Don't worry, it happens to the best of us!</p>
            <p>We received a request to reset the password for your <strong>${siteName}</strong> account associated with <strong>${email}</strong>.</p>
            <p>Click the button below to create a new password. This link will expire in <strong>1 hour</strong> for security reasons.</p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" class="button">Reset Password →</a>
            </div>
            
            <div style="border-top: 1px solid #e9ecef; margin: 28px 0 20px 0;"></div>
            
            <p style="font-size: 13px; color: #6c757d; margin: 0 0 8px 0;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p class="fallback-link">${resetUrl}</p>
            
            <div class="security-note">
              <p style="font-size: 13px; color: #6c757d; margin: 0;">
                <strong>Didn't request this?</strong> You can safely ignore this email. Your password will remain unchanged.
              </p>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Reset Your ${siteName} Password`,
    htmlContent,
    sender: {
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com',
      name: siteName,
    },
  });
};

/**
 * Send welcome email after registration
 */
export const sendWelcomeEmail = async (email: string, fullName: string): Promise<any> => {
  const siteName = process.env.SITE_NAME || 'HappyBar';
  const themeColor = process.env.THEME_COLOR || '#f05a22';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${siteName}</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
          background-color: #f9fafb; 
          margin: 0; 
          padding: 0; 
          line-height: 1.5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 40px 20px; 
        }
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, ${themeColor} 0%, #d9441a 100%);
          padding: 40px 30px; 
          text-align: center; 
          color: white;
        }
        .header h1 { 
          font-size: 32px; 
          font-weight: 800; 
          margin: 0 0 8px 0; 
        }
        .header p {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
        }
        .content { 
          padding: 40px 30px; 
        }
        .content h2 {
          font-size: 24px;
          color: #1a1a2e;
          margin: 0 0 16px 0;
        }
        .content p {
          font-size: 16px;
          color: #4a5568;
          margin: 0 0 16px 0;
        }
        .button { 
          display: inline-block; 
          background-color: ${themeColor}; 
          color: white; 
          padding: 14px 32px; 
          text-decoration: none; 
          border-radius: 50px; 
          font-weight: 600; 
          font-size: 16px; 
          box-shadow: 0 4px 12px rgba(240, 90, 34, 0.25);
        }
        .button:hover {
          background-color: #d9441a;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          font-size: 12px;
          color: #6c757d;
          margin: 0;
        }
        @media only screen and (max-width: 480px) {
          .container { padding: 20px 10px; }
          .content { padding: 24px 16px; }
          .header { padding: 24px 16px; }
          .header h1 { font-size: 24px; }
          .button { padding: 12px 24px; font-size: 14px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>🎉 Welcome to ${siteName}!</h1>
            <p>We're thrilled to have you on board</p>
          </div>
          <div class="content">
            <h2>Hello ${fullName},</h2>
            <p>Welcome to <strong>${siteName}</strong>! We're excited to have you as part of our community.</p>
            <p>Your account has been successfully created. Here's what you can do next:</p>
            <ul style="color: #4a5568; margin: 16px 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Explore our features and services</li>
              <li style="margin-bottom: 8px;">Browse our products</li>
              <li style="margin-bottom: 8px;">Connect with our community</li>
            </ul>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Get Started</a>
            </div>
            <p style="font-size: 14px; color: #6c757d; margin-top: 24px;">
              If you have any questions, feel free to reach out to our support team. We're here to help!
            </p>
            <p style="margin-top: 16px;">
              Cheers,<br>
              <strong>The ${siteName} Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Welcome to ${siteName}! 🎉`,
    htmlContent,
    sender: {
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com',
      name: siteName,
    },
  });
};

/**
 * Send contact form email
 */
export const sendContactFormEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<any> => {
  const { name, email, subject, message } = data;
  const siteName = process.env.SITE_NAME || 'HappyBar';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
          background-color: #f9fafb; 
          margin: 0; 
          padding: 0; 
          line-height: 1.5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 40px 20px; 
        }
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, ${process.env.THEME_COLOR || '#f05a22'} 0%, #d9441a 100%);
          padding: 30px; 
          text-align: center; 
          color: white;
        }
        .header h1 { 
          font-size: 24px; 
          font-weight: 700; 
          margin: 0; 
        }
        .content { 
          padding: 30px; 
        }
        .field {
          margin-bottom: 16px;
          padding: 12px 16px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .field-label {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .field-value {
          color: #4a5568;
          font-size: 15px;
          margin: 0;
        }
        .message-box {
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          margin-top: 8px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          font-size: 12px;
          color: #6c757d;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>📬 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 Name</div>
              <p class="field-value">${name}</p>
            </div>
            <div class="field">
              <div class="field-label">📧 Email</div>
              <p class="field-value">${email}</p>
            </div>
            <div class="field">
              <div class="field-label">📝 Subject</div>
              <p class="field-value">${subject}</p>
            </div>
            <div class="field">
              <div class="field-label">💬 Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br />')}</div>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e9ecef;">
              <p style="font-size: 12px; color: #6c757d; margin: 0;">
                This message was sent from the ${siteName} contact form.
              </p>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: process.env.CONTACT_FORM_RECIPIENT || 'contact@yourdomain.com',
    subject: `Contact Form: ${subject}`,
    htmlContent,
    sender: {
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com',
      name: siteName,
    },
    replyTo: {
      email,
      name,
    },
  });
};