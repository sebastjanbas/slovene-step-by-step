/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

const PasswordForm = () => {
  const { user } = useUser();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handlePasswordChange = async ({ password }: { password: string }) => {
    try {
      await user.updatePassword({ newPassword: password });
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Failed to update password");
    }
  };
  const handleEscapeClick = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27, // legacy
      which: 27, // legacy
      bubbles: true,
    });

    document.dispatchEvent(event);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    if (values.password !== values.confirmPassword) {
      setError("Password do not match!");
    }

    handlePasswordChange({ password: values.password });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="focus-visible:ring-0"
                  placeholder="Enter confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{error}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center gap-2">
          <Button
            type="button"
            onClick={handleEscapeClick}
            variant="outline"
            className="flex-1/2 rounded-xl cursor-pointer"
          >
            Close
          </Button>
          <Button type="submit" className="flex-1/2 rounded-xl cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
