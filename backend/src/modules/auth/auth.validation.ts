import z from "zod";

export class AuthLoginValidation {
  static schema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });

  static validate(data: unknown) {
    return this.schema.parse(data);
  }

  static safeValidate(data: unknown) {
    return this.schema.safeParse(data);
  }
}

export class AuthRegisterValidation {
  static schema = z.object({
    name: z.string().trim().min(3).max(50),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8).max(64),
  });

  static validate(data: unknown) {
    return this.schema.parse(data);
  }

  static safeValidate(data: unknown) {
    return this.schema.safeParse(data);
  }
}

export type AuthLogin = z.infer<typeof AuthLoginValidation.schema>;
export type AuthRegister = z.infer<typeof AuthRegisterValidation.schema>;
