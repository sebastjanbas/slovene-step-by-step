"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import timerAnimation from "@/animations/timer-animation.json";
import { useTranslations } from "next-intl";

// Usage for date:
//  <Countdown border={false} date={"2025-01-01T15:01:12Z"} />
// T15:01:12Z -> 15 hours 01 minutes 12 seconds

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Countdown = ({ date = "2026-01-01", border = false }) => {
    const [isTimeUp, setIsTimeUp] = useState(false);
    const t = useTranslations("Countdown");

    return (
        <div className="py-2 my-5">
            <div
                className={
                    border
                        ? "inline-flex items-center space-x-0 md:space-x-2 border-b-[1px] border-indigo-400"
                        : "inline-flex items-center space-x-0 md:space-x-2"
                }
            >
                {!isTimeUp ? (
                    <>
                        <CountdownItem
                            unit="Day"
                            text={t("days")}
                            date={date}
                            setTimeUp={setIsTimeUp}
                        />
                        <CountdownItem
                            unit="Hour"
                            text={t("hours")}
                            date={date}
                            setTimeUp={setIsTimeUp}
                        />
                        <CountdownItem
                            unit="Minute"
                            text={t("minutes")}
                            date={date}
                            setTimeUp={setIsTimeUp}
                        />
                        <CountdownItem
                            unit="Second"
                            text={t("seconds")}
                            date={date}
                            setTimeUp={setIsTimeUp}
                        />
                    </>
                ) : (
                    <div className="flex pr-2 items-center justify-center gap-1 font-mono md:gap-2">
                        <Lottie
                            animationData={timerAnimation}
                            className="size-10 m-0 p-0"
                        />
                        <div className="relative overflow-hidden text-center">
                            <span className="block text-sm font-bold text-indigo-400 dark:text-indigo-300 sm:text-md lg:text-lg">
                                {t("times-up")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CountdownItem = ({ unit, text, date, setTimeUp }) => {
    const { ref, time } = useTimer(unit, date, setTimeUp);

    return (
        <div className="flex px-2 items-center justify-center gap-1 font-mono md:gap-2">
            <div className="relative overflow-hidden text-center">
                <span
                    ref={ref}
                    className="block text-xs/6 font-bold text-indigo-400 dark:text-indigo-300 sm:text-lg/8 lg:text-lg/loose"
                >
                    {time}
                </span>
            </div>
            <span className="text-xs font-bold text-indigo-400 dark:text-indigo-300 md:text-sm lg:text-base">
                {text}
            </span>
        </div>
    );
};

export default Countdown;

const useTimer = (unit, date, setTimeUp) => {
    const [ref, animate] = useAnimate();

    const intervalRef = useRef(null);
    const timeRef = useRef(0);

    const [time, setTime] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => handleCountdown(date), 1000);

        return () => clearInterval(intervalRef.current);
    }, [date]);

    const handleCountdown = async (countdownDate) => {
        const end = new Date(countdownDate);
        const now = new Date();
        const distance = +end - +now;

        // Stop timer if the target date is reached
        if (distance <= 0) {
            clearInterval(intervalRef.current);
            setTime(0);
            setTimeUp(true);
            return;
        }

        let newTime = 0;

        if (unit === "Day") {
            newTime = Math.floor(distance / DAY);
        } else if (unit === "Hour") {
            newTime = Math.floor((distance % DAY) / HOUR);
        } else if (unit === "Minute") {
            newTime = Math.floor((distance % HOUR) / MINUTE);
        } else {
            newTime = Math.floor((distance % MINUTE) / SECOND);
        }

        if (newTime !== timeRef.current && ref.current) {
            // Ensure `ref.current` exists before applying animations
            try {
                // Exit animation
                await animate(
                    ref.current,
                    { y: ["0%", "-50%"], opacity: [1, 0] },
                    { duration: 0.35 }
                );

                timeRef.current = newTime;
                setTime(newTime);

                // Enter animation
                await animate(
                    ref.current,
                    { y: ["50%", "0%"], opacity: [0, 1] },
                    { duration: 0.35 }
                );
            } catch (error) {
                console.warn("Animation error:", error);
            }
        }
    };

    return { ref, time };
};
