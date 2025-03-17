import Link from "next/link";
import React from "react";

export const Course = ({ image, title, description, href }) => {
    return (
        <section>
            <Link href={href}>
                <div className="flex flex-col items-center rounded-xl shadow-xl">
                    <img
                        className="rounded-t-xl h-[200px] w-[400px]"
                        src={image}
                        alt={title}
                    />
                    <div className="w-full px-6 py-3 flex justify-between">
                        <div>
                            <h1 className="text-2xl text-start font-bold">{title}</h1>
                            <p className="text-lg">{description}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
};