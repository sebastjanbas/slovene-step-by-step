/* eslint-disable @typescript-eslint/no-explicit-any */
// Types
export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  color: string;
  email: string;
  phone: string;
  bio: string;
  specializations: string[];
}

export interface TutoringSession {
  id: string;
  tutorId: string;
  tutorName: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  isAvailable: boolean;
  sessionType: string;
  level: string;
  price: number;
  location: string;
  description: string;
  preparationNotes?: string;
  maxStudents?: number;
  currentStudents?: number;
}

// More flexible type for sessions array
export type TutoringSessionArray = TutoringSession[];

export interface DateClickArg {
  dateStr: string;
  date: Date;
  allDay: boolean;
  dayEl: HTMLElement;
  jsEvent: MouseEvent;
  view: any;
}

export interface EventClickArg {
  event: any;
  jsEvent: MouseEvent;
  view: any;
}

export interface EventDropArg {
  event: any;
  oldEvent: any;
  delta: any;
  revert: () => void;
}

export interface EventResizeArg {
  event: any;
  startDelta: any;
  endDelta: any;
  revert: () => void;
}
