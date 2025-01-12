"use client";
import React, { startTransition, use, useState, useTransition } from "react";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./FormError";
import { login } from "@/actions/login";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { EyeDropperIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import { set } from "zod";

export const LoginForm = () => {
    const t = useTranslations("Log in");
    const [isPending, setTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {

        startTransition(async () => {
            const response = await login(values);

            if (response.error) {
                form.resetField("password");
                toast.error(response.error);
                return;
            }

            if (response.success) {
                toast.success(response.success);
                window.location.href = '/'; // reload the page for client components
            }
        });
    };

    return (
        <CardWrapper
            headerLabel={t("label")}
            headerTitle={t("title")}
            backButtonLabel={t("link-text")}
            backButtonLinkLabel={t("link")}
            backButtonHref="/auth/signup"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("email")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="example@mail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500">
                                        {form.formState.errors.email?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("password")}</FormLabel>
                                    <FormControl>
                                        <div className="flex h-10 w-full rounded-[6px] border border-gray-400 dark:border-gray-800 bg-background text-base">
                                            <input
                                                className="flex h-10 w-full  bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                                {...field}
                                                disabled={isPending}
                                                placeholder="*****"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <EyeIcon className="h-6 w-6" />
                                                ) : (
                                                    <EyeSlashIcon className="h-6 w-6" />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500">
                                        {form.formState.errors.password?.message}
                                    </FormMessage>
                                    <Button
                                        size={"sm"}
                                        variant={"link"}
                                        className="p-0 text-custom-accent-l dark:text-custom-accent-d"
                                        asChild
                                    >
                                        <Link href="/auth/reset-password">
                                            {t("forgot-password")}
                                        </Link>
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <FormError message={error} /> */}
                    <Button variant={"mine"} disabled={isPending} type="submit" className="w-full">
                        {t("button")}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
