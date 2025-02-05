import React from "react";
import { ProfilePicture } from "./_components/profile-picture";
import ProfileForm from "./_components/profle-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/login");
    }

    const removeProfileImage = async () => {
        "use server";
        // TODO
    };

    const uploadProfileImage = async (image) => {
        "use server";
        // TODO
    };

    const updateUserInfo = async (name) => {
        "use server";
        // TODO
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-gray-300 dark:border-white/20 bg-background/50 p-6 text-4xl backdrop-blur-lg">
                <span>Settings</span>
            </h1>
            <div className="flex flex-col gap-10 p-6">
                <div>
                    <h2 className="text-2xl font-bold">User Profile</h2>
                    <p className="text-base text-white/50">
                        Add or update your information
                    </p>
                </div>
                <ProfilePicture
                    onDelete={removeProfileImage}
                    userImage={user.user_metadata.avatar_url || ""}
                    onUpload={uploadProfileImage}
                />
                <ProfileForm user={user} onUpdate={updateUserInfo} />
            </div>
        </div>
    );
};

export default SettingsPage;
