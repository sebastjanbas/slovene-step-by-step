"use client";
import React, { startTransition, useState, useTransition } from "react";
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

export const LoginForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, setTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                if (data.error) {
                    if (data.twoFactor === false) form.reset();
                    setError(data.error);
                }
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage>
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
                                    <FormLabel>Password</FormLabel>
                                    <Button
                                        size={"sm"}
                                        variant={"link"}
                                        className="float-right p-0"
                                        asChild
                                    >
                                        <Link href="/auth/reset-password">
                                            Forgot password?
                                        </Link>
                                    </Button>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="*****"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.password?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Log in
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
