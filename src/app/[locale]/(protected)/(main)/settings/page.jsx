import React from "react";
import { ProfilePicture } from "./_components/profile-picture";
import ProfileForm from "./_components/profle-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <h1 className="w-full text-center text-5xl ">Settings</h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfilePicture
          userImage={user.user_metadata.avatar_url || ""}
        />
        <ProfileForm user={user} />
      </div>
    </>
  );
};

export default SettingsPage;
