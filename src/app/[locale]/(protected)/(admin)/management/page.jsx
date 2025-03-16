import { AreaChart1 } from "@/components/dashboard/area-chart";
import FileInput from "@/components/dashboard/file-input";
import { RadialChart1 } from "@/components/dashboard/radial-chart";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import CourseEdit from "./_components/course-edit";
import { redirect } from "next/navigation";

const ManagementPage = async () => {
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

  const supabase = await createClient();
  const { data, error } = await supabase.from("course").select("*");

  if (error) {
    redirect("/management?error=Something went wrong!");
  }

  /* DATA:  [
  {
    id: '65829d35-97a9-48d8-9146-274c7bdd7a31',
    created_at: '2025-03-14T18:33:12.231155+00:00',
    title: 'Testing',
    description: 'Testing description',
    thumbnail_url: 'https://ucarecdn.com/3bd719f4-149a-4902-8fcd-4375af1025a8/-/preview/1000x562/'
  },
  {
    id: '259e81d3-4aa1-49fd-9e0f-aceea62e7bdc',
    created_at: '2025-03-14T18:45:07.016081+00:00',
    title: 'My title',
    description: 'My description',
    thumbnail_url: 'https://ucarecdn.com/e820d5fd-0f9d-460f-a351-114b54ad1254/-/preview/1000x708/'
  } */

  return (
    <>
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
      <div className="w-full h-[1000px] bg-[#232323]">
        <h1 className="text-5xl text-center w-full py-10">Course Pannel</h1>
        <div className="flex flex-col gap-5">
          {data?.map((course, i) => (
            <div key={i} className="w-full max-w-5xl">
              <CourseEdit
                id={course.id}
                title={course.title}
                desc={course.description}
                image={course.thumbnail_url}
                date={course.created_at}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
