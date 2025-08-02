import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const langClubTable = pgTable("lang_club", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tutor: varchar({ length: 255 }).notNull(),
  date: timestamp().notNull(),
  theme: varchar({ length: 255 }).notNull(),
  description: text(),
  level: text(),
  location: text().notNull(),
  maxPeople: integer(),
  duration: integer(),
});

