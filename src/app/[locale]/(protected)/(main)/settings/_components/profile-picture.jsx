"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UploadcareButton from "./uplodcare-button";
import { deleteImageUploadcare, updateUserAvatar } from "@/actions/update-user";
import { toast } from "sonner";
import UploadcareImage from "@uploadcare/nextjs-loader";


export const ProfilePicture = ({ userImage }) => {
  const router = useRouter();

  // extract id from url
  function extractId(url) {
    const pathname = new URL(url).pathname;
    return pathname.split("/")[1];
  }

  const onRemoveProfileImage = async () => {

    const imageId = extractId(userImage); // extract if from the url
    const result = deleteImageUploadcare(imageId)

    const response = await updateUserAvatar("");

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response.success) {
      toast.success(response.success);
      // window.location.href = "/settings"; // reload the page for client components
      router.refresh(); // refresh the page
    }
  };

  return (
    <div className="flex flex-col ">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex h-full flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className="relative flex flex-col gap-10 justify-center items-center h-full w-1/2">
              <div className="relative pt-10 aspect-square w-56">
                <UploadcareImage
                  src={userImage}
                  width="512"
                  height="512"
                  alt="User Image"
                />
              </div>
              <Button
                onClick={onRemoveProfileImage}
                variant={"link"}
                className=""
              >
                <X />
                Remove Profile Photo
              </Button>
            </div>
          </>
        ) : (
          <UploadcareButton />
        )}
      </div>
    </div>
  );
};
