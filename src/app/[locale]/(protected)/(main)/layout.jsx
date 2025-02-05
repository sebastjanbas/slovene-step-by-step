import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-none sm:rounded-l-3xl border-gray-300/80 dark:border-white/20 overflow-scroll">
            {children}
        </div>
    );
};

export default Layout;
