import { checkRole } from "@/utils/roles";
import ManageUsers from "./_components/manage-users";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  IconCalendarWeek,
  IconSettings,
  IconExternalLink,
  IconUsers,
  IconHelp,
  IconProgressCheck,
} from "@tabler/icons-react";

export default async function AdminDashboard() {
  const isAdmin = await checkRole("admin");

  if (isAdmin) {
    return (
      <div className="flex flex-col gap-4 w-full justify-center items-center mt-20 p-5">
        <h1 className="text-2xl font-bold text-center">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-base text-gray-500 text-center">
          Here you can manage users, roles, and permissions.
        </p>
        <div className="w-full mt-10 md:mt-20">
          <h2 className="text-xl font-bold text-center">Manage Users</h2>
          <ManageUsers />
        </div>
        <div className="w-full flex flex-col gap-4 mt-10 md:mt-20 ">
          <h2 className="text-xl font-bold text-center">
            Quick Access for Admins
          </h2>
          <AdminManagementCards />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center mt-20 p-5">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Moderator Dashboard
      </h1>
      <p className="text-base text-gray-500 text-center">
        Here you can create and manage content. Upload courses, create lessons,
        and dates for language club.
      </p>
      <div className="w-full flex flex-col gap-4 mt-10 md:mt-20 ">
        <h2 className="text-xl font-bold text-center">
          Quick Access for Moderators
        </h2>
        <AdminManagementCards />
      </div>
    </div>
  );
}

const ComingSoonOverlay = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 dark:bg-white/5 z-10" />
      <div
        className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center pointer-events-none"
        style={{
          background: `
                  repeating-linear-gradient(
                    135deg,
                    rgba(0,0,0,0.2) 0px,
                    rgba(0,0,0,0.2) 20px,
                    transparent 20px,
                    transparent 40px
                  )
                `,
        }}
      >
        <h1
          className="text-white/70 text-4xl font-bold text-center select-none"
          style={{
            transform: "rotate(-10deg)",
            textShadow: "0 2px 8x rgba(0,0,0,0.5)",
          }}
        >
          Coming Soon
        </h1>
      </div>
    </>
  );
};

const AdminManagementCards = () => {
  return (
    <div className="flex w-full max-w-6xl flex-col-reverse xl:flex-row gap-6 justify-center items-stretch mx-auto">
      <Card
        className="w-full rounded-2xl shadow-xl relative overflow-hidden"
        aria-disabled={true}
        aria-label="Courses"
      >
        {/* Coming Soon overlay - for disabled cards where content is not available yet */}
        <ComingSoonOverlay />
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>Manage courses</CardDescription>
          <CardAction>
            <Button variant="outline" disabled>
              <a href="#" className="inline-flex items-center gap-2">
                Manage Courses <IconExternalLink />
              </a>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Course Management
            </h3>
            <ul className="text-muted-foreground text-base list-inside space-y-1">
              <li className="flex items-start gap-2">
                <IconSettings className="mt-0.5 size-5 text-primary" />
                Upload new courses and edit existing course details
              </li>
              <li className="flex items-start gap-2">
                <IconCalendarWeek className="mt-0.5 size-5 text-primary" />
                Set course start and end dates, and manage course status
              </li>
              <li className="flex items-start gap-2">
                <IconUsers className="mt-0.5 size-5 text-primary" />
                Assign instructors and manage enrolled students
              </li>
              <li className="flex items-start gap-2">
                <IconHelp className="mt-0.5 size-5 text-primary" />
                Add course resources and supporting materials
              </li>
              <li className="flex items-start gap-2">
                <IconProgressCheck className="mt-0.5 size-5 text-primary" />
                Track course progress and gather feedback
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card
        className="w-full rounded-2xl shadow-xl relative overflow-hidden"
        aria-disabled={true}
        aria-label="Lessons"
      >
        {/* Coming Soon overlay - for disabled cards where content is not available yet */}
        <ComingSoonOverlay />
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
          <CardDescription>Manage lessons</CardDescription>
          <CardAction>
            <Button variant="outline" disabled>
              <a href="#" className="inline-flex items-center gap-2">
                Manage Lessons <IconExternalLink />
              </a>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Lesson Management
            </h3>
            <ul className="text-muted-foreground text-base list-inside space-y-1">
              <li className="flex items-start gap-2">
                <IconSettings className="mt-0.5 size-5 text-primary" />
                Create new lessons and organize them by topic
              </li>
              <li className="flex items-start gap-2">
                <IconCalendarWeek className="mt-0.5 size-5 text-primary" />
                Schedule lesson release dates and times
              </li>
              <li className="flex items-start gap-2">
                <IconUsers className="mt-0.5 size-5 text-primary" />
                Assign lessons to specific groups or classes
              </li>
              <li className="flex items-start gap-2">
                <IconHelp className="mt-0.5 size-5 text-primary" />
                Add supporting materials and resources for each lesson
              </li>
              <li className="flex items-start gap-2">
                <IconProgressCheck className="mt-0.5 size-5 text-primary" />
                Track lesson completion and gather student feedback
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full rounded-2xl shadow-xl" aria-label="Language Club">
        <CardHeader>
          <CardTitle>Language Club</CardTitle>
          <CardDescription>Manage language club</CardDescription>
          <CardAction>
            <Button variant="outline" asChild>
              <Link
                href="/admin/language-club-admin"
                className="inline-flex items-center gap-2"
              >
                Language Club <IconExternalLink />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Language Club Management
            </h3>
            <ul className="text-muted-foreground text-base list-inside space-y-1">
              <li className="flex items-start gap-2">
                <IconSettings className="mt-0.5 size-5 text-primary" />
                Edit club details and update event information
              </li>
              <li className="flex items-start gap-2">
                <IconCalendarWeek className="mt-0.5 size-5 text-primary" />
                Manage event dates and scheduling for language club activities
              </li>
              <li className="flex items-start gap-2">
                <IconUsers className="mt-0.5 size-5 text-primary" />
                View and manage the list of registered club members
              </li>
              <li className="flex items-start gap-2">
                <IconHelp className="mt-0.5 size-5 text-primary" />
                Send announcements or notifications to club members
              </li>
              <li className="flex items-start gap-2">
                <IconProgressCheck className="mt-0.5 size-5 text-primary" />
                Monitor club activity logs and generate reports
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
