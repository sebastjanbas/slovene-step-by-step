import CourseEdit from "./_components/course-edit";
import CourseUpload from "./_components/course_upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VideoUpload from "./_components/VideoUpload";
import VideoEdit from "./_components/video-edit";

const ManagementPage = async () => {
  return (
    <>
      <div className="w-full h-[90vh] my-10">
        <h1 className="w-fit flex self-center justify-self-center text-center text-5xl md:text-6xl xl:text-7xl tracking-tighter font-light">Control Pannel</h1>
        <div className="w-full h-fit mt-10 px-10 justify-center items-center">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="courses">
              <Card>
                <CardHeader className="flex flex-row justify-between items-start p-1">
                  <div>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>Manage your corses</CardDescription>
                  </div>
                  <CourseUpload />
                </CardHeader>
                <CardContent className="space-y-2 p-1">
                  {data.map((course, i) => (
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
            <TabsContent value="videos">
              <Card>
                <CardHeader className="flex flex-row justify-between items-start p-1">
                  <div>
                    <CardTitle>Videos</CardTitle>
                    <CardDescription>Manage your videos</CardDescription>
                  </div>
                  <VideoUpload data={data} />
                </CardHeader>
                <CardContent className="space-y-2 p-1 gap-5">
                  {data.map((course, i) => (
                    <div
                      key={i}
                      className="w-full py-3 md:py-2 px-3 md:px-10 rounded-lg border-[1px] border-foreground/50"
                    >
                      <h1 className="text-xl font-semibold tracking-wide pb-3">
                        {course.title}
                      </h1>
                      <div className="flex flex-col gap-5">
                        {course?.["video-lesson"]
                          ?.sort((a, b) => a.order - b.order)
                          .map((video, i) => (
                            <div key={i}>
                              <VideoEdit
                                data={data}
                                id={video.id}
                                title={video.title}
                                courseId={video.course_id}
                                desc={video.description}
                                order={video.order}
                                duration={video.duration}
                                date={video.created_at}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
