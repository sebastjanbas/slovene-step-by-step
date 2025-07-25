"use client";

import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserInfo {
  avatar: string;
  name: string;
  email: string;
}

const UserContext = createContext<UserInfo | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setUserInfo({
        avatar: user.imageUrl,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
    }
  }, [isLoaded, user]);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserContext);
