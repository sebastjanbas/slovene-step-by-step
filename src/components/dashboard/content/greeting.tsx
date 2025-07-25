"use client";
import React from "react";
import { useUserInfo } from "../auth/user-context";

const Greeting = () => {
  const user = useUserInfo();
  if (!user) {
    return (
      <div className="inline-flex gap-2 justify-center items-center pb-3">
        <h1 className="text-2xl md:text-4xl">Hi</h1>
      </div>
    );
  }
  return (
    <h1 className="block text-2xl md:text-4xl pb-3 tracking-tight">
      Welcome back{" "}
      <strong className="font-medium">{user.name.split(" ")?.[0]}</strong>!
    </h1>
  );
};

export default Greeting;
