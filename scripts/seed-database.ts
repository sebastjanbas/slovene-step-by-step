import { db } from "../src/db";
import { langClubTable } from "../src/db/schema";

const sampleEvents = [
  {
    tutor: "Ela Remic",
    date: new Date("2025-09-10T14:00:00+02:00"),
    theme: "Cooking",
    description: "We will talk about cooking, writing a recipe in Slovene from start to finish.",
    level: "A1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-09-12T15:00:00+02:00"),
    theme: "Weather",
    description: "We will talk about different types of weather and climate.",
    level: "B1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Ela Remic",
    date: new Date("2025-09-14T16:00:00+02:00"),
    theme: "Travel",
    description: "Learn vocabulary and phrases for traveling in Slovenia.",
    level: "A2",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-09-16T17:00:00+02:00"),
    theme: "Business",
    description: "Business vocabulary and professional communication in Slovene.",
    level: "B2",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Ela Remic",
    date: new Date("2025-09-18T14:00:00+02:00"),
    theme: "Culture",
    description: "Slovene culture, traditions, and customs.",
    level: "A1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-09-20T15:00:00+02:00"),
    theme: "Music",
    description: "Discuss Slovene music and learn related vocabulary.",
    level: "B1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Ela Remic",
    date: new Date("2025-09-22T16:00:00+02:00"),
    theme: "Sports",
    description: "Talk about sports and physical activities in Slovene.",
    level: "A2",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-09-24T17:00:00+02:00"),
    theme: "Technology",
    description: "Learn technology-related vocabulary and discuss trends.",
    level: "B2",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Ela Remic",
    date: new Date("2025-09-26T14:00:00+02:00"),
    theme: "Nature",
    description: "Explore vocabulary about nature and the environment.",
    level: "A1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
  },
  {
    tutor: "Oleksandr Tyutyunnyk",
    date: new Date("2025-09-28T15:00:00+02:00"),
    theme: "History",
    description: "Discuss Slovene history and important events.",
    level: "B1",
    location: "Room 321, UEL",
    peopleBooked: 0,
    maxBooked: 8,
    duration: 45,
    price: "12.50",
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