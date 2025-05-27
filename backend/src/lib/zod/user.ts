import * as z from "zod";
import { Role } from "@prisma/client";
import {
  CompleteCourse,
  RelatedCourseModel,
  CompleteCourseEnrollment,
  RelatedCourseEnrollmentModel,
  CompleteQuizzAnswer,
  RelatedQuizzAnswerModel,
  CompleteSummarizedCourse,
  RelatedSummarizedCourseModel,
  CompleteUserProfilePicture,
  RelatedUserProfilePictureModel,
  CompleteUserQuizz,
  RelatedUserQuizzModel,
} from "./index";

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  Course: CompleteCourse[];
  CourseEnrollment: CompleteCourseEnrollment[];
  QuizzAnswer: CompleteQuizzAnswer[];
  SummarizedCourse: CompleteSummarizedCourse[];
  UserProfilePicture: CompleteUserProfilePicture[];
  UserQuizz: CompleteUserQuizz[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    Course: RelatedCourseModel.array(),
    CourseEnrollment: RelatedCourseEnrollmentModel.array(),
    QuizzAnswer: RelatedQuizzAnswerModel.array(),
    SummarizedCourse: RelatedSummarizedCourseModel.array(),
    UserProfilePicture: RelatedUserProfilePictureModel.array(),
    UserQuizz: RelatedUserQuizzModel.array(),
  }),
);
