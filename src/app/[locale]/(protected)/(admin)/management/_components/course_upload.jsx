"use client";
import { CreateCourse } from "@/actions/course";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditCourseData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CourseUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditCourseData),
    defaultValues: {
      title: "",
      description: "",
      order: "",
    },
  });

  const onSubmit = async (values) => {
    setIsUploading(true);
    const result = await CreateCourse(values);

    if (result.error) {
      toast.error(result.error);
    } else {
      form.reset();
      toast.success(result.success);
      window.location.reload();
    }

    setIsUploading(false);
    setIsOpen(false);
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => setIsOpen(true)}>
            <Plus className="-translate-x-2 size-5 text-foreground" />
          </TooltipTrigger>
          <TooltipContent>Add a Course</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a Course</DialogTitle>
            <DialogDescription>Fill the course information</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Course Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormDescription>
                      Enter a brief description about the course
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        disabled={isUploading}
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Enter a description ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Number</FormLabel>
                    <FormDescription>
                      Enter a positive number you want the course to be listed
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        type="number"
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Course Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseUpload;
