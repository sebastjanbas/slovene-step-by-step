"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { toast } from "sonner";
import { UploadThumbnail } from "@/actions/course";
import { extractId } from "../../../(main)/settings/_components/profile-picture";

const ThumbnailUploader = ({ prevImageUrl, type, id }) => {
  const table = type === "course" ? "course" : "video-lesson";

  const handleUpload = async (e) => {
    const imageUrl = e.cdnUrl;
    const prevImageId = extractId(prevImageUrl)

    const response = await UploadThumbnail(id, imageUrl, table, prevImageId)

    if (response.error) {
      toast.error(response.error)
    }
    else {
      toast.success(response.success)
    }

  };

  return (
    <div className="-translate-y-12">
      <FileUploaderRegular
        sourceList="local, url, camera"
        classNameUploader="uc-orange"
        pubkey="f51ca2a664320901a3c3"
        onFileUploadSuccess={(event) => handleUpload(event)}
      />
    </div>
  );
};

export default ThumbnailUploader;
