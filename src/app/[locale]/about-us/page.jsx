import People from "@/components/about/HelperPage";
import Carousel from "@/components/content/testimonials";
import Stats from "@/components/Stats";
import SectionTitle from "@/components/titles/SectionTitle";
import { Button } from "@/components/ui/button";

import { people, reviews } from "@/lib/docs";
import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';
import Link from "next/link";
import { AccordionCustom } from "@/components/ui/AccordionCustom";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("about-title"),
        description: t("about-desc"),
    };
}

export default function MeetTheTeamPage() {
    const t = useTranslations("About us");
    return (
        <section>
            <div className="relative py-32 md:py-48 lg:pt-5 lg:pb-20 px-5 lg:px-20">
                <div className="relative z-10 flex flex-col text-center lg:text-start lg:flex-row mx-auto w-full justify-center items-center gap-3 lg:gap-10">
                    <div className="max-w-xl mb-10">

                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-7xl">
                            Discover Our Story
                        </h1>
                        <h2 className="mt-8 text-pretty text-lg font-medium text-custom-light-2 dark:text-custom-dark-2 sm:text-xl/8">
                            Building Connections Through Language
                        </h2>
                        <div className="text-custom-light-3 dark:text-custom-dark-3">
                            <p>
                                At Slovene Step by Step, we help individuals from all backgrounds master new languages and confidently embrace new cultures. Our personalized approach, expert instructors, and supportive community create an engaging learning experience that empowers students to achieve their goals.

                            </p>
                            <br />
                            <p>
                                Join our community, sign up for a free trial lesson, and take the first step toward achieving your language goals today!
                            </p>
                        </div>

                    </div>
                    <div className="">
                        <div className="hidden lg:grid grid-cols-3 grid-rows-20 gap-y-4 gap-x-5">
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-80 w-56  col-span-1 row-span-3 rounded-xl shadow-gray-500 shadow-lg dark:shadow-none">
                                <a href="#">
                                    <img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/2472854/pexels-photo-2472854.jpeg?" alt="About us" />
                                </a>
                            </div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl shadow-gray-500 shadow-lg dark:shadow-none ">
                                <a href="#">
                                    <img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3312569/pexels-photo-3312569.jpeg?" alt="About us" />
                                </a>
                            </div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl shadow-gray-500 shadow-lg dark:shadow-none ">
                                <a href="#">
                                    <img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3389508/pexels-photo-3389508.jpeg?" alt="About us" />
                                </a>
                            </div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl shadow-gray-500 shadow-lg dark:shadow-none ">
                                <a href="#">
                                    <img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3214968/pexels-photo-3214968.jpeg?" alt="About us" />
                                </a>
                            </div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl shadow-gray-500 shadow-lg dark:shadow-none ">
                                <img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/30206761/pexels-photo-30206761/free-photo-of-bled-castle-on-cliff-in-autumn-slovenia.jpeg?" alt="About us" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl lg:px-8">
                <SectionTitle header={"Why We Do What We Do"} paragraph={"Bridging Cultures, Empowering People"} textOrientation="text-start">
                    <div className="flex w-full gap-10 flex-row justify-between">
                        <div className="text-start text-pretty text-md/6 space-y-10">
                            <p >
                                At Slovene Step by Step, our mission is to empower individuals from diverse backgrounds by providing personalized, engaging, and effective language learning experiences. We strive to bridge cultural gaps and foster connections by helping our students not only learn a language but also feel at home in their new environments. Through expert guidance, flexible learning options, and a supportive community, we aim to make language learning accessible and enjoyable for everyone.
                            </p>
                            <div className="space-y-5">
                                <p>
                                    We envision a world where language barriers no longer hinder opportunities or integration. What began as a platform to support Russian-speaking migrants navigating life in Slovenia has grown into a vibrant hub for learners from various linguistic and cultural backgrounds.
                                </p>
                                <p>
                                    Our goal is to become a leading language learning platform in Slovenia and beyond, helping individuals unlock their full potential through language mastery. We aspire to build a global community of learners, united by their passion for growth, connection, and cultural exchange.

                                </p>
                                <p>
                                    Through innovative teaching methods, dedicated instructors, and a commitment to excellence, Slovene Step by Step continues to pave the way for language learners worldwide.
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:block w-full">
                            <Stats vertical size={{ text: "text-3xl", space: "px-6 py-4", w: "w-[200px]" }} />
                        </div>
                    </div>
                </SectionTitle>
                <div className="mx-auto mt-20 lg:mt-40">
                    {/* <img className="aspect-video object-cover rounded-none lg:rounded-3xl" src="https://images.pexels.com/photos/25053927/pexels-photo-25053927/free-photo-of-a-river-runs-through-a-city-with-buildings-on-both-sides.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Transition photo" /> */}
                    <img className="object-cover rounded-none lg:rounded-3xl" src="https://images.pexels.com/photos/7919/pexels-photo.jpg" alt="Transition photo" />
                    <Button variant={"link"} asChild
                        className="text-xs/3 flex items-center justify-end text-gray-600">
                        <a target="_blank" href="https://www.pexels.com/photo/aerial-photography-of-cloudy-mountain-7919/">
                            Bled Slovenia: Pixels.com
                        </a>
                    </Button>
                </div>
                <SectionTitle paragraph={"The People Behind the Program"} header={"Passionate. Experienced. Dedicated."} textOrientation="text-center">
                    <div className="flex items-center justify-center">
                        <div className="max-w-5xl text-center">
                            <p className="text-lg ">
                                We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
                            </p>
                        </div>
                    </div>
                </SectionTitle>
                <div className="w-full mt-10">
                    <People people={people} />
                </div>
                <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="text-center lg:text-start text-md/6 space-y-10 flex flex-col items-center justify-center">
                        <AccordionCustom
                            data={[
                                {
                                    trigger: "Read More", content: [
                                        "At Slovene Step by Step, our team is made up of passionate educators, experienced linguists, and dedicated support staff who share a common goal: helping our students succeed. Each member brings a unique set of skills and a deep commitment to creating a personalized, engaging learning experience.",
                                        "Our tutors, many of whom are native speakers, take pride in guiding students through their language-learning journey, providing support every step of the way. Whether it’s mastering the basics or refining advanced skills, we’re here to inspire confidence, foster growth, and celebrate each milestone.",
                                        "Together, we’re more than a team—we’re a community that believes in the power of language to connect, empower, and transform lives."
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>

                <SectionTitle header={"Hear from Our Students"} paragraph={"Real Stories, Real Results"} textOrientation="text-center lg:text-start" />
                <div className="w-full flex justify-center items-center">
                    <div className="max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
                        <Carousel data={reviews} />
                    </div>
                </div>
                <div className="mx-auto mt-10 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="text-center lg:text-start text-md/6 space-y-10 flex flex-col items-center justify-center">
                        <AccordionCustom
                            data={[
                                {
                                    trigger: "Read More", content: [
                                        "The true measure of our success lies in the voices of our students. Through personalized lessons and dedicated guidance, Slovene Step by Step has helped countless individuals achieve their language goals and thrive in their personal and professional lives.",
                                        "From newcomers confidently navigating life in Slovenia to professionals expanding their career opportunities, our program has made a lasting impact. Students consistently highlight the supportive environment, the practical language skills they’ve gained, and how the lessons have boosted their confidence and integration into new communities.",
                                        "These stories are a testament to the transformative power of language learning, and we’re proud to celebrate every success with our students."
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>
                <SectionTitle header={"Join Our Community"} paragraph={"Take the First Step Towards Your Goals"} textOrientation="text-center lg:text-start">
                    <div className="text-center lg:text-start text-md/6 space-y-10">
                        <p>
                            Ready to start a language-learning journey tailored just for you? Whether you’re looking to improve your skills, connect with a new culture, or gain confidence in your everyday interactions, Slovene Step by Step is here to guide you.

                        </p>
                        <p>
                            Sign up for a free trial lesson today and experience firsthand how personalized, engaging, and effective our program can be. Join our growing community of language learners and connect with expert tutors who are passionate about helping you succeed.

                        </p>

                    </div>

                    <div className="flex flex-row mt-16 mb-52 gap-5 items-center justify-center lg:justify-start">
                        <Button variant={"mine"} asChild>
                            <Link href={"/dashboard"}>
                                Start Your Journey
                            </Link>
                        </Button>
                        <Button variant={"link"} asChild>
                            <Link href={"/pricing"}>
                                View Pricing
                            </Link>
                        </Button>
                    </div>
                </SectionTitle>
            </div >
        </section >
    );
}
