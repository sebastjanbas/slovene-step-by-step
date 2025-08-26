CREATE TABLE "lang_club_bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lang_club_bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"eventId" integer NOT NULL,
	"userId" varchar(255) NOT NULL,
	"stripeSessionId" varchar(255),
	"stripePaymentIntentId" varchar(255),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lang_club" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lang_club_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tutor" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"theme" varchar(255) NOT NULL,
	"description" text,
	"level" text,
	"location" text NOT NULL,
	"peopleBooked" integer DEFAULT 0 NOT NULL,
	"maxBooked" integer DEFAULT 0 NOT NULL,
	"duration" integer,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"stripeProductId" varchar(255),
	"stripePriceId" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "lang_club_bookings" ADD CONSTRAINT "lang_club_bookings_eventId_lang_club_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."lang_club"("id") ON DELETE no action ON UPDATE no action;