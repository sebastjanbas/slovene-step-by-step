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
import { EditCourseData } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ThumbnailUploader from "./thumbnail-upload";
import { DeleteCourse, UpdateCourseInfo } from "@/actions/course";
import { toast } from "sonner";

function formatDate(dateStr) {
  // format the date
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

const CourseEdit = ({ id, title, desc, image, date, order }) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditCourseData),
    defaultValues: {
      title: title,
      description: desc,
      order: order,
    },
  });

  const onSubmit = async (values) => {
    setIsUploading(true);
    const result = await UpdateCourseInfo(id, values);

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
    const response = await DeleteCourse(id);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
    }

    window.location.reload();
  };

  return (
    <div className="flex py-3 md:py-5 px-5 md:px-10 overflow-hidden flex-row justify-between items-center w-full h-fit border-foreground/40 rounded-lg border-[1px]">
      <div className="flex flex-col w-full justify-start items-start ">
        <h1 className="text-lg">{title}</h1>
        <p className="hidden md:block">{desc}</p>
      </div>
      <div className="w-full">
        <p className="text-sm italic">Created: <br className="block md:hidden" /> {formatDate(date)}</p>
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Panel</DialogTitle>
                <DialogDescription>
                  Edit the properties of the course
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                          Enter a positive number you want the course to be
                          listed
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
              <div className="w-full flex justify-end">
                <ThumbnailUploader
                  type={"course"}
                  id={id}
                  prevImageUrl={image}
                />
              </div>
            </DialogContent>
            <AlertDialogContent className="border-red-700 border-[1px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500 tracking-wider">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  course and remove the data from our servers.
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

export default CourseEdit;
