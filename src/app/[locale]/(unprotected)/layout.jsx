import Footer from "@/components/content/footer";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const UnprotectedLayout = ({ children, params: { locale } }) => {
    return (
        <>
            {/* <Banner textColor={"text-[#DC770A]"} bgColor={"bg-[#FFFFD0]"} /> */}
            {/* <div className="sticky top-0 z-50"> */}
            <div className="sticky top-0 z-40 transform" style={{ transform: "translate3d(0,0,999px)" }}>
                <NavBar locale={locale} />
            </div>
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default UnprotectedLayout;
