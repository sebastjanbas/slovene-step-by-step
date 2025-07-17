"use client";
import { CourseSkeleton } from "@/components/courses/Courses";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const CourseList = () => {
  const [courseData, setCourseData] = useState(null);
  const [courseUrl, setCourseUrl] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("course")
        .select("*, video-lesson:id (id)")
        .order("order");

      if (error) {
        redirect("/courses?error=Error trying to fetch course data");
      } else {
        setCourseData(data);

        let newArray = [];
        data?.map((item) => {
          if (item?.["video-lesson"].length > 0) {
            item?.["video-lesson"].sort((a, b) => a.order - b.order);
            const videoId = item?.["video-lesson"][0]?.id;
            const url = "/courses/" + item.id + "/" + videoId;
            newArray.push({course: item.title ,url: url})
          }
        });
            setCourseUrl(newArray);
      }
    };

    fetchData();
  }, []);

  if (courseData === null) {
    return <CourseSkeleton />;
  }

  return (
    <>
      {courseData.map((course, i) => (
        <Link key={i} href={courseUrl[i].url}>
          <div className="flex w-full max-w-[400px] flex-col overflow-hidden items-center rounded-2xl border-foreground/50 border-[1px] shadow-xl">
            <Image
              height={250}
              width={400}
              className="h-[180px] md:h-[250px] object-cover"
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
