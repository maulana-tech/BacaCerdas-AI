import * as z from "zod";
import { Role } from "@prisma/client";

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  role: z.nativeEnum(Role),
  image: z.string().nullish(),
  location: z.string().nullish(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
