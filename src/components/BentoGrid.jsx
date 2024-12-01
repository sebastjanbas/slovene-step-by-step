"use client";
import SvgBlob from "./ui/svg-blob";
import SvgBlobContainer from "./ui/svg-blob-container";
import { link } from "@/lib/docs";
import Lottie from "lottie-react";
import teacherAnimation from "@/animations/teacher-animation.json";
import supportAnimation from "@/animations/support.json";
import personalizedLearningAnimation from "@/animations/personalized-learning.json";
import videoCallAnimation from "@/animations/video-call.json";
import { useRef } from "react";

export default function BentoGrid() {
    const teacherA = useRef();
    const supportA = useRef();
    const personalizedA = useRef();
    const videoCallA = useRef();
    return (
        <>
            <div className="mt-10 flex flex-col lg:grid gap-4 sm:mt-16 lg:grid-cols-10 lg:grid-rows-6">
                <div className="px-8 py-8 gap-8 lg:col-span-6 lg:row-span-3 flex flex-col justify-around items-center shadow-lg border rounded-3xl">
                    <div className="w-full flex flex-col lg:flex-row items-center">
                        <div>
                            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                Online lessons
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                Learn Slovenian from the comfort of your home! Our lessons are
                                conducted via Skype, offering flexibility and convenience no
                                matter where you are. Connect with experienced teachers and
                                immerse yourself in engaging, interactive sessions tailored to
                                your goals.
                            </p>
                        </div>
                        <Lottie
                            className="hidden lg:flex"
                            lottieRef={videoCallA}
                            animationData={videoCallAnimation}
                            loop={false}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                        <Lottie lottieRef={teacherA} animationData={teacherAnimation} />
                        <div>
                            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                Free trial lesson
                            </h2>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                During this lesson you will get acquainted with our methodology,
                                learn the details of the program and get answers to all your
                                questions.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8 lg:col-span-4 lg:row-span-4 flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        Be a part of a community
                    </h2>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                        Join our vibrant community of over 1,200 learners on Telegram! Share
                        experiences, ask questions, and practice Slovenian with fellow
                        students in a supportive and engaging environment.
                        <br />
                        Learning is better together!
                    </p>
                    <div className="relative min-h-[20rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                        <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                            <img
                                className="size-full object-cover object-top"
                                src={`${link}/phone.png`}
                                alt="phone demo"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8 lg:col-span-4 lg:row-span-3 flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        Support every step of the way
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                        Stay on track with help from our dedicated course curator. From
                        answering your questions to providing valuable feedback, we're here
                        to make your learning journey smooth and successful.
                    </p>

                    <Lottie
                        className="size-2/5 lg:size-3/5"
                        lottieRef={supportA}
                        animationData={supportAnimation}
                        loop={false}
                    />
                </div>

                <div className="hidden lg:gap-3 lg:px-8 lg:py-8 lg:col-span-2 lg:row-span-1 lg:flex flex-col justify-center items-center shadow-lg border rounded-3xl">
                    <img
                        className="size-10"
                        src={`${link}/Logo.svg`}
                        alt="Company Logo"
                    />
                    <h1 className="uppercase text-center text-[0.590rem] text-[#5C6BC0] font-bold">
                        Slovene Step By Step
                    </h1>
                </div>

                <div className="px-8 py-8 col-span-6 row-span-2 flex flex-col lg:flex-row justify-center items-center shadow-lg border rounded-3xl">
                    <div>
                        <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                            Personalized learning plans
                        </h2>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                            Achieve your goals faster with a program designed just for you.
                            Whether you're learning for travel, work, or relocation, our
                            tailored approach ensures every lesson is relevant and effective..
                        </p>
                    </div>
                    <Lottie
                        className="size-7/12 lg:size-auto"
                        lottieRef={personalizedA}
                        animationData={personalizedLearningAnimation}
                        onComplete={() => {
                            personalizedA.current.playSegments([25, 75], false);
                        }}
                        loop={false}
                    />
                </div>
            </div>
        </>
    );
}
