import { createClient } from "@/utils/supabase/server";
import React from "react";
import CourseEdit from "./_components/course-edit";
import { redirect } from "next/navigation";
import CourseUpload from "./_components/course_upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ManagementPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("course").select("*");

  if (error) {
    redirect("/management?error=Something went wrong!");
  }

  return (
    <>
      <div className="w-full h-[90vh] mb-10">
        <h1 className="w-full text-center text-5xl ">Management</h1>
        <div className="w-full h-fit mt-10 px-10 justify-center items-center">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="account">Courses</TabsTrigger>
              <TabsTrigger value="password">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader className="flex flex-row justify-between items-start p-1">
                  <div>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>Manage your corses</CardDescription>
                  </div>
                  <CourseUpload />
                </CardHeader>
                <CardContent className="space-y-2 p-1">
                  {data
                    ?.sort((a, b) => a.order - b.order)
                    .map((course, i) => (
                      <div key={i} className="w-full">
                        <CourseEdit
                          id={course.id}
                          title={course.title}
                          desc={course.description}
                          image={course.thumbnail_url}
                          date={course.created_at}
                          order={course.order}
                        />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
