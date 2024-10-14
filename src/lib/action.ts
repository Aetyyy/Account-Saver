"use server";
import {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  mailSchema,
} from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateForgotPasswordToken } from "@/lib/data";

// Sign up Credentials action
export const signUpCredentials = async (
  previous: unknown,
  formData: FormData
) => {
  const validatedFields = signUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashPassword = hashSync(password, 12);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return {
        error: {
          name: ["This name is already taken"],
        },
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    await generateForgotPasswordToken(user.id);
  } catch (error) {
    console.log(error);
    return { message: "Failed to register user" };
  }
  redirect("/login");
};

// Sign in Credentials action
export const signInCredentials = async (
  previous: unknown,
  formData: FormData
) => {
  const validatedFields = signInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid email or password" };
        default:
          return { message: "Failed to sign in" };
      }
    }
    throw error;
  }
};

// Forgot Password Form action
export const forgotPassword = async (previous: unknown, formData: FormData) => {
  const validatedFields = mailSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  try {
    if (!email) {
      return {
        message: "Invalid Email",
        status: 404,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        accounts: true,
      },
    });

    if (!user || (user.accounts && user.accounts.length > 0)) {
      return {
        message: "Email not found",
        status: 404,
      };
    }

    return {
      email: email,
      message: "Reset password has been sent to your email",
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      message: "Error occurred while fetching user data",
      status: 500,
    };
  }
};

// Reset Password Form action
export const resetPassword = async (previous: unknown, formData: FormData) => {
  const validatedFields = resetPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;
  const hashPassword = hashSync(password, 12);
  const token = formData.get("token") as string;

  if (token === null) {
    throw new Error("Token is null");
  }

  try {
    const passwordTokenRecord = await prisma.passwordToken.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });

    if (!passwordTokenRecord) {
      return { message: "Token tidak valid atau telah kadaluarsa." };
    }

    const user = await prisma.user.update({
      where: {
        id: passwordTokenRecord.userId,
      },
      data: {
        password: hashPassword,
      },
    });

    await generateForgotPasswordToken(user.id);

    console.log("Password has been reset");
  } catch (error) {
    console.error("Error updating password:", error);
    return { message: "Gagal mereset password.", status: 500 };
  }
  return redirect("/login");
};
