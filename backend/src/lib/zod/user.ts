import * as z from "zod";

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  clerkId: z.string(),
  name: z.string().nullish(),
  role: z.string().nullish(),
  image: z.string().nullish(),
  location: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
