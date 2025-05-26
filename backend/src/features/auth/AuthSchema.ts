import { z } from "zod";
import { UserModel } from "../../lib/zod";
import { Role } from "@prisma/client";

export default class AuthSchema {
  static login() {
    return z.object({
      data: z.object({
        identifier: z.string().min(1, "Identifier is required"),
        password: z.string().min(6, "Password is required"),
        role: z
          .nativeEnum(Role)
          .refine((value) => ["TEACHER", "STUDENT", "ROOT"].includes(value), {
            message: "Role must be either TEACHER, STUDENT",
          }),
      }),
    });
  }

  static register() {
    return z.object({
      data: UserModel.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      })
        .extend({
          password: z.string().min(6, "Password is required"),
          confirmPassword: z.string().min(6, "Confirm Password is required"),
          acceptTerms: z.boolean().refine((val) => val, {
            message: "You must accept the terms and conditions",
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords do not match",
        }),
    });
  }
}

export type LoginRequest = z.infer<ReturnType<typeof AuthSchema.login>>;
export type RegisterRequest = z.infer<ReturnType<typeof AuthSchema.register>>;
