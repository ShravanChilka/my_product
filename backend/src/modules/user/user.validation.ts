import z from "zod";

export class UserValidation {
  static create = z.object({
    name: z.string().trim().min(3).max(50),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });

  static getByEmailPassword = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });
}

export type UserCreate = z.infer<typeof UserValidation.create>;
export type UserGetByEmailPassword = z.infer<
  typeof UserValidation.getByEmailPassword
>;
