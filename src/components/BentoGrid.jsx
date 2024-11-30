"use client";
import SvgBlob from "./ui/svg-blob";
import SvgBlobContainer from "./ui/svg-blob-container";
import { link } from "@/lib/docs";
import Lottie from "lottie-react";
import teacherAnimation from "@/animations/teacher-animation.json";
import supportAnimation from "@/animations/support.json";
import personalizedLearningAnimation from "@/animations/personalized-learning.json";
import { useRef } from "react";

export default function BentoGrid() {
    const teacherA = useRef(null);
    const supportA = useRef(null);
    const personalizedA = useRef(null);
    return (
        <>
            <SvgBlobContainer top={true}>
                <SvgBlob color="green" />
                <SvgBlob color="blue" />
            </SvgBlobContainer>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-base/7 font-semibold text-indigo-600">
                        Learn faster
                    </h2>
                    <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                        Why choose us
                    </p>
                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                        <div className="relative lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Be a part of a community
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Join our vibrant community of over 1,200 learners on
                                        Telegram! Share experiences, ask questions, and practice
                                        Slovenian with fellow students in a supportive and engaging
                                        environment.
                                        <br />
                                        Learning is better together!
                                    </p>
                                </div>
                                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                    <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                        <img
                                            className="size-full object-cover object-top"
                                            src={`${link}/phone.png`}
                                            alt="phone demo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                        </div>
                        <div className="relative max-lg:row-start-1">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Online lessons
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Learn Slovenian from the comfort of your home! Our lessons
                                        are conducted via Skype, offering flexibility and
                                        convenience no matter where you are. Connect with
                                        experienced teachers and immerse yourself in engaging,
                                        interactive sessions tailored to your goals.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                    <Lottie
                                        lottieRef={teacherA}
                                        animationData={teacherAnimation}
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                        </div>
                        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                            <div className="absolute inset-px rounded-lg bg-white"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Personalized learning plans
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Achieve your goals faster with a program designed just for
                                        you. Whether you're learning for travel, work, or
                                        relocation, our tailored approach ensures every lesson is
                                        relevant and effective..
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                                    <Lottie
                                        lottieRef={personalizedA}
                                        animationData={personalizedLearningAnimation}
                                        onComplete={() => {
                                            personalizedA.current.playSegments([25, 75], false)
                                        }}
                                        loop={false}
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
                        </div>
                        <div className="relative lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Support every step of the way
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Stay on track with help from our dedicated course curator.
                                        From answering your questions to providing valuable
                                        feedback, we're here to make your learning journey smooth
                                        and successful.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                                    <Lottie
                                        lottieRef={supportA}
                                        animationData={supportAnimation}
                                        onComplete={() => supportA.current.pause()}
                                        loop={false}
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
