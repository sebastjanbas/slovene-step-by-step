"use client";
import { CourseSkeleton } from "@/components/courses/Courses";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const CourseList = () => {
  const [courseData, setCourseData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("course").select("*");

      if (error) {
        redirect("/courses?error=Error trying to fetch course data");
      } else {
        setCourseData(data);
      }
    };

    fetchData();
  }, []);

  if (courseData === null) {
    return <CourseSkeleton />
  } 

  return (
    <>
      {courseData.sort((a, b) => a.order - b.order)
        .map((course, i) => (
          <Link key={i} href={`/courses/${course.id}`}>
            <div className="flex w-[400px] flex-col overflow-hidden items-center rounded-2xl border-foreground/50 border-[1px] shadow-xl">
              <Image
                height={250}
                width={400}
                className="h-[250px] object-cover"
                style={course.thumbnail_url ? {} : { opacity: "50%" }}
                src={
                  course.thumbnail_url ||
                  "https://placehold.co/600x400/orange/FFFFFF.png"
                }
                alt={course.title}
              />
              <div className="w-full px-6 py-3 flex justify-between">
                <div>
                  <h1 className="text-2xl text-start font-bold">
                    {course.title}
                  </h1>
                  <p className="text-lg">{course.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};
