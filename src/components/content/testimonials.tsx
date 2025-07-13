"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./carousel.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Carousel = ({ data, stars = false }) => {
  const t = useTranslations("Testimonials");
  return (
    <>
      <div className="relative select-none lg:px-4">
        <blockquote>
          <img
            className="hidden absolute -z-1 top-1 -left-2 lg:block"
            src={"/blockquote.svg"}
            alt="quote sign"
          />
          <img
            className="hidden absolute -z-1 -bottom-3 -right-2 rotate-180 lg:block"
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
            <SplideSlide
              className="bg-transparent p-10 px-2 md:px-4"
              key={review.id}
            >
              <div className="flex md:flex-row flex-col items-center justify-center md:justify-between bg-white shadow-lg dark:bg-[#121212] dark:border-[1px] dark:border-gray-700 px-4 py-10 lg:px-10 rounded-3xl gap-8">
                <Image
                  height={150}
                  width={150}
                  className="size-36 mb-4 object-cover rounded-full"
                  src={review.image}
                  alt="Profile photo"
                />
                <div className="inline-block text-center md:text-left mb-4 text-lg">
                  <p className="text-sm text-light-3 dark:text-dark-1">
                    {t(review.text)}
                  </p>
                  <div className="flex flex-col md:flex-row justify-start md:gap-8 pt-4">
                    <div>
                      <p className="text-xl font-bold text-light-1 dark:text-dark-1">
                        {review.name}
                      </p>
                      <p className="text-sm font-normal text-accent dark:text-accent-foreground">
                        {t(review.role)}
                      </p>
                    </div>
                    {stars && (
                      <div className="text-sm/8 text-[rgb(254,216,79)]">
                        {review.stars.map((star, index) =>
                          star ? (
                            <span key={index} className="p-[2px]">
                              &#9733;
                            </span>
                          ) : (
                            <span key={index} className="p-[2px]">
                              &#9734;
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default Carousel;
