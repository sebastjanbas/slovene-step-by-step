"use client";
import { createVideo } from "@/actions/course";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditVideoData } from "@/schemas";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CourseUpload = ({ data }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditVideoData),
    defaultValues: {
      courseId: "",
      title: "",
      description: "",
      duration: "",
      order: "",
      videoPath: "",
      file: null,
    },
  });

  const onSubmit = async (values) => {
    const supabase = createClient();
    const { file, ...newValues } = values;

    setIsUploading(true);

    if (!file) {
      toast.error("File Upload failed!");
      return;
    }

    const response = await createVideo(newValues);

    const { error } = await supabase.storage
      .from("video-courses")
      .upload(values.videoPath, values.file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast.error("File Upload failed!");
    }

    if (response.error) {
      toast.error(response.error);
    } else {
      form.reset();
      toast.success(response.success);
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
          <TooltipContent>Add a Video</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="overflow-scroll h-[75vh]">
          <DialogHeader>
            <DialogTitle>Upload a Video</DialogTitle>
            <DialogDescription>Fill the video information</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a course</FormLabel>
                    <FormDescription>
                      Select a course this video belongs to
                    </FormDescription>
                    <FormControl>
                      <Select
                        disabled={isUploading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full !focus:ring-0 !focus:outline-none !ring-transparent !outline-none">
                          <SelectValue placeholder="Course Name" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((course, i) => (
                            <SelectItem key={i} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Title</FormLabel>
                    <FormDescription>
                      Enter the name of the video
                    </FormDescription>
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
                      Enter duration of the video in seconds
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        type="number"
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="ex: 300 (5min)"
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
                    <FormLabel>Video order number</FormLabel>
                    <FormDescription>
                      Enter the position of the video in the course (e.g., 1 for
                      the first video)
                    </FormDescription>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        type="number"
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="ex: 1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Path</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isUploading}
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="ex: <folder-name>/<file-name>"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        disabled={isUploading}
                        // accept=".jpg,.png,.pdf"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          if (file) {
                            form.setValue("file", file, {
                              shouldValidate: true,
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Upload Video</span>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseUpload;
