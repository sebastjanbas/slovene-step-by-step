import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/video-player";

const VideoPage = async ({ params }) => {
  const { video: videoId } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("video-lesson")
    .select("*, course(title)")
    .eq("id", videoId);


  const link = `/courses/${data[0]?.course_id}/${videoId}`;

  if (error) {
    redirect(`/courses/${link}?error=Error fetching the video data`);
  }

  const { data: videoLink, error: videoError } = await supabase.storage
    .from("video-courses")
    .createSignedUrl(data[0].video_path, 3600);

  if (videoError) {
    redirect(`/courses/${link}?error=Error fetching the video`);
  }

  //  ------------------ FOR YOUTUBE --------------------------
  // const youtubeVideoId = "JS7GfwQ_UZg"
  // const videoLink = `https://www.youtube.com/embed/${youtubeVideoId}?&autoplay=1`
  {
    /* <iframe
        width="560"
        height="315"
        src={videoLink}
        frameborder="0"
        allowfullscreen=""
      ></iframe> */
  }
  //  ------------------ FOR YOUTUBE --------------------------

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="uppercase text-4xl text-center w-full">{data[0].course.title}</h1>
      <div className="flex flex-col w-full h-fit justify-center items-center max-w-7xl p-20">
        <VideoPlayer
          source={videoLink.signedUrl}
          thumbnail={data[0]?.thumbnail_url}
        />
        <h1 className="self-start text-start text-2xl mt-5 font-semibold">{data[0].title}</h1>
        <p className="self-start text-start mt-3">{data[0].description}</p>
      </div>
    </div>
  );
};

export default VideoPage;
