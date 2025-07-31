import React from "react";
import LangComponents from "./_components/lang-components";

const events = [
  {
    id: 1,
    tutor: "Ela Remic",
    date: "2025-07-31",
    theme: "Cooking",
    description:
      "We will talk about cooking, writing an recipe in slovene from start to finish.",
    level: "A1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 2,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-07-29",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 3,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-08-01",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 4,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-07-29",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 5,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-07-29",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
  {
    id: 6,
    tutor: "Oleksandr Tyutyunnyk",
    date: "2025-07-29",
    theme: "Weather",
    description:
      "We will talk about different types of weather and other stuff",
    level: "B1",
    location: "Room 321, UEL",
    maxApplicants: 8,
    duration: 45,
  },
];

const LanguageClubPage = ({ params }) => {
  const { locale } = params;
  return (
    <div className="p-5 flex flex-col md:flex-row h-auto w-full min-h-[500px] md:overflow-hidden justify-center items-center md:items-start gap-5">
      <LangComponents events={events} locale={locale} />
    </div>
  );
};

export default LanguageClubPage;
