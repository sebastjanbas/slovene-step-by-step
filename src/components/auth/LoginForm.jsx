"use client";
import React, { startTransition, useTransition } from "react";
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
import { login } from "@/actions/login";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PasswordInput } from "./TogglePassword";

export const LoginForm = () => {
    const t = useTranslations("Log in");
    const [isPending, startTransition] = useTransition();


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
                                        <PasswordInput isPending={isPending} field={field} />
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
