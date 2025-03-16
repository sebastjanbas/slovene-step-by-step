"use server"

import { createClient } from "@/utils/supabase/server"
import { deleteImageUploadcare } from "./update-user";

export const UploadThumbnail = async (id, url, table, prevImageId) => {

  if (prevImageId) {
    const result = await deleteImageUploadcare(prevImageId)
  }


  const supabase = await createClient();
  const {error} = await supabase.from(table).update({thumbnail_url: url}).eq("id", id.toString())

  if (error) {
    return {error: error}
  }
  else {
    return {success: "Successfully updated the thumbnail!"}
  }
}


export const UpdateCourseInfo = async (id, values) => {
  const supabase = await createClient();

  const {error} = await supabase.from("course").update({title: values.title, description: values.description}).eq("id", id)

  if (error) {
    return {error: "Something went wrong!"}
  }
  else {
    return {success: "Information updated successfully!"}
  }

}



