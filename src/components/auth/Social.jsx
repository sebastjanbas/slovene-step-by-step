"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { BsApple } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { OAuthSignIn } from "@/actions/login";
import { useTranslations } from "next-intl";

export const Social = () => {
    const t = useTranslations("Log in");
    const handleOAuth = (provider) => {
        OAuthSignIn(provider)
    };

    return (
        <div className="flex flex-col w-full gap-y-4 md:gap-x-2 md:max-w-[400px]">
            <Button
                size={"lg"}
                variant={"social"}
                className="w-full rounded-[6px]"
                onClick={() => handleOAuth("google")}
            >
                <FaGoogle className=" hidden w-5 h-5 dark:block dark:text-custom-dark-3" />
                <FcGoogle className="dark:hidden block w-5 h-5" />
                <p className="text-custom-light-3 dark:text-custom-dark-3">{t("continue-google")}</p>
            </Button>
        </div>
    );
};
