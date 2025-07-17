import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/video-player";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const VideoPage = async ({ params }) => {
  const { video: videoId } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("video-lesson")
    .select("*, course(title)")
    .eq("id", videoId);

  if (error) {
    redirect(`/courses?error=Error fetching the video data`);
  }

  const { data: videoLink, error: videoError } = await supabase.storage
    .from("video-courses")
    .createSignedUrl(data[0].video_path, 3600);

  if (videoError) {
    redirect(`/courses?error=Error fetching the video`);
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
      <VideoPlayer
        source={videoLink.signedUrl}
        thumbnail={data[0]?.thumbnail_url}
      />
      <div className="flex flex-col w-full p-5 h-[600px] justify-start items-center">
        <h1 className="text-center text-5xl mt-20 font-semibold">
          {data[0].title}
        </h1>
        <p className="self-start text-start mt-5">{data[0].description}</p>
      </div>
      <div>
        <h1>You have completed this lecture</h1>
        <Button>
            Next lecture <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default VideoPage;
