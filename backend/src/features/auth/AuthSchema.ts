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
}
