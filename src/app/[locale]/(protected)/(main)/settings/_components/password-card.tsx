"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Lock } from "lucide-react";
import { IconDots } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import PasswordForm from "./password-form";

const PasswordCard = () => {
  const { isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full max-w-4xl rounded-2xl p-1 bg-accent border-none">
      <CardHeader className="pt-5">
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent className="bg-background border border-foreground/10 rounded-2xl px-4 py-6 flex items-center justify-between">
        {isLoaded ? (
          <div className="inline-flex justify-start items-center gap-2 text-foreground/80 text-xl">
            <Lock size={14} className="text-foreground/60" /> ••••••••••••••
          </div>
        ) : (
          <Skeleton></Skeleton>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 cursor-pointer rounded-sm border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
              <IconDots size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="shadow-lg">
              <DialogTrigger asChild className="cursor-pointer">
                <DropdownMenuItem className="py-0">
                  Change password
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="rounded-2xl px-0" showCloseButton={false}>
            <DialogHeader className="hidden">
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full justify-center items-center px-6">
              <PasswordForm />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PasswordCard;
