"use client";

import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";
import { Divider } from "./Divider";


export const CardWrapper = ({
    children,
    headerLabel,
    headerTitle,
    backButtonLabel,
    backButtonLinkLabel,
    backButtonHref,
    showSocial,
}) => {
    return (
        <Card className="w-full h-full sm:max-w-[400px]">
            <CardHeader>
                <Header title={headerTitle} label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <Divider />
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton linkLabel={backButtonLinkLabel} label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
