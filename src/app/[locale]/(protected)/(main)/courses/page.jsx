import React from "react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/utils/supabase/server";
import { Course } from "@/components/courses/Course";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("products-title"),
    //   description: t("products-desc"),
  };
}

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("course").select("*");

  if (error) {
    redirect("/courses?error=Error trying to fetch course data");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-gray-300 bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Courses</span>
      </h1>
      <div className="flex flex-wrap gap-10 p-6">
        {data.map((course, i) => (
          <div key={i} className="w-[400px]">
            <Course
              image={course.thumbnail_url}
              title={course.title}
              description={course.description}
              href={`/courses/${course.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
