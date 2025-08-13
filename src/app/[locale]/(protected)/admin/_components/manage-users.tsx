"use client";

import { getUsers } from "@/actions/admin-actions";
import { useEffect, useState } from "react";
import { SearchUsers } from "./search-users";
import UserCard from "./user-card";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Users {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: unknown;
  }[];
}

const ManageUsers = () => {
  const [users, setUsers] = useState<Users["users"]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const search = searchParams.get("search");
    const success = searchParams.get("success");
    const method = searchParams.get("method");
    if (success) {
      if (method === "setRole") {
        toast.success("Role updated successfully");
      } else if (method === "removeRole") {
        toast.success("Role removed successfully");
      }
    }
    if (search) {
      getUsers(search).then((users) => {
        setUsers(users.users);
        setLoading(false);
      });
    } else {
      setLoading(true);
      getUsers(null).then((users) => {
        setUsers(users.users);
        setLoading(false);
      });
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto mt-4">
        <div className="w-full max-w-xl mx-auto">
          <SearchUsers />
        </div>
        <div className="flex flex-col gap-4 mt-4 w-full max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : users.length > 0 ? (
            users.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
