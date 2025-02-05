"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ProfilePicture = ({ userImage, onDelete, onUpload }) => {
    const router = useRouter();
    const onRemoveProfileImage = async () => {
        const response = await onDelete();
        if (response) {
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col ">
            <p className="text-lg text-white">Profile Picture</p>
            <div className="flex h-[30vh] flex-col items-center justify-center">
                {userImage ? (
                    <>
                        <div className="relative flex flex-col justify-center items-center h-full w-1/2">
                            <div className="relative aspect-square max-w-[80%]">
                                <img src={userImage} alt="User Image" />
                            </div>
                            <Button
                                onClick={onRemoveProfileImage}
                                className="relative bg-transparent text-white/70 hover:bg-transparent hover:text-white"
                            >
                                <X />
                                Remove Logo
                            </Button>
                        </div>
                    </>
                ) : (
                    // <UploadcareButton onUpload={onUpload} />
                    <div>Upload button</div>
                )}
            </div>
        </div>
    );
};
