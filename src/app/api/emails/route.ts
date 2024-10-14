// import { sendMail } from "@/lib/mailTransporter";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  console.log("API route hit");
  const { email } = await req.json();

  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;

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
      subject: "Rixzen Verification code",
      html: "<p>This is your verification code for Rixzen: <b>123456</b></p>",
    });

    return NextResponse.json(
      { message: "Success: email was sent", accepted: mail.accepted },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed: email was not sent something when wrong!" },
      { status: 500 }
    );
  }
}