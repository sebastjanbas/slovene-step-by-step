import Footer from "@/components/content/footer";
import NavBar from "@/components/content/navbar/navbar";
import AnimatedLayout from "@/components/ui/animated-layout";
import React from "react";

const UnprotectedLayout = ({ children, params }) => {
  const { locale } = params;

  return (
    <>
      <AnimatedLayout>
          <NavBar locale={locale} />
        <main>{children}</main>
        <Footer />
      </AnimatedLayout>
    </>
  );
};

export default UnprotectedLayout;
