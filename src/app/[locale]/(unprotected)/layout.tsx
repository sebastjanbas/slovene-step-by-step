import Footer from "@/components/content/footer";
import NavBar from "@/components/content/navbar/navbar";
import AnimatedLayout from "@/components/ui/animated-layout";
import React from "react";

const UnprotectedLayout = ({ children, params }) => {
  const { locale } = params;

  return (
    <>
      <AnimatedLayout>
        {/* <Banner textColor={"text-[#DC770A]"} bgColor={"bg-[#FFFFD0]"} /> */}
        <div className="sticky top-0 z-50">
          <NavBar locale={locale} />
        </div>
        <main>{children}</main>
        <Footer />
      </AnimatedLayout>
    </>
  );
};

export default UnprotectedLayout;
