import { z } from "zod";

export default class AuthSchema {
  static login() {
    return z.object({
      data: z.object({
        identifier: z.string().min(1, "Identifier is required"),
        password: z.string().min(6, "Password is required"),
      }),
    });
  }

  static register() {
    return z.object({
      data: z
        .object({
          username: z.string().min(3, "Username is required"),
          name: z.string().min(3, "Name is required"),
          email: z.string().email("Invalid email address"),
          password: z.string().min(6, "Password is required"),
          confirmPassword: z.string().min(6, "Confirm Password is required"),
          acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
        }),
    });
  }
}
