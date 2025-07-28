import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const TutorsPage = () => {
  return (
    <main className="h-[90vh] w-full pt-8 px-8">
      <h1 className="text-4xl pb-8 tracking-tight">Please select your Tutor</h1>

      <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-5">
        <Card className="pt-0 overflow-hidden rounded-3xl max-w-xl">
          <div className="w-full overflow-hidden h-auto aspect-video">
            <Image
              className="object-cover w-full h-auto -translate-y-22"
              width={1920}
              height={1080}
              alt="Test"
              src={"/foto-oleksandr3.jpg"}
            />
          </div>
          <CardHeader>
            <CardTitle>Oleksandr Tyutyunnyk</CardTitle>
            <CardDescription>Tutor</CardDescription>
            <CardAction>
              <Button variant="ghost" size="lg" className="cursor-pointer">
                <IconCircleDashedCheck />
                Select
              </Button>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="pt-0 overflow-hidden rounded-3xl max-w-xl">
          <div className="w-full overflow-hidden h-auto aspect-video">
            <Image
              className="object-cover w-full h-auto -translate-y-16"
              width={1920}
              height={1080}
              alt="Test"
              src={"/foto-manca.png"}
            />
          </div>
          <CardHeader>
            <CardTitle>Manca Levašič</CardTitle>
            <CardDescription>Tutor</CardDescription>
            <CardAction>
              <Button variant="ghost" size="lg" className="cursor-pointer">
                <IconCircleDashedCheck />
                Select
              </Button>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="pt-0 overflow-hidden rounded-3xl max-w-xl">
          <div className="w-full overflow-hidden h-auto aspect-video bg-[#D5CBC4]">
            <Image
              className="object-contain w-full h-auto aspect-video"
              width={1920}
              height={1080}
              alt="Test"
              src={"/foto-ela.jpg"}
            />
          </div>
          <CardHeader>
            <CardTitle>Ela Remic</CardTitle>
            <CardDescription>Tutor</CardDescription>
            <CardAction>
              <Button variant="ghost" size="lg" className="cursor-pointer">
                <IconCircleDashedCheck />
                Select
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
};

export default TutorsPage;
