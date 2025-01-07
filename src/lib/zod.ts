import { object, string } from "zod";

export const signUpSchema = object({
  name: string()
    .min(1, "Name is required")
    .regex(/^[^\s]*$/, "Name must not contain spaces"),
  email: string().email("Invalid email").min(1, "Email is required"),
  password: string()
    .min(8, "Password is required 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>0-9]/,
      "Password must contain at least one special character and one number"
    )
    .regex(/^[^\s]*$/, "Password must not contain spaces")
    .regex(/^[\x20-\x7E]*$/, "Password must not contain illegal characters"),
  ConfirmPassword: string()
    .min(8, "Password is required 8 charracters")
    .max(32, "Password must be less than 32 charracters"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords are not the same",
  path: ["ConfirmPassword"],
});

export const signInSchema = object({
  identifier: string().min(1, "Email is required"),
  password: string()
    .min(8, "Password is required 8 charracters")
    .max(32, "Password must be less than 32 charracters"),
});

export const mailSchema = object({
  email: string().email("Invalid email").min(1, "Email is required"),
});

export const resetPasswordSchema = object({
  password: string()
    .min(8, "Password is required 8 charracters")
    .max(32, "Password must be less than 32 charracters"),
  ConfirmPassword: string()
    .min(8, "Password is required 8 charracters")
    .max(32, "Password must be less than 32 charracters"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords are not the same",
  path: ["ConfirmPassword"],
});

export const inputAccountSchema = object({
  title: string().min(1, "Name is required"),
  account: string().email("Invalid email").min(1, "Account is required"),
  password: string().min(1, "Password is required"),
  description: string(),
  category: string(),
});

export const updateAccountSchema = object({
  title: string(),
  account: string(),
  password: string(),
  description: string(),
  category: string(),
  id: string(),
});

export const inputCategorySchema = object({
  name: string().min(1, "Name is required"),
  description: string(),
});
