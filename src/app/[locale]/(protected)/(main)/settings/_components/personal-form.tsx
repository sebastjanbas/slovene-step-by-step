/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

const PersonalForm = ({ user, isLoaded }: { user: any; isLoaded: boolean }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  useEffect(() => {
    if (isLoaded && user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [isLoaded, user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await user.update({
      firstName: values.firstName,
      lastName: values.lastName,
    });
    toast.success("User updated!");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row items-center justify-center gap-10">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1/2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  {isLoaded ? (
                    <Input {...field} />
                  ) : (
                    <Skeleton className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <div className="h-full w-full bg-muted animate-pulse rounded-md" />
                    </Skeleton>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1/2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  {isLoaded ? (
                    <Input {...field} />
                  ) : (
                    <Skeleton className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                      <div className="h-full w-full bg-muted animate-pulse rounded-md" />
                    </Skeleton>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="hidden" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PersonalForm;
