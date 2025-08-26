import { db } from "@/db";
import { langClubTable } from "@/db/schema";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const LanguageClubAdmin = async () => {
  const events = await db.select().from(langClubTable);
  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center mt-20 p-5">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Language Club Admin Dashboard
      </h1>
      <p className="text-base text-gray-500 text-center">
        Here you can manage language club events.
      </p>
      <div className="w-full mt-10 md:mt-20">
        <h2 className="text-xl font-bold text-start">Language Club Events</h2>
        <DataTable columns={columns} data={events} />
      </div>
    </div>
  );
};

export default LanguageClubAdmin;
