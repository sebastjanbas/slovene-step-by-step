"use server";

import { createClient } from "@/utils/supabase/server";
import { deleteImageUploadcare } from "./update-user";

export const UploadThumbnail = async (id, url, table, prevImageId) => {
  if (prevImageId) {
    const result = await deleteImageUploadcare(prevImageId);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("course")
    .update({ thumbnail_url: url })
    .eq("id", id);

  if (error) {
    return { error: error };
  } else {
    return { success: "Successfully updated the thumbnail!" };
  }
};

export const UpdateCourseInfo = async (id, values) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("course")
    .update({
      title: values.title,
      description: values.description,
      order: values.order,
    })
    .eq("id", id);

  if (error) {
    if (error.code == "23505") {
      return { error: "Course number already exists!" };
    }
    return { error: "Something went wrong!" };
  } else {
    return { success: "Information updated successfully!" };
  }
};

export const DeleteCourse = async (id) => {
  const supabase = await createClient();

  const response = await supabase.from("course").delete().eq("id", id);

  if (response.error) {
    return { error: "Could not delete the course" };
  } else {
    return { success: "Course deleted successfully!" };
  }
};

export const CreateCourse = async (values) => {
  const supabase = await createClient();

  const { error } = await supabase.from("course").insert({
    title: values.title,
    description: values.description,
    order: values.order,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Course number already exists!" };
    }
    return { error: "Error occured when creating a course" };
  } else {
    return { success: "Course created successfully!" };
  }
};

export const createVideo = async (values) => {
  const supabase = await createClient();

  const { error } = await supabase.from("video-lesson").insert({
    title: values.title,
    course_id: values.courseId,
    description: values.description,
    video_path: values.videoPath,
    duration: values.duration,
    order: values.order,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Video order number already exists!" };
    }
    return { error: "Error occured when creating a video" };
  } else {
    return { success: "Video created successfully!" };
  }
};
