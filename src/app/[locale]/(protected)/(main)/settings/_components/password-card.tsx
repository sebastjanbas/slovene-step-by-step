"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import PasswordForm from "./password-form";
import { Skeleton } from "@/components/ui/skeleton";

const PasswordCard = () => {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  console.log(user);
  // Only render if user has password enabled
  // if (!user.passwordEnabled) return null;

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
            <DropdownMenuTrigger>
              <Button variant="outline" className="!py-0 !px-2 cursor-pointer">
                <IconDots />
              </Button>
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
            <DialogHeader className="px-6">
              <DialogTitle className="font-medium">Change Password</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="px-6">
              <PasswordForm />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PasswordCard;
