"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { toast } from "sonner";
import { UploadThumbnail } from "@/actions/course";
import { useState } from "react";

function extractId(url) {
  const pathname = new URL(url).pathname;
  return pathname.split("/")[1];
}

const ThumbnailUploader = ({ prevImageUrl, type, id }) => {
  const table = type === "course" ? "course" : "video-lesson";
  const [prevImageId, setPrevImageId] = useState(null)
  const handleUpload = async (e) => {
    const imageUrl = e.cdnUrl;
    
    if (prevImageUrl) {
      setPrevImageId(extractId(prevImageUrl));
    }
    const response = await UploadThumbnail(id, imageUrl, table, prevImageId);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
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
