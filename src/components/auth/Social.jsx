"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { BsApple } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { OAuthSignIn } from "@/actions/login";

export const Social = () => {
    const handleOAuth = (provider) => {
        OAuthSignIn(provider)
    };

    return (
        <div className="flex flex-col w-full gap-y-4 md:gap-x-2 md:max-w-[400px]">
            <Button
                size={"lg"}
                variant={"social"}
                className="w-full rounded-[6px]"
                // onClick={() => handleOAuth("github")}
                onClick={() => { }}
            >
                <BsApple className="w-16 h-16 text-gray-600 dark:text-gray-300" />
                <p className="text-gray-600 dark:text-gray-300">Continue with Apple</p>
            </Button>
            <Button
                size={"lg"}
                variant={"social"}
                className="w-full rounded-[6px]"
                onClick={() => handleOAuth("google")}
            >
                <FaGoogle className=" hidden w-5 h-5 dark:block text-gray-300 dark:text-gray-300" />
                <FcGoogle className="dark:hidden block w-5 h-5" />
                <p className="text-gray-600 dark:text-gray-300">Continue with Google</p>
            </Button>
        </div>
    );
};
