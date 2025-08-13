"use client";

import { removeRole, setRole } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { IconUserCog } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const UserCard = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  let color;
  switch (user.role) {
    case "admin":
      color = "text-red-600 dark:text-red-400";
      break;
    case "moderator":
      color = "text-blue-600 dark:text-blue-400";
      break;
    default:
      color = "text-gray-500";
  }

  const handleSetRole = async (formData: FormData) => {
    const res = await setRole(formData);
    if (res.success) {
      router.push(
        `${pathname}?method=setRole&success=true&id=${formData.get(
          "id"
        )}&role=${formData.get("role")}`
      );
    } else {
      toast.error(`Failed to make ${formData.get("role")}`);
    }
  };

  const handleRemoveRole = async (formData: FormData) => {
    const res = await removeRole(formData);
    if (res.success) {
      router.push(
        `${pathname}?method=removeRole&success=true&id=${formData.get("id")}`
      );
    } else {
      toast.error(`Failed to remove role`);
    }
  };

  return (
    <div
      key={user.id}
      className="flex flex-row gap-auto border border-gray-200 rounded-xl px-6 py-3 items-center justify-between h-20"
    >
      <div className="columns-2 h-full w-full">
        <div className="flex flex-col gap-0">
          <div className="text-lg font-bold">
            {user.firstName} {user.lastName}
          </div>

          <div className="text-sm text-gray-500">{user.email}</div>
        </div>

        <span className="inline-flex gap-2 items-center text-sm pt-1 font-semibold capitalize">
          <IconUserCog className={color} size={20} />
          {user.role ? user.role : "user"}
        </span>
      </div>
      <div className="flex flex-row gap-2 ml-auto h-full items-center">
        <form action={handleSetRole}>
          <input type="hidden" value={user.id} name="id" />
          <input type="hidden" value="admin" name="role" />
          <Button variant="outline" type="submit">
            Make Admin
          </Button>
        </form>

        <form action={handleSetRole}>
          <input type="hidden" value={user.id} name="id" />
          <input type="hidden" value="moderator" name="role" />
          <Button variant="outline" type="submit">
            Make Moderator
          </Button>
        </form>

        <form action={handleRemoveRole}>
          <input type="hidden" value={user.id} name="id" />
          <Button variant="destructive" type="submit">
            Remove Role
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserCard;
