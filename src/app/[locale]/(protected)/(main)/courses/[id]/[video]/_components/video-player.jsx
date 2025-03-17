"use client"
import React from "react";

const VideoPlayer = ({source, thumbnail}) => {
  return (
      <video
        width={1280}
        height={720}
        className="w-full aspect-video shadow-lg"
        controlsList="nodownload"
        controls
        poster={thumbnail}
      >
        <source
          src={source}
          type="video/mp4"
        />
      </video>
  );
};

export default VideoPlayer;
