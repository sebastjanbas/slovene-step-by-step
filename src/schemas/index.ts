import * as z from "zod";

export const EditCourseData = z.object({
  title: z.string().min(1, {
    message: "Enter a valid course name",
  }),
  description: z.string().min(1, {
    message: "Enter a valid course description",
  }),
    order: z.coerce
  .number({
    message: "Course number is required and must be a number",
  })
  .int({ message: "Must be a whole number" })
  .positive({ message: "Must be a positive number" }),
});

export const CreateVideoData = z.object({
  title: z.string().min(1, {
    message: "Enter a valid video name",
  }),
  courseId: z
    .string({
      message: "Enter course ID",
    })
    .uuid({ message: "Enter a valid course ID" }),
  description: z.string().min(1, {
    message: "Enter a valid video description",
  }),
  duration: z.coerce
    .number({
      message: "Enter a duration in seconds",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
  order: z.coerce
    .number({
      message: "Video number is required",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
  videoPath: z
    .string({
      message: "Video path required",
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
      message: "Enter course ID",
    }),
  description: z.string().min(1, {
    message: "Enter a valid video description",
  }),
  duration: z.coerce
    .number({
      message: "Enter a duration in seconds",
    })
    .int({ message: "Must be a whole number" })
    .positive({ message: "Must be a positive number" }),
    order: z.coerce
      .number({
        message: "Video number is required",
      })
      .int({ message: "Must be a whole number" })
      .positive({ message: "Must be a positive number" })
  });

