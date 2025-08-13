"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-2 w-full max-w-4xl">
      <form
        className="flex flex-row gap-2 w-full max-w-4xl items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <Input
          id="search"
          className="w-full min-w-56 h-10 rounded-xl"
          name="search"
          type="text"
          placeholder="Search"
        />
        <Button type="submit" className="w-fit h-10 rounded-xl">
          <IconSearch className="size-4" /> Search
        </Button>
      </form>
    </div>
  );
};
