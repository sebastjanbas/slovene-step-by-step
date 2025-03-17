import React, from "react";
import { getTranslations } from "next-intl/server";
import { CourseList } from "./[id]/[video]/_components/course-list";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("products-title"),
    //   description: t("products-desc"),
  };
}

export default function CoursePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="w-full text-center text-5xl border-b-[1px] border-foreground/30 pb-5">
        Courses
      </h1>
      <div className="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-10 justify-center items-center p-10">
          <CourseList />
      </div>
    </div>
  );
}
