"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./carousel.css";

const Carousel = ({ title, data, stars = false }) => {
    return (
        <section className="w-full lg:max-w-[800px] flex flex-col justify-center box-border mx-auto py-24 sm:py-32">
            {title && <div className="text-center mb-8 lg:mb-16">
                <h2 className="text-base/7 font-semibold text-custom-accent-l dark:text-custom-accent-d">
                    What members are saying.
                </h2>
                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-custom-light-1 dark:text-custom-dark-1 sm:text-5xl">
                    Testimonials
                </h1>
            </div>}

            <div className="relative select-none lg:px-4">
                <blockquote>
                    <img
                        className="hidden absolute -z-1 top-1 -left-2 md:block"
                        src={"/blockquote.svg"}
                        alt="quote sign"
                    />
                    <img
                        className="hidden absolute -z-1 -bottom-3 -right-2 rotate-180 md:block"
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
                    {data.map((review) => (
                        <SplideSlide className="bg-transparent px-2 md:px-4" key={review.id}>
                            <div className="flex md:flex-row flex-col items-center justify-center md:justify-between bg-white shadow-lg dark:bg-[#121212] dark:border-[1px] dark:border-gray-700 px-4 py-10 lg:px-10 rounded-3xl gap-8">
                                <img
                                    className="size-36 mb-4 object-cover rounded-full"
                                    src={review.image}
                                    alt="Profile photo"
                                />
                                <div className="inline-block text-center md:text-left mb-4 text-lg">
                                    <p className="text-sm text-custom-light-3 dark:text-custom-dark-1">{review.text}</p>
                                    <div className="flex flex-col md:flex-row justify-start md:gap-8 pt-4">
                                        <div>
                                            <p className="text-xl font-bold text-custom-light-1 dark:text-custom-dark-1">{review.name}</p>
                                            <p className="text-sm font-normal text-custom-accent-l dark:text-custom-accent-d">{review.role}</p>
                                        </div>
                                        {stars &&
                                            <div className="text-sm/8 text-[rgb(254,216,79)]">
                                                {review.stars.map((star, index) =>
                                                    star ? (
                                                        <span key={index} className="p-[2px]" >&#9733;</span>
                                                    ) : (
                                                        <span key={index} className="p-[2px]" >&#9734;</span>
                                                    )
                                                )}
                                            </div>
                                        }
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

export default Carousel;
