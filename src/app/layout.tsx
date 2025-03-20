import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import ClientNavbarControl from "@/components/navbar/ClientNavbarControl";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Account Saver",
  description: "A secure and convenient place to save your accounts.",
};

const DynamicNavbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-800`}
      >
        <SessionProvider session={session}>
          <ClientNavbarControl>
            <DynamicNavbar session={session} />
          </ClientNavbarControl>
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
