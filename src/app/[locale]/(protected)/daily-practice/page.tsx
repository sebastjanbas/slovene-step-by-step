import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Link} from "@/i18n/routing";


const DailyPracticePage = () => {
  return (
  <div className="flex flex-col p-6 min-h-[calc(100vh-var(--header-height))]">
    {/* Main Content - Two Column Layout */}
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side - Booking Card */}
        <div className="w-full">
          <div className="bg-white p-6 dark:bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
            {/* Image Section */}
            <div
              className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-500 via-purple-400 to-blue-500 rounded-3xl">
              {/* Background Image */}
              <Image
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern workspace with laptop and learning materials"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay for depth and color blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-purple-900/30 to-transparent"/>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"/>

              {/* Coming Soon Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white text-gray-900 border-0 shadow-sm font-medium px-3 py-1">
                  Coming Soon
                </Badge>
              </div>
            </div>

            {/* Booking Details */}
            <div className="h-20 w-full bg-background"/>
          </div>
        </div>

        {/* Right Side - Status Information */}
        <div className="w-full flex flex-col justify-center space-y-6 lg:pt-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Course management is coming soon
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              We&apos;re working hard to build a comprehensive course
              management system. Once ready, you&apos;ll be able to create,
              organize, and manage all your courses in one place. We&apos;ll
              notify you as soon as it&apos;s available.
            </p>
          </div>

          <div>
            <Button
              size="lg"
              asChild
            >
              <Link href={"/dashboard"}>
                Got it
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

);
};

export default DailyPracticePage;
