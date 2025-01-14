import People from "@/components/about/HelperPage";
import Carousel from "@/components/content/testimonials";
import SectionTitle from "@/components/titles/SectionTitle";
import { people, reviews } from "@/lib/docs";
import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';

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
            <div className="py-32 sm:py-48 lg:py-56 px-5 lg:px-20">
                <div className="flex flex-col lg:flex-row mx-auto w-full justify-center items-center gap-3 lg:gap-10">
                    <div className="max-w-xl mb-10">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-7xl">
                            Discover Our Story
                        </h1>
                        <h2 className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                            Building Connections Through Language
                        </h2>
                        <p>
                            At Slovene Step by Step, we help individuals from all backgrounds master new languages and confidently embrace new cultures. Starting with Russian speakers in Slovenia, we’ve expanded to offer personalized lessons in Italian, Spanish, German, and more.

                        </p>
                        <br />
                        <p>
                            Join our community, sign up for a free trial lesson, and take the first step toward achieving your language goals today!
                        </p>

                    </div>
                    <div className="translate-y-24">
                        <div className="grid grid-cols-3 grid-rows-20 gap-5">
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-80 w-56  col-span-1 row-span-3 rounded-xl"><img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="About us" /></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>

                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>

                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl"><img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3277806/pexels-photo-3277806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="About us" /></div>
                            <div className="h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl"><img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="About us" /></div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl"><img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/7437493/pexels-photo-7437493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="About us" /></div>
                            <div className="h-80 w-56 col-span-1 row-span-3 rounded-xl"><img className="w-full h-full object-cover rounded-xl" src="https://images.pexels.com/photos/12903169/pexels-photo-12903169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="About us" /></div>



                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <SectionTitle header={"Why We Do What We Do"} paragraph={"Bridging Cultures, Empowering People"}>
                    <div className="text-start text-sm/6 space-y-10">
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
                </SectionTitle>
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-xl mb-10">
                            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                Meet our Team
                            </h2>
                            <p className="mt-6 text-lg/8 text-gray-600">
                                We're a dynamic group of individuals who are passionate about what
                                we do and dedicated to delivering the best results for our clients.
                            </p>
                        </div>
                    </div>
                </div>
                <SectionTitle paragraph={"The People Behind the Program"} header={"Passionate. Experienced. Dedicated."}>
                    <div className="text-start text-sm/6 space-y-10">
                        <p>
                            At Slovene Step by Step, our team is made up of passionate educators, experienced linguists, and dedicated support staff who share a common goal: helping our students succeed. Each member brings a unique set of skills and a deep commitment to creating a personalized, engaging learning experience.
                        </p>

                        <p>

                            Our tutors, many of whom are native speakers, take pride in guiding students through their language-learning journey, providing support every step of the way. Whether it’s mastering the basics or refining advanced skills, we’re here to inspire confidence, foster growth, and celebrate each milestone.
                        </p>
                        <p>
                            Together, we’re more than a team—we’re a community that believes in the power of language to connect, empower, and transform lives.
                        </p>
                    </div>
                </SectionTitle>
                <SectionTitle header={"Hear from Our Students"} paragraph={"Real Stories, Real Results"}>
                    <div className="text-start text-sm/6 space-y-10">
                        <p>
                            The true measure of our success lies in the voices of our students. Through personalized lessons and dedicated guidance, Slovene Step by Step has helped countless individuals achieve their language goals and thrive in their personal and professional lives.
                        </p>
                        <p>

                            From newcomers confidently navigating life in Slovenia to professionals expanding their career opportunities, our program has made a lasting impact. Students consistently highlight the supportive environment, the practical language skills they’ve gained, and how the lessons have boosted their confidence and integration into new communities.
                        </p>

                        <p>
                            These stories are a testament to the transformative power of language learning, and we’re proud to celebrate every success with our students.

                        </p>
                    </div>
                    <Carousel data={reviews} />
                </SectionTitle>
                <SectionTitle header={"Join Our Community"} paragraph={"Take the First Step Towards Your Goals"}>
                    <div className="text-start text-sm/6 space-y-10">
                        <p>
                            Ready to embark on a language-learning journey tailored just for you? Whether you’re looking to improve your skills, connect with a new culture, or gain confidence in your everyday interactions, Slovene Step by Step is here to guide you.

                        </p>
                        <p>
                            Sign up for a free trial lesson today and experience firsthand how personalized, engaging, and effective our program can be. Join our growing community of language learners and connect with expert tutors who are passionate about helping you succeed.

                        </p>
                        <p>
                            Want to learn more? Explore our Features page to discover how our unique approach can transform your language learning experience. Start your journey now and take the first step toward achieving your goals!

                        </p>


                    </div>
                </SectionTitle>
            </div >
            {/* <People people={people} /> */}
        </section >
    );
}
