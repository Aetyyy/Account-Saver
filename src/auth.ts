import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 3 * 60 * 60, // 3 hours
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { identifier, password } = validatedFields.data;

        const isEmail = identifier.includes("@");

        const user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { name: identifier },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/user", "/product", "/storage", "/category"];
      const loginRoutes = ["/login", "/register", "/forgot-password"];
      const { pathname } = nextUrl;

      // Redirect to login if accessing protected routes without being logged in
      if (!isLoggedIn && protectedRoutes.includes(pathname)) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      // Redirect to storage if logged in and accessing login-related routes
      if (isLoggedIn && loginRoutes.includes(pathname)) {
        return Response.redirect(new URL("/storage", nextUrl.origin));
      }

      // Redirect to login if accessing storage or category pages without being logged in
      if (
        !isLoggedIn &&
        (pathname.startsWith("/storage") || pathname.startsWith("/category"))
      ) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      // Redirect to storage if logged in and accessing forgot-password or reset-password pages
      const isForgotPasswordPage =
        pathname.startsWith("/forgot-password/") ||
        pathname.startsWith("/reset-password/");
      if (isLoggedIn && isForgotPasswordPage) {
        return Response.redirect(new URL("/storage", nextUrl.origin));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.verifiedUser = user.verifiedUser;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.verifiedUser = token.verifiedUser;
      return session;
    },
  },
});
