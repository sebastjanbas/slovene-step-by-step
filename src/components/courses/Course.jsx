"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SheetDescription, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

export const Course = ({ id, type }) => {
  const [lessonData, setLessonData] = useState(null);
  useEffect(() => {
    const supabase = createClient();
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("video-lesson")
        .select("id, title, order, course(title)")
        .eq("course_id", id);
      if (error) {
        redirect(`/courses/${id}?error=Error trying to fetch course data`);
      }
      setLessonData(data);
    };

    fetchData();
  }, []);

  if (lessonData === null) {
    return <h1 className="animate-pulse">Loading ...</h1>;
  }

  if (type === "sheet") {
    return (
      <>
        <SheetTitle>{lessonData[0].course.title}</SheetTitle>
        <SheetDescription className="flex flex-col">
          {lessonData
            .sort((a, b) => a.order - b.order)
            .map((video, i) => (
              <Button
                key={i}
                asChild
                className="text-start bg-transparent flex justify-start items-center w-ful"
              >
                <Link href={`/courses/${id}/${video.id}`}>
                  <span className="text-foreground">{video.title}</span>
                </Link>
              </Button>
            ))}
        </SheetDescription>
      </>
    );
  }

  return (
    <section className="p-5">
      <h1 className="font-bold text-lg">{lessonData[0].course.title}</h1>
      <div className="ml-1">
        {lessonData
          .sort((a, b) => a.order - b.order)
          .map((video, i) => (
            <Button
              key={i}
              asChild
              className="text-start bg-transparent flex justify-start items-center w-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Link href={`/courses/${id}/${video.id}`}>
                <h1 className="text-foreground">{video.title}</h1>
              </Link>
            </Button>
          ))}
      </div>
    </section>
  );
};
