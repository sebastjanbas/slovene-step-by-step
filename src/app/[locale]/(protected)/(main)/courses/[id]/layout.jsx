import React from "react";
import { LuListVideo } from "react-icons/lu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Course } from "@/components/courses/Course";

const CourseLayout = async ({ children, params }) => {

  const {id} = await params;

  return (
    <div className="h-full w-full flex flex-row-reverse md:flex-row">
      <div className="block md:hidden px-5 -translate-y-10">
        <Sheet>
          <SheetTrigger>
            <LuListVideo className="size-5" />
          </SheetTrigger>
          <SheetContent className="flex justify-start items-start">
            <SheetHeader className="text-start">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <Course id={id} type="sheet" />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block w-[350px] h-full border-foreground/50 border-r-[1px]">
        <Course id={id} />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default CourseLayout;
