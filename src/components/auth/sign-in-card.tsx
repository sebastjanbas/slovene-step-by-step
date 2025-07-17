"use client";

import { SignIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SigninCard = () => {
  const pathname = usePathname();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
  }, [pathname]);

  useEffect(() => {
    window.location.reload();
  }, [counter]);

  return (
    <SignIn
      appearance={{
        elements: {
          cardBox: {
            boxShadow: "none",
            borderRadius: 35,
            width: "450px",
          },
          card: {
            boxShadow: "none",
            borderRadius: 0,
          },
          footer: {
            display: "none",
          },
        },
      }}
    />
  );
};

export default SigninCard;
