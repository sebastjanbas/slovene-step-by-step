import { AreaChart1 } from "@/components/dashboard/area-chart";
import FileInput from "@/components/dashboard/file-input";
import { RadialChart1 } from "@/components/dashboard/radial-chart";
import React from "react";

const ManagementPage = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const secondChart = [
    { month: "January", desktop: 83, mobile: 429 },
    { month: "February", desktop: 291, mobile: 120 },
    { month: "March", desktop: 512, mobile: 820 },
    { month: "April", desktop: 175, mobile: 65 },
    { month: "May", desktop: 23, mobile: 400 },
    { month: "June", desktop: 782, mobile: 999 },
  ];

  const value = 69;
  const total = 100;

  const radialData = {
    value: value,
    total: total,
    list: [
      {
        desc: `out of ${total.toLocaleString()}`,
        visitors: value,
        fill: "var(--color-safari)",
      },
    ],
  };

  return (
    <div className="w-full h-[90vh]">
      <h1 className="w-full text-center text-5xl ">Management</h1>
      <div className="w-full h-full flex flex-col justify-start p-10 items-center">
        <div className="w-full h-fit flex flex-col  md:flex-row justify-between items-center">
          <div className="w-full">
            <AreaChart1
              title={"My chart"}
              description={"description"}
              data={chartData}
            />
          </div>
          <div className="w-full">
            <RadialChart1
              title={"My chart"}
              description="description"
              data={(radialData.value / radialData.total) * 100}
              info={radialData.list}
            />
          </div>
          <div className="w-full">
            <AreaChart1
              title={"My chart"}
              description={"description"}
              data={secondChart}
            />
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl text-center">Add video courses</h1>
          <div className="p-10">
            <FileInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
