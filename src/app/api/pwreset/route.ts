import { prisma } from "@/lib/prisma";
import { NextResponse as res } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("[Password Reset] API route hit");
    const { email } = await req.json();

    // Cari user di database
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    // Validasi user
    if (!user) {
      return res.json(
        { message: "User not found", status: 404 },
        { status: 404 }
      );
    }

    // Cek jika user login dengan OAuth (memiliki accounts)
    if (user.accounts?.length > 0) {
      return res.json(
        {
          message: "Password reset not allowed for OAuth users",
          status: 403,
        },
        { status: 403 }
      );
    }

    // Cari atau buat reset token
    const token = await prisma.passwordToken.findFirst({
      where: { userId: user.id },
    });

    if (!token) {
      return res.json(
        { message: "Password reset token not found", status: 404 },
        { status: 404 }
      );
    }

    // Konfigurasi email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_BURNER_USERNAME,
        pass: process.env.NEXT_PUBLIC_BURNER_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    // Generate reset link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/forgot-password/${token.token}`;

    // Kirim email
    await transporter.sendMail({
      from: `"Account Saver" <${process.env.NEXT_PUBLIC_BURNER_USERNAME}>`,
      to: email,
      subject: "Password Reset Request - Account Saver",
      html: generateResetPasswordTemplate(resetLink),
    });

    return res.json(
      { message: "Password reset email sent successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Password Reset Error]", error);
    return res.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}

// Template email reset password
function generateResetPasswordTemplate(resetLink: string): string {
  return `
    <div style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f7fafc;
      border-radius: 8px;
    ">
      <div style="
        background-color: #3b82f6;
        padding: 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      ">
        <h1 style="
          color: #ffffff;
          margin: 0;
          font-size: 24px;
        ">
          Account Saver
        </h1>
      </div>

      <div style="
        padding: 30px 20px;
        background-color: #ffffff;
        border-radius: 0 0 8px 8px;
      ">
        <h2 style="color: #1a202c; margin-top: 0">Password Reset Request</h2>
        
        <p style="color: #4a5568; line-height: 1.6">
          We received a request to reset your Account Saver password. Click the button below
          to reset your password:
        </p>

        <a href="${resetLink}" style="
          display: inline-block;
          background-color: #3b82f6;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          margin: 20px 0;
        ">
          Reset Password
        </a>

        <p style="color: #4a5568; line-height: 1.6">
          If you didn't request this password reset, you can safely ignore this email.
          This link will expire in 1 hour.
        </p>

        <hr style="border: 1px solid #e2e8f0; margin: 25px 0">

        <p style="color: #718096; font-size: 14px">
          Having trouble? Contact our support team at 
          <a href="mailto:support@accountsaver.com" style="color: #3b82f6">
            support@accountsaver.com
          </a>
        </p>
      </div>
    </div>
  `;
}
