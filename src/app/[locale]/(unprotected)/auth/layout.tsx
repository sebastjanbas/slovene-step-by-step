import { BackArrowButton } from "@/components/auth/back-arrow-button";
import { Disclaimer } from "@/components/auth/disclaimer";
import { SplitScreen } from "@/components/auth/split-screen";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-0 h-screen w-screen flex md:flex-row-reverse flex-col">
      <SplitScreen></SplitScreen>
      <div className="h-full flex flex-col w-full">
        <div className="flex items-center py-4 px-8">
          <BackArrowButton />
        </div>
        <div className="h-full w-full">
          {children}
          <Disclaimer />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
