import { Course } from "@/components/courses/Course";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const CourseDetailPage = async ({ params }) => {
  const { id: courseId } = await params;
  const supabase = await createClient();
  const { data: courseTitle, error: courseError } = await supabase
    .from("course")
    .select("title")
    .eq("id", courseId);
  const { data, error } = await supabase
    .from("video-lesson")
    .select("*")
    .eq("course_id", courseId);

  if (error || courseError) {
    redirect(`/courses/${courseId}?error=Error trying to fetch course data`);
  }
  /*  {
    id: '42d28ff1-a3eb-4a2a-bf3d-f7443a4264a2',
    course_id: '259e81d3-4aa1-49fd-9e0f-aceea62e7bdc',
    created_at: '2025-03-14T19:16:27.693988+00:00',
    title: 'Video 3',
    description: 'Video 3 description',
    video_path: null,
    thumbnail_url: 'https://ucarecdn.com/0146fdb9-80ca-44a2-b812-8a510eec35bf/-/preview/1000x562/',
    duration: 300,
    order: 1
  } */

  return (
    <>
      <h1 className="text-4xl text-center w-full">{courseTitle[0]?.title}</h1>

      <p>Course ID: {courseId}</p>

      <div className="w-full h-full flex flex-wrap justify-center items-center gap-10 p-10">
        {data
          .sort((a, b) => a.order - b.order)
          .map((video, i) => (
            <div key={i} className="w-[400px]">
              <Course
                image={video.thumbnail_url}
                title={video.title}
                description={video.description}
                href={`/courses/${courseId}/${video.id}`}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default CourseDetailPage;
