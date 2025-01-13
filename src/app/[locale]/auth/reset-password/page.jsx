"use client";
import { resetPassword } from "@/actions/reset-password";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordEmail } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordPage = () => {
    const [isPending, startTransition] = useTransition();


    const form = useForm({
        resolver: zodResolver(ResetPasswordEmail),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values) => {

        startTransition(async () => {
            const response = await resetPassword(values);
            if (response.error) {
                toast.error(response.error);
                form.reset();
                return;
            }

            if (response.success) {
                toast.success(response.success);
            }
        });
    };

    return (
        <div className="relative bg-white dark:bg-[#121212] h-fit w-full overflow-hidden flex flex-col justify-center items-center">
            <div className="w-96 mt-32">
                <h1 className="text-4xl font-semibold text-balance text-custom-light-1 dark:text-custom-dark-1">
                    Forgot your Password?
                </h1>
                <p className="my-5 text-md text-custom-light-2 dark:text-custom-dark-3">
                    Enter your email address to reset your password
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-2 w-96">
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
                        <Button disabled={isPending} variant="mine" className="w-full" type="submit">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
