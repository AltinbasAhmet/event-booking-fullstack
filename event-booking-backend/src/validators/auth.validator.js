const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),

  role: z.enum(["ORGANISER", "ATTENDEE"], {
    errorMap: () => ({ message: "Role must be ORGANISER or ATTENDEE" }),
  }),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};