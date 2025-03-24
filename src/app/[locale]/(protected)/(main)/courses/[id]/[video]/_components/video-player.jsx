"use client";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import {
  TbPictureInPictureOff,
  TbRewindBackward10,
  TbRewindForward10,
} from "react-icons/tb";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { TbPictureInPictureOn } from "react-icons/tb";
import "../video.module.css";
import { Slider } from "@/components/ui/slider";

const VideoPlayer = ({ source }) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPIP, setIsPIP] = useState(false);

  const handlePlay = () => {
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const goForward = (amount) => {
    if (videoRef.current) videoRef.current.currentTime += amount;
  };
  const goBackward = (amount) => {
    if (videoRef.current) videoRef.current.currentTime -= amount;
  };
  const mute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement == null) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const togglePIP = () => {
    if (containerRef.current) {
      if (document.pictureInPictureElement == null) {
        videoRef.current.requestPictureInPicture();
        setIsPIP(true);
      } else {
        document.exitPictureInPicture();
        setIsPIP(false);
      }
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);

    if (videoRef.current) videoRef.current.volume = newVolume / 100;
  };

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "Space":
        e.preventDefault();
        handlePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        goBackward(10);
        break;
      case "ArrowRight":
        e.preventDefault(10);
        goForward(10);
        break;
      case "KeyM":
        e.preventDefault();
        mute();
        break;
      case "KeyF":
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  };

  useEffect(() => {
    if (window.innerWidth < 769) setIsMobile(true);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, isMuted, isFullscreen]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center mx-auto group"
    >
      <div
        className={`hidden md:flex absolute z-50 transition-opacity flex-row gap-5 justify-center items-center duration-200 ease-in-out group-hover:opacity-100 ${isPlaying ? "opacity-0" : "opacity-100"}`}
      >
        <button
          className="bg-none border-none p-0"
          onClick={() => goBackward(10)}
        >
          <TbRewindBackward10 className="size-10" />
        </button>
        <button
          onClick={handlePlay}
          className="bg-none border-none p-0 size-20"
        >
          {!isPlaying ? (
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          )}
        </button>
        <button
          className="bg-none border-none p-0"
          onClick={() => goForward(10)}
        >
          <TbRewindForward10 className="size-10" />
        </button>
      </div>
      <div
        className={`hidden md:block absolute bottom-0 left-0 bg-none right-0 z-50 transition-opacity duration-200 ease-in-out group-hover:opacity-100 ${isPlaying ? "opacity-0" : "opacity-100"}`}
      >
        <div></div>
        <div className="flex px-2 py-1 w-full justify-between items-center">
          <div className="w-full max-w-40 flex flex-row items-center gap-2">
            <button
              className="bg-none border-none p-0 size-8"
              onClick={handlePlay}
            >
              {!isPlaying ? (
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8,5.14V19.14L19,12.14L8,5.14Z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M14,19H18V5H14M6,19H10V5H6V19Z"
                  />
                </svg>
              )}
            </button>
            <div className="flex w-full flex-row items-center gap-2">
              <button onClick={mute} className="bg-none border-none p-0">
                {!isMuted && volume !== 0 ? (
                  <SpeakerWaveIcon className="size-7 text-white" />
                ) : (
                  <SpeakerXMarkIcon className="size-7 text-white" />
                )}
              </button>
              <span className="hidden w-12 text-right">{volume}</span>
              <Slider
                className="w-full"
                min={0}
                max={100}
                defaultValue={[100]}
                onValueChange={handleVolumeChange}
                step={1}
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 mr-2">
            <button onClick={togglePIP} className="bg-none border-none p-0">
              {!isPIP ? (
                <TbPictureInPictureOn className="size-7" />
              ) : (
                <TbPictureInPictureOff className="size-7" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="bg-none border-none p-0"
            >
              {!isFullscreen ? (
                <RiFullscreenLine className="size-7" />
              ) : (
                <RiFullscreenExitLine className="size-7" />
              )}
            </button>
          </div>
        </div>
      </div>
      <video
        ref={videoRef}
        controls={isMobile}
        controlsList="nodownload"
        width={1280}
        height={720}
        className="w-full aspect-video shadow-lg"
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
