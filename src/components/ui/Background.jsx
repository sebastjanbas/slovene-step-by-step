"use client";

export const Background = () => {
    return (
        <div className="absolute flex justify-around w-full h-full z-0 pt-10">
            <div className="grid grid-cols-3 grid-rows-20 gap-y-4 w-full gap-x-5 " >
                <div className="transition-transform ease-in-out duration-500 hover:-translate-y-10 hover:scale-105 justify-self-center rounded-xl h-80 w-56 col-span-1 row-span-3 shadow-gray-500 shadow-lg dark:shadow-none">
                    <img className="h-full w-full rounded-xl object-cover" src="https://images.pexels.com/photos/3312569/pexels-photo-3312569.jpeg?" alt="" />
                </div>
                <div className="justify-self-center h-56 w-80 col-span-1 row-span-2 bg-transparent"></div>
                <div className="transition-transform ease-in-out duration-500 hover:-translate-y-10 hover:scale-105 justify-self-center rounded-xl h-80 w-56  col-span-1 row-span-3 shadow-gray-500 shadow-lg dark:shadow-none">
                    <img className="h-full w-full rounded-xl object-cover" src="https://images.pexels.com/photos/3214968/pexels-photo-3214968.jpeg?" alt="" />
                </div>
                <div className="justify-self-center h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                <div className="transition-transform ease-in-out duration-500 hover:-translate-y-10 hover:scale-105 justify-self-center rounded-xl h-80 w-56 col-span-1 row-span-3 shadow-gray-500 shadow-lg dark:shadow-none ">
                    <img className="h-full w-full rounded-xl object-cover" src="https://images.pexels.com/photos/30206761/pexels-photo-30206761/free-photo-of-bled-castle-on-cliff-in-autumn-slovenia.jpeg?" alt="" />
                </div>
                <div className="justify-self-center h-24 w-10 col-span-1 row-span-1 bg-transparent"></div>
                <div className="transition-transform ease-in-out duration-500 hover:-translate-y-10 hover:scale-105 justify-self-center rounded-xl h-80 w-56 col-span-1 row-span-3 shadow-gray-500 shadow-lg dark:shadow-none ">
                    <img className="h-full w-full rounded-xl object-cover" src="https://images.pexels.com/photos/3389508/pexels-photo-3389508.jpeg?" alt="" />
                </div>
                <div className="transition-transform ease-in-out duration-500 hover:-translate-y-10 hover:scale-105 justify-self-center rounded-xl h-80 w-56 col-span-1 row-span-3 shadow-gray-500 shadow-lg dark:shadow-none ">
                    <img className="h-full w-full rounded-xl object-cover" src="https://images.pexels.com/photos/11487772/pexels-photo-11487772.jpeg?" alt="" />
                </div>
            </div>
        </div>
    )
}
