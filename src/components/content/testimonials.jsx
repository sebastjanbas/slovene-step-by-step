"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import '@splidejs/react-splide/css/sea-green';
import { reviews } from "@/lib/docs";

const Testimonials = () => {
    return (
        <section className="w-full lg:max-w-[800px] flex flex-col justify-center h-screen box-border mx-auto">
            <div className="text-center mb-8 lg:mb-16">
                <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-500">
                    What members are saying.
                </h2>
                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
                    Testimonials
                </h1>
            </div>

            <div className="relative select-none lg:px-4">
                <blockquote>
                    <img
                        className="absolute -z-1 top-1 -left-2 block"
                        src={"/blockquote.svg"}
                        alt="quote sign"
                    />
                    <img
                        className="absolute -z-1 -bottom-3 -right-2 rotate-180 block"
                        src={"/blockquote.svg"}
                        alt="quote sign"
                    />
                </blockquote>

                <Splide
                    options={{
                        perPage: 1,
                        autoplay: true,
                        speed: 1000,
                        rewind: true,
                        rewindByDrag: true,
                        type: "loop",
                    }}
                >
                    {reviews.map((review) => (
                        <SplideSlide className="bg-transparent px-2 lg:px-4" key={review.id}>
                            <div className="flex lg:flex-row flex-col justify-between bg-white shadow-lg dark:bg-black dark:lg:bg-[#121212] dark:border-[1px] dark:border-gray-700 p-10 rounded-3xl gap-8">
                                <img
                                    className="size-36 mb-4 object-cover rounded-full"
                                    src={review.image}
                                    alt=""
                                />
                                <div className="inline-block mb-4 text-lg">
                                    <p className="text-sm">{review.text}</p>
                                    <div className="info">
                                        <div className="text-sm/8 text-[rgb(254,216,79)]">
                                            {review.stars.map((star, index) =>
                                                star ? (
                                                    <span key={index}>&#9733;</span>
                                                ) : (
                                                    <span key={index}>&#9734;</span>
                                                )
                                            )}
                                        </div>
                                        <p className="text-xl font-bold ">{review.name}</p>
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
};

export default Testimonials;
