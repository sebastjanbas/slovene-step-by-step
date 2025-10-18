import { Tutor, TutoringSession } from "@/components/calendar/types";

// Tutor data with complete information
export const tutors: Tutor[] = [
  {
    id: "ela",
    name: "Ela Remic",
    avatar: "/foto-ela.jpg",
    color: "#3B82F6", // Blue
    email: "ela@slovenestepbystep.com",
    phone: "+386 40 123 456",
    bio: "Native Slovene speaker with 8 years of teaching experience. Specializes in conversation practice and cultural context.",
    specializations: [
      "Conversation Practice",
      "Cultural Context",
      "Pronunciation",
      "Business Slovene",
    ],
  },
  {
    id: "oleksandr",
    name: "Oleksandr Tyutyunnyk",
    avatar: "/foto-oleksandr3.jpg",
    color: "#10B981", // Green
    email: "oleksandr@slovenestepbystep.com",
    phone: "+386 40 123 457",
    bio: "Experienced language teacher focusing on grammar and advanced conversation. Great for students preparing for exams.",
    specializations: [
      "Grammar",
      "Advanced Conversation",
      "Exam Preparation",
      "Academic Writing",
    ],
  },
  {
    id: "manca",
    name: "Manca Levašič",
    avatar: "/foto-manca.png",
    color: "#F59E0B", // Orange
    email: "manca@slovenestepbystep.com",
    phone: "+386 40 123 458",
    bio: "Literature and culture expert. Perfect for students interested in Slovene literature and cultural nuances.",
    specializations: [
      "Literature",
      "Cultural Studies",
      "Creative Writing",
      "History",
    ],
  },
];

// Helper function to create tutoring sessions
const createSession = (
  id: string,
  tutorId: string,
  startTime: Date,
  duration: number,
  sessionType: string,
  level: string,
  isAvailable: boolean = true,
  price: number = 45,
  description: string,
  preparationNotes?: string,
  maxStudents: number = 1,
  currentStudents: number = 0
): TutoringSession => {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60000);
  const tutor = tutors.find((t) => t.id === tutorId);

  return {
    id,
    tutorId,
    tutorName: tutor?.name || "Unknown Tutor",
    startTime: start,
    endTime: end,
    duration,
    isAvailable,
    sessionType,
    level,
    price,
    location: "Online (Zoom/Google Meet)",
    description,
    preparationNotes,
    maxStudents,
    currentStudents,
  };
};

// Sample tutoring sessions - October 2025
export const sampleSessions: TutoringSession[] = [
  // Ela's sessions - October 15, 2025
  createSession(
    "1",
    "ela",
    new Date("2025-10-15T09:00:00"),
    45,
    "Conversation Practice",
    "Intermediate",
    true,
    15,
    "Practice everyday Slovene conversation with a native speaker. Perfect for improving fluency and confidence.",
    "Bring topics you'd like to discuss. We'll focus on natural conversation flow."
  ),
  createSession(
    "2",
    "ela",
    new Date("2025-10-15T10:00:00"),
    45,
    "Grammar Focus",
    "Beginner",
    false,
    15,
    "Structured grammar lesson covering essential Slovene grammar rules with practical exercises.",
    "Review basic verb conjugations. Bring your notebook for exercises."
  ),
  createSession(
    "3",
    "ela",
    new Date("2025-10-15T14:00:00"),
    60,
    "Pronunciation Workshop",
    "All Levels",
    true,
    20,
    "Focus on Slovene pronunciation, accent, and intonation. Great for all levels.",
    "No preparation needed. We'll work on sounds that are challenging for your native language."
  ),

  // Oleksandr's sessions - October 15-18, 2025
  createSession(
    "4",
    "oleksandr",
    new Date("2025-10-15T10:00:00"),
    45,
    "Business Slovene",
    "Intermediate",
    true,
    15,
    "Learn professional Slovene for business contexts, meetings, and formal communication.",
    "Think about your work context. We'll practice relevant business vocabulary."
  ),
  createSession(
    "5",
    "oleksandr",
    new Date("2025-10-15T15:00:00"),
    60,
    "Advanced Conversation",
    "Advanced",
    false,
    20,
    "Challenging conversations on complex topics. Perfect for advanced students.",
    "Prepare 3 discussion topics you're interested in. We'll dive deep into nuanced topics."
  ),
  createSession(
    "6",
    "oleksandr",
    new Date("2025-10-16T10:00:00"),
    45,
    "Grammar Deep Dive",
    "Intermediate",
    true,
    15,
    "Comprehensive grammar review with focus on tricky Slovene constructions.",
    "Review previous grammar notes. We'll tackle the most challenging aspects."
  ),

  // Manca's sessions - October 15-18, 2025
  createSession(
    "7",
    "manca",
    new Date("2025-10-15T11:00:00"),
    45,
    "Cultural Context",
    "All Levels",
    true,
    15,
    "Explore Slovene culture, traditions, and social context through language learning.",
    "No preparation needed. We'll discover Slovene culture together through conversation."
  ),
  createSession(
    "8",
    "manca",
    new Date("2025-10-15T13:00:00"),
    60,
    "Literature Discussion",
    "Intermediate",
    false,
    20,
    "Discuss Slovene literature, poetry, and cultural texts in their original language.",
    "Read the assigned short story. We'll analyze language and cultural themes."
  ),
  createSession(
    "9",
    "manca",
    new Date("2025-10-16T09:00:00"),
    45,
    "Creative Writing",
    "Intermediate",
    true,
    15,
    "Practice Slovene through creative writing exercises and storytelling.",
    "Bring a notebook. We'll start with simple creative exercises."
  ),
  createSession(
    "10",
    "manca",
    new Date("2025-10-16T14:00:00"),
    45,
    "History & Culture",
    "Advanced",
    false,
    15,
    "Explore Slovene history and its influence on modern language and culture.",
    "Research one aspect of Slovene history. We'll discuss its linguistic impact."
  ),
];
