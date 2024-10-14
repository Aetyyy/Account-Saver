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
    maxAge: 30 * 60,
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
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
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
  //callback
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = ["/user", "/product", "/storage"];
      const LoginRoutes = ["/login", "/register", "/forgot-password"];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      if (isLoggedIn && LoginRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/dashboard", nextUrl.origin));
      }

      const isStoragePage = nextUrl.pathname.startsWith("/storage");
      if (!isLoggedIn && isStoragePage) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      const isForgotPasswordPage =
        nextUrl.pathname.startsWith("/forgot-password/");
      nextUrl.pathname.startsWith("/reset-password/");
      if (isLoggedIn && isForgotPasswordPage) {
        return Response.redirect(new URL("/dashboard", nextUrl.origin));
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
