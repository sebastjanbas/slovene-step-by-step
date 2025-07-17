import { UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      Entry Page
      <UserButton />
    </div>
  );
};

export default page;
