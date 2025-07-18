import Footer from "@/components/content/footer";
import NavBar from "@/components/navbar/navbar";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UnprotectedLayout = async ({ children, params }) => {
  const { locale } = await params;

  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <>
      {/* <Banner textColor={"text-[#DC770A]"} bgColor={"bg-[#FFFFD0]"} /> */}
      <div className="sticky top-0 z-50">
        <NavBar locale={locale} />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default UnprotectedLayout;
