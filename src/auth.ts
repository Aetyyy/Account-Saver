import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { signInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Gunakan PrismaAdapter untuk mengelola pengguna melalui Prisma
  adapter: PrismaAdapter(prisma),
  session: {
    // Sesi berbasis JWT dengan masa berlaku 3 jam
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // Konfigurasi Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Konfigurasi GitHub Provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Konfigurasi Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validasi kredensial menggunakan Zod
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { identifier, password } = validatedFields.data;
        const isEmail = identifier.includes("@");

        // Cari user berdasarkan email atau username
        const user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { name: identifier },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        // Cocokkan password
        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    // Callback untuk otorisasi akses berdasarkan route
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/user", "/product", "/storage", "/category"];
      const loginRoutes = ["/login", "/register", "/forgot-password"];
      const { pathname } = nextUrl;

      if (!isLoggedIn && protectedRoutes.includes(pathname)) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      if (isLoggedIn && loginRoutes.includes(pathname)) {
        return Response.redirect(new URL("/storage", nextUrl.origin));
      }

      if (
        !isLoggedIn &&
        (pathname.startsWith("/storage") || pathname.startsWith("/category"))
      ) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      const isForgotPasswordPage =
        pathname.startsWith("/forgot-password/") ||
        pathname.startsWith("/reset-password/");
      if (isLoggedIn && isForgotPasswordPage) {
        return Response.redirect(new URL("/storage", nextUrl.origin));
      }

      return true;
    },
    // Callback JWT: Tambahkan properti role dan verifiedUser ke token
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.verifiedUser = user.verifiedUser;
      }
      return token;
    },
    // Callback session: Masukkan id, role, dan verifiedUser ke session
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.verifiedUser = token.verifiedUser;
      return session;
    },
  },
});
