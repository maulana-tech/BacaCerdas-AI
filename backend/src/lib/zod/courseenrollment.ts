import * as z from "zod";
import { CompletionStatus } from "@prisma/client";
import { CompleteUser, RelatedUserModel } from "./index";

export const CourseEnrollmentModel = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  status: z.nativeEnum(CompletionStatus),
  progress: z.number().int(),
  lastAccessedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCourseEnrollment
  extends z.infer<typeof CourseEnrollmentModel> {
  User: CompleteUser;
}

/**
 * RelatedCourseEnrollmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseEnrollmentModel: z.ZodSchema<CompleteCourseEnrollment> =
  z.lazy(() =>
    CourseEnrollmentModel.extend({
      User: RelatedUserModel,
    }),
  );
