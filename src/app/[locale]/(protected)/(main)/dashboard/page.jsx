import { TriangleAlert } from "lucide-react";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <div className="text-orange-400 text-xl w-full bg-amber-100 italic py-5 text-center">
        <p className="inline-flex gap-2 items-center">
          <TriangleAlert /> Currently in development
        </p>
      </div>
      <h1 className="w-full mt-10 font-bol font-light tracking-tighter text-center text-5xl md:text-6xl xl:text-7xl ">Dashboard</h1>
      <div className="w-full flex flex-col md:flex-row  justify-center mt-10 gap-20 items-center p-5">
        <div className="h-60 w-60 border-gray-500/50 border-[1px] flex justify-center items-center rounded-3xl">
          STATS
        </div>
        <div className="h-60 w-60 border-gray-500/50 border-[1px] flex justify-center items-center rounded-3xl">
          STATS
        </div>
        <div className="h-60 w-60 border-gray-500/50 border-[1px] flex justify-center items-center rounded-3xl">
          STATS
        </div>
      </div>
      <div className="mt-10 p-5">
        More statistics
      </div>
    </>
  );
};

export default DashboardPage;
