"use client"
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";


const CoursePage = () => {
  const t = useTranslations("courses")
  const t2 = useTranslations("common.badges")
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
              className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              {/* Background Image */}
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Modern workspace with laptop and learning materials"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay for depth and color blend */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"/>

              {/* Coming Soon Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white text-gray-900 border-0 shadow-sm font-semibold tracking-tight px-3 py-1">
                  {t2("coming-soon")}
                </Badge>
              </div>
            </div>

            {/* Booking Details */}
            <div className="h-20 w-full bg-transparent"/>
          </div>
        </div>

        {/* Right Side - Course Information */}
        <div className="w-full flex flex-col justify-center space-y-6 pt-10">
          <div className="space-y-4">
            <Badge variant={"outline"} className={"bg-gradient-to-r from-sl-purple to-sl-pink text-white uppercase font-black tracking-wide"}>
              {t2("coming-soon")}
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tighter text-foreground">
              {t("title")}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          <div>
            <Button
              variant={"outline"}
              disabled
            >
              {t2("join-waitlist")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CoursePage;
