import nodemailer from 'nodemailer';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('ERROR: EMAIL_USER or EMAIL_PASS not found in environment variables. Email services will fail.');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const themeColor = '#f05a22';
  const siteName = 'HappyBar';

  const mailOptions = {
    from: `"${siteName}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reset Your ${siteName} Password`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password - ${siteName}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; line-height: 1.5;">
        <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <!-- Main Card -->
          <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with brand color -->
            <div style="background: linear-gradient(135deg, ${themeColor} 0%, #d9441a 100%); padding: 32px 24px; text-align: center;">
              <div style="font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 8px;">
                ${siteName}
              </div>
              <div style="font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: 500;">
                Password Reset Request
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px 28px;">
              <!-- Greeting -->
              <h2 style="font-size: 24px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px 0;">
                Forgot your password?
              </h2>
              <p style="font-size: 16px; color: #4a5568; margin: 0 0 24px 0;">
                Don't worry, it happens to the best of us!
              </p>
              
              <!-- Message -->
              <p style="font-size: 15px; color: #4a5568; margin: 0 0 16px 0;">
                We received a request to reset the password for your <strong style="color: ${themeColor};">${siteName}</strong> account associated with <strong style="color: #1a1a2e;">${email}</strong>.
              </p>
              
              <p style="font-size: 15px; color: #4a5568; margin: 0 0 28px 0;">
                Click the button below to create a new password. This link will expire in <strong>1 hour</strong> for security reasons.
              </p>
              
              <!-- Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; background-color: ${themeColor}; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; text-align: center; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(240, 90, 34, 0.25);">
                  Reset Password →
                </a>
              </div>
              
              <!-- Divider -->
              <div style="border-top: 1px solid #e9ecef; margin: 28px 0 20px 0;"></div>
              
              <!-- Fallback link -->
              <p style="font-size: 13px; color: #6c757d; margin: 0 0 8px 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="font-size: 12px; color: ${themeColor}; background-color: #f8f9fa; padding: 12px; border-radius: 8px; word-break: break-all; margin: 0 0 24px 0; font-family: monospace;">
                ${resetUrl}
              </p>
              
              <!-- Security note -->
              <div style="background-color: #fff5f0; border-left: 3px solid ${themeColor}; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px;">
                <p style="font-size: 13px; color: #6c757d; margin: 0;">
                  🔒 <strong>Didn't request this?</strong> You can safely ignore this email. Your password will remain unchanged.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px 28px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="font-size: 12px; color: #6c757d; margin: 0 0 8px 0;">
                &copy; 2026 ${siteName}. All rights reserved.
              </p>
              <p style="font-size: 12px; color: #6c757d; margin: 0;">
                This is an automated message, please do not reply to this email.
              </p>
            </div>
          </div>
          
          <!-- Footer note -->
          <p style="text-align: center; font-size: 11px; color: #9ca3af; margin-top: 24px;">
            If you received this email by mistake, please ignore it.
          </p>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};