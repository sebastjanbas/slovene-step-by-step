"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

function UploadcareButton({ onUpload }) {
    const router = useRouter();

    const handleUpload = async (e) => {
        console.log(e);
        const file = await onUpload(e.cdnUrl);
        if (file) {
            router.refresh();
        }
    };

    return (
        <div>
            <FileUploaderRegular
                sourceList="local, url, camera, dropbox"
                classNameUploader="uc-dark uc-purple"
                pubkey="39f9611dde04e9230bcc"
                onFileUploadSuccess={(event) => handleUpload(event)}
            />
        </div>
    );
}

export default UploadcareButton;
