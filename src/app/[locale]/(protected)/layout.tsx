import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default ProtectedLayout;
