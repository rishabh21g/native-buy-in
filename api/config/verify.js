import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({
  path: path.resolve(__dirname, "../.env.local"),
});

export const sendVerificationEmail = async (
  verificationToken,
  email,
  userName
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "biasedengineer@gmail.com",
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  const messageInfo = {
    from: {
      name: "Buy IN",
      address: "biasedengineer@gmail.com",
    },
    to: email,
    subject: "Verification of email",

    html: `  <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .button { 
              background-color: #4CAF50; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 4px; 
              display: inline-block;
              margin: 20px 0;
            }
            .footer { background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName}!</h2>
              <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
              <p>This verification link will expire in 24 hours.</p>
              <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Your App Name. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    text: `
        Hello ${userName}!
        
        Thank you for registering with us. Please verify your email address by visiting this link:
        http://localhost:4000/verify/${verificationToken}
        
        This verification link will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
      `,
  };
  try {
    await transporter.sendMail(messageInfo);
  } catch (err) {
    console.log("Error while sending verification email" + err.message);
  }
};
