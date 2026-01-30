import {LanguageLevel} from "@/lib/placement-test";

export interface LangClubEvent {
  id: number;
  description: string;
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  theme: string;
  bookingId: number;
  bookingStatus: string;
  level?: string;
}

export interface PersonalSession {
  id: number;
  tutorId: number;
  startTime: Date;
  duration: number;
  status: string;
  sessionType: string;
  location: string;
  studentId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
}

export interface RegularSession {
  id: string;
  invitationId: number;
  tutorId: number;
  startTime: Date;
  duration: number;
  status: "booked";
  sessionType: string;
  location: string;
  studentId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorColor: string;
  description: string | null;
  isRecurring: true;
  dayOfWeek: number;
}

export interface UnifiedEvent {
  id: number | string;
  type: "language-club" | "personal" | "regulars";
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  theme: string;
  bookingId?: number;
  bookingStatus?: string;
  level?: string;
  tutorColor?: string;
  sessionType?: string;
  isRecurring?: boolean;
  invitationId?: number;
}

export interface PlacementTestState {
  currentQuestionIndex: number;
  levelResults: Record<LanguageLevel, { correct: number; total: number }>;
  currentLevelIndex: number;
  isTestComplete: boolean;
  finalLevel: string;
  answeredQuestions: number[]; // Track which questions have been answered
}

export interface Event {
  id: number;
  theme: string;
  date: Date;
  tutor: string;
  location: string;
  duration: number;
  maxBooked: number;
  peopleBooked: number;
  level: string;
  price: number;
}

