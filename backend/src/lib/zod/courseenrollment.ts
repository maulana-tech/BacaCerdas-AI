import * as z from "zod";
import { CompletionStatus } from "@prisma/client";

export const CourseEnrollmentModel = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  status: z.nativeEnum(CompletionStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});
