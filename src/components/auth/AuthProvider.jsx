"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const AuthContext = createContext({});
const supabase = createClient();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    const fetchSession = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user ?? null);
        const {data} = await supabase.from("users").select("admin")
        setAdmin(data ?? false)
        setLoading(false);
      } catch (error) {
        console.error("ERROR FETCHING SESSION:", error);
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const value = {
    user,
    admin: admin?.[0]?.admin,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
