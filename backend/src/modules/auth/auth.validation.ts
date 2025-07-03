import z from "zod";

export default class AuthValidation {
  static loginBody = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });

  static registerBody = z.object({
    name: z.string().trim().min(3).max(50),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });
}

export type AuthLoginBody = z.infer<typeof AuthValidation.loginBody>;
export type AuthRegisterBody = z.infer<typeof AuthValidation.registerBody>;
