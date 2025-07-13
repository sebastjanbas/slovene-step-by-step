"use server";

import { createClient } from "@/utils/supabase/server";
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client"; // delete the image on the uploadcare server


// Update Users name
export const updateUserName = async (name) => {
  const supabase = await createClient(); // get the user through session

  const { data, error } = await supabase.auth.updateUser({ // update the full_name
    data: { full_name: name },
  });
  
  // return error message if unsuccessful
  if (error) {
    console.error("Error updating user:", error.message);
    return { error: error.message };
  }

  return { success: "Changes Saved!" }; // return success message
};

// Update user picture
export const updateUserAvatar = async (image) => {
  const supabase = await createClient(); // get user through session

  const {data, error} = await supabase.auth.updateUser({ // update user with link to UploadCare server
    data: {avatar_url: image}
  })
  
  if (error) { // return error message if unsuccessful
    console.error("Error updating user:", error.message);
    return { error: error.message };
  }

  return { success: "Changes Saved!" }; // return success message
}


// Delete Image on uploadcare server (if users delete image in the application it should be deleted on the server as well)
export const deleteImageUploadcare = async (imageId) => {

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({ // authentication info
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
      secretKey: process.env.UPLOADCARE_PRIVATE_KEY,
    });

    const result = await deleteFile( // run teh delete function
          {
            uuid: imageId,
          },
          { authSchema: uploadcareSimpleAuthSchema },
        );

    return result; // return
}
