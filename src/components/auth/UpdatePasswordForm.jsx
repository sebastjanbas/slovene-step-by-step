"use client";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/schemas";
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
import { updatePassword } from "@/actions/reset-password";

export const UpdatePasswordForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, setTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values) => {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const response = await updatePassword(values);

            if (response.error) {
                setError(response.error);
                form.reset();
                return;
            }

            if (response.success) {
                setSuccess(response.success);
                window.location.href = '/'; // reload the page for client components
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
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
                                <FormLabel>Confirm Password</FormLabel>
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
                <Button variant={"mine"} disabled={isPending} type="submit" className="w-full">
                    Reset Password
                </Button>
            </form>
        </Form>
    );
};
