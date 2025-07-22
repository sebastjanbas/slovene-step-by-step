import CalendarDashboard from "@/components/dashboard/content/calendar-dashboard";
import React from "react";

const DashboardPage = ({ params }) => {
  const { locale } = params;

  return (
    <main className="h-full w-full overflow-hidden p-10">
      <div>
        <h1>Hi Sebastjan!</h1>
        <div className="flex flex-row justify-between items-center gap-20">
          <ul>
            <li></li>
          </ul>
          <CalendarDashboard locale={locale} />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
