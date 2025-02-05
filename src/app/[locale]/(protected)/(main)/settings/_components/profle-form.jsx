"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { EditUserProfileSchema } from "@/schemas";

const ProfileForm = ({ user, onUpdate }) => {
    const [isLoading, setLoading] = useState(false);

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        await onUpdate(values.name);
        setLoading(false);
    };

    useEffect(() => {
        form.reset({ name: user.name, email: user.email });
    }, [user]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg text-current">
                                User full name
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Name" type="text" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={true}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">User email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Email" type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="self-start rounded-full transition-all duration-300 hover:bg-custom-button-hover-l hover:text-white"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 animate-spin" />
                            Saving
                        </>
                    ) : (
                        "Save User Settings"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
