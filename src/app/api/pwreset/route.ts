import { prisma } from "@/lib/prisma";
import { NextResponse as res } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("API route hit");
  const { email } = await req.json();

  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      accounts: true,
    },
  });

  if (!user || (user.accounts && user.accounts.length > 0)) {
    return res.json(
      { message: "User not found", status: 404 },
      { status: 404 }
    );
  }

  const token = await prisma.passwordToken.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!token) {
    return res.json(
      { message: "Password reset token not found", status: 404 },
      { status: 404 }
    );
  }
  const link = `http://localhost:3000/forgot-password/${token.token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: "Boren <borengamink@gmail.com>",
      to: email,
      subject: "Rixzen password reset link",
      html: `<p>This is your link for change your password: <a href="${link}">Click here</a></p>`,
    });

    return res.json(
      { message: "Success: email was sent", accepted: mail.accepted },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return res.json(
      { message: "Failed: email was not sent something when wrong!" },
      { status: 500 }
    );
  }
}
