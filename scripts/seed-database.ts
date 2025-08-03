import { db } from "../src/db";
import { langClubTable } from "../src/db/schema";

const sampleEvents = [
  {
    tutor: "Ela Remic",
    date: new Date("2025-01-15T14:00:00"),
    theme: "Cooking",
    description: "We will talk about cooking, writing a recipe in Slovene from start to finish.",
    level: "A1",
    location: "Room 321, UEL",
    maxPeople: 8,
    duration: 45,
    price: "25.00",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-01-20T15:00:00"),
    theme: "Weather",
    description: "We will talk about different types of weather and climate.",
    level: "B1",
    location: "Room 321, UEL",
    maxPeople: 8,
    duration: 45,
    price: "30.00",
  },
  {
    tutor: "Anna Novak",
    date: new Date("2025-01-25T16:00:00"),
    theme: "Travel",
    description: "Learn vocabulary and phrases for traveling in Slovenia.",
    level: "A2",
    location: "Room 321, UEL",
    maxPeople: 8,
    duration: 45,
    price: "28.00",
  },
  {
    tutor: "Manca Kovač",
    date: new Date("2025-01-30T17:00:00"),
    theme: "Business",
    description: "Business vocabulary and professional communication in Slovene.",
    level: "B2",
    location: "Room 321, UEL",
    maxPeople: 8,
    duration: 45,
    price: "35.00",
  },
  {
    tutor: "Vlad Petrov",
    date: new Date("2025-02-05T14:00:00"),
    theme: "Culture",
    description: "Slovene culture, traditions, and customs.",
    level: "A1",
    location: "Room 321, UEL",
    maxPeople: 8,
    duration: 45,
    price: "25.00",
  },
];

async function seedDatabase() {
  try {
    console.log("Seeding database with sample events...");
    
    for (const event of sampleEvents) {
      await db.insert(langClubTable).values(event);
      console.log(`Added event: ${event.theme} with ${event.tutor}`);
    }
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase(); 