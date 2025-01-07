"use client";
import React, { startTransition, useState, useTransition } from "react";

import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { SignupSchema } from "@/schemas";
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
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { signup } from "@/actions/signup";
import { useTranslations } from "next-intl";

export const SignupForm = () => {
    const t = useTranslations("Sign up");
    const [isPending, setTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            signup(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel={t("label")}
            headerTitle={t("title")}
            backButtonLabel={t("link-text")}
            backButtonHref="/auth/login"
            backButtonLinkLabel={t("link")}
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="inline-flex space-x-4 items-start w-full">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>{t("first-name")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder={t("first-name")}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500">
                                            {form.formState.errors.firstName?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>{t("last-name")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder={t("last-name")}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500">
                                            {form.formState.errors.lastName?.message}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{(t("email"))}</FormLabel>
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
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="*****"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500">
                                        {form.formState.errors.password?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("confirm-password")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="*****"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500">
                                        {form.formState.errors.confirmPassword?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} variant={"mine"} type="submit" className="w-full">
                        {t("button")}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
