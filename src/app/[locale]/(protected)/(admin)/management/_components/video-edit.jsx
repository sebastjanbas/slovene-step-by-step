"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import "@uploadcare/react-uploader/core.css";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditVideoData } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DeleteVideo, UpdateVideoInfo } from "@/actions/course";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function formatDate(dateStr) {
  // format the date
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

function formatVideoDuration(seconds) {
  // Ensure seconds is a valid number
  const totalSeconds = Number(seconds);

  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return "0:00"; // Return a default value if invalid
  }

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  return hrs > 0
    ? `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${mins}:${String(secs).padStart(2, "0")}`;
}

const VideoEdit = ({data,id, title, courseId, desc, order, duration, date }) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditVideoData),
    defaultValues: {
      title: title,
      courseId: courseId,
      description: desc,
      order: order,
      duration: duration,
    },
  });

  const onSubmit = async (values) => {
    setIsUploading(true);

    const result = await UpdateVideoInfo(id, values);

    if (result.error) {
      toast.error(result.error);
    } else {
      form.reset();
      toast.success(result.success);
      window.location.reload();
    }

    setIsUploading(false);
  };

  const handleDelete = async () => {

    const response = await DeleteVideo(id);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
    }

    window.location.reload();
  };

  return (
    <div
      className="flex flex-row gap-5 justify-between items-center border-foreground/50 border-[1px] rounded-xl py-2 px-4"
    >
      <div className="w-[20%]">
        <span className="text-xl">{order}</span>
      </div>
      <div className="w-full">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="hidden md:block">{desc}</p>
      </div>
      <div className="w-[30%]">
        <p className="hidden md:block">{formatDate(date)}</p>
        <p className="inline-flex gap-2"><span className="hidden md:block">length: </span>{formatVideoDuration(duration)}</p>
      </div>

      <div>
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3 w-56 rounded-md">
                <DropdownMenuGroup>
                  <DialogTrigger className="w-full">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="h-[70vh] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Edit Panel</DialogTitle>
                <DialogDescription>
                  Edit the properties of the video
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </DialogContent>
            <AlertDialogContent className="border-red-700 border-[1px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500 tracking-wider">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this
                  video.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-700 text-white hover:bg-red-500"
                  >
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Dialog>
      </div>
    </div>
  );
};

export default VideoEdit;
