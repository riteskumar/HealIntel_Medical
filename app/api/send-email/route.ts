import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
 process.env.GOOGLE_CLIENT_ID!, // Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  "http://localhost:3000" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    process.env.GOOGLE_REFRESH_TOKEN!,
});

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, message } = await req.json(); // Change 'problem' to 'message' to match your form data

    // Add validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "4567.riteshkumar@gmail.com",
        clientId:
         process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        refreshToken:
          process.env.GOOGLE_REFRESH_TOKEN!,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: "4567.riteshkumar@gmail.com",
      to: email,
      subject: "Thank You for Reaching Out to HealIntel",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
           <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #24AE7C;
          padding: 20px;
          color: white;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .content {
          padding: 20px;
          background-color: #fff;
        }
        .message-details {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        .info-section {
          margin: 20px 0;
          padding: 15px;
          background-color: #f0f9f6;
          border-radius: 4px;
        }
        .contact-section {
          margin: 20px 0;
          padding: 15px;
          background-color: #fff5e6;
          border-radius: 4px;
        }
        .footer {
          margin-top: 20px;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        h2 {
          margin: 0;
          color: white;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        li {
          margin-bottom: 8px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
      </style>
        </head>
        <body>
          <div class="header">
            <h2>Thank You for Reaching Out to HealIntel</h2>
          </div>
          
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for contacting HealIntel. We have received your message and appreciate you taking 
            the time to reach out to us. Our dedicated HealIntel team will carefully review your inquiry and 
            respond as soon as possible, typically within 24 hours.</p>

            <div class="message-details">
              <h3 style="color: #24AE7C; margin-bottom: 15px;">Your Message Details:</h3>
              <ul>
                <li><span class="label">Name:</span> ${name}</li>
                <li><span class="label">Email:</span> ${email}</li>
                <li><span class="label">Message:</span> ${message}</li> <!-- Changed from 'problem' to 'message' -->
              </ul>
            </div>

            <div class="info-section">
          <h3 style="color: #24AE7C; margin-bottom: 15px;">Important Information</h3>
          <p>For your reference:</p>
          <ul>
            <li>• Our team operates Monday to Saturday, 9:00 AM to 6:00 PM (IST)</li>
            <li>• For medical emergencies, please contact your local emergency services immediately</li>
            <li>• Your privacy and data security are our top priority</li>
          </ul>
        </div>

        <div class="contact-section">
          <h3 style="color: #24AE7C; margin-bottom: 15px;">Contact Information</h3>
          <p>You can reach us at:</p>
          <ul>
            <li>• Phone: +91 9818000000 (Business Hours)</li>
            <li>• Email: support@healintel.com</li>
            <li>• Location: Rohini, New Delhi-110085, Delhi, India</li>
          </ul>
        </div>

        <div class="footer">
          <p>Best Regards,<br>The HealIntel Team</p>
          <p style="color: #888; font-size: 11px;">
            This is an automated response. Please do not reply to this email.<br>
            For urgent matters, please contact us directly at the phone number provided above.
          </p>
        </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
};
