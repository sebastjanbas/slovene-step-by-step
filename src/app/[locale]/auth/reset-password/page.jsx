"use client";
import { resetPassword } from "@/actions/reset-password";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { startTransition, useState, useTransition } from "react";

const ResetPasswordPage = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isPending, setTransition] = useTransition();

    const onSubmit = async (formData) => {
        const email = formData.get("email");
        setError("");
        setSuccess("");

        startTransition(async () => {
            const response = await resetPassword(email);
            if (response.error) {
                setError(response.error);
                form.reset();
                return;
            }

            if (response.success) {
                setSuccess(response.success);
            }
        });
    };

    return (
        <div className="relative bg-white dark:bg-[#121212] h-full w-full overflow-hidden flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold text-balance text-custom-light-1 dark:text-custom-dark-1">
                Forgot your Password?
            </h1>
            <p className="mt-5 text-md text-custom-light-2 dark:text-custom-dark-3">
                Enter your email address to reset your password
            </p>
            <FormError message={error} />
            <FormSuccess message={success} />
            <form action={onSubmit} className="mt-10 flex flex-col gap-2 w-96">
                <label>Email</label>
                <Input name="email" disabled={isPending} type="email" placeholder="Email" />
                <Button disabled={isPending} variant="mine" className="w-full" type="submit">
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
