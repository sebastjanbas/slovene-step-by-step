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
import { EditVideoData } from "@/schemas";
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
    resolver: zodResolver(EditVideoData),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      order: "",
    },
  });

  const onSubmit = async (values) => {
    setIsUploading(true);

    console.log("SUBMITTING...")
    console.log("VALUES: ", values)

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
          <TooltipContent>Add a Video</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a Video</DialogTitle>
            <DialogDescription>Fill the video information</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Video title"
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
                      Enter a brief description about the video 
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duratoin</FormLabel>
                    <FormDescription>
                      Enter duration in seconds
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        type="number"
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Enter duration"
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
                    <FormLabel>Video Number</FormLabel>
                    <FormDescription>
                      Enter a positive number you want the video to be listed
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
              <Button type="submit">Upload Video</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseUpload;
