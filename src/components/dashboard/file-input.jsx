"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { UploadFilesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const supabase = createClient();

const FileInput = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values) => {
    const file = values.file;
    if (!file) {
      return;
    }

    const postfix = values.file.name.split(".")[1];
    const path = `${values.folderName}/${values.fileName}.${postfix}`;

    setIsUploading(true);

    const { data, error } = await supabase.storage
      .from("video-courses")
      .upload(path, values.file, {
        cacheControl: "3600",
        upsert: false,
      });


    if (data) {
      toast.success(`File saved: ${data.fullPath}`)
    }
    if (error) {
      toast.error("Something went wrong");
    }

    setIsUploading(false);
    setIsOpen(false);
  };

  const form = useForm({
    resolver: zodResolver(UploadFilesSchema),
    defaultValues: {
      fileName: "",
      folderName: "",
      file: null,
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Upload Button */}
      <Button onClick={() => setIsOpen(true)}>
        <Upload /> Upload Files
      </Button>

      {/* Dialog (Progress Bars) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uploade Files</DialogTitle>
            <DialogDescription>
              Select a file and enter the details before submitting.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Name</FormLabel>
                    <FormControl>
                      <Input
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="File Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder Name</FormLabel>
                    <FormControl>
                      <Input
                        className="!focus:ring-0 !focus:outline-none !ring-transparent !outline-none"
                        placeholder="Folder Name"
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
              <Button type="submit"><Upload /> Upload</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileInput;
