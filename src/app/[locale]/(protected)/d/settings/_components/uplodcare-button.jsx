"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { updateUserAvatar } from "@/actions/update-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UploadcareButton() {
  const router = useRouter();
  const handleUpload = async (e) => {
    const imageUrl = e.cdnUrl+"-/preview/512x512/-/format/auto/-/quality/smart/"
    const response = await updateUserAvatar(imageUrl);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response.success) {
      toast.success(response.success);
      // window.location.href = "/settings"; // reload the page for client components
      router.refresh();
    }
  };

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url, camera"
        classNameUploader="uc-orange"
        pubkey="f51ca2a664320901a3c3"
        onFileUploadSuccess={(event) => handleUpload(event)}
      />
    </div>
  );
}

export default UploadcareButton;
