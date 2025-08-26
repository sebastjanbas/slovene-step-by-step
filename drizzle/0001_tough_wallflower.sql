ALTER TABLE "lang_club" ADD COLUMN "peopleBooked" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lang_club" ADD COLUMN "maxBooked" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lang_club" DROP COLUMN "maxPeople";