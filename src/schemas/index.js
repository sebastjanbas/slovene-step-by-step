import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),

  code: z.optional(z.string()),
});

export const SignupSchema = z.object({
  firstName: z.string().min(3, {
    message: "Enter your first name",
  }),
  lastName: z.string().min(3, {
    message: "Enter your last name",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Please confirm your password",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Please confirm your password",
  }),
});

export const ResetPasswordEmail = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const EditUserProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Enter your full name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const UploadFilesSchema = z.object({
  folderName: z.string().min(3, {
    message: "Folder name must be at least 3 characters long",
  }),
  fileName: z.string().min(1, {
    message: "Invalid file name",
  }),
  file: z.instanceof(File, { message: "Invalid file" }),
});

export const EditCourseData = z.object({
  title: z.string().min(1, {
    message: "Enter a valid course name",
  }),
  description: z.string().min(1, {
    message: "Enter a valid course description",
  }),
  order: z.coerce
    .number({
      required_error: "Course number is required",
      invalid_type_error: "It must be a number",
    })
    .int({ message: "Munst be a whole number" })
    .positive({ message: "Must be a positive number" }),
});

export const CreateVideoData = z.object({
  title: z.string().min(1, {
    message: "Enter a valid video name",
  }),
  courseId: z
    .string({
      required_error: "Enter course ID",
    })
    .uuid({ message: "Enter a valid course ID" }),
  description: z.string().min(1, {
    message: "Enter a valid video description",
  }),
  duration: z.coerce
    .number({
      required_error: "Enter a duration in seconds",
      invalid_type_error: "It must be a number",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
  order: z.coerce
    .number({
      required_error: "Video number is required",
      invalid_type_error: "It must be a number",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
  videoPath: z
    .string({
      required_error: "Video path required",
    })
    .min(3),
  file: z.instanceof(File, { message: "Invalid file" }),
});


export const EditVideoData = z.object({
  title: z.string().min(1, {
    message: "Enter a valid video name",
  }),
  courseId: z
    .string({
      required_error: "Enter course ID",
    })
    .uuid({ message: "Enter a valid course ID" }),
  description: z.string().min(1, {
    message: "Enter a valid video description",
  }),
  duration: z.coerce
    .number({
      required_error: "Enter a duration in seconds",
      invalid_type_error: "It must be a number",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
  order: z.coerce
    .number({
      required_error: "Video number is required",
      invalid_type_error: "It must be a number",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
});
