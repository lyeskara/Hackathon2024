CREATE TABLE IF NOT EXISTS "turned_away" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"finish_time" timestamp DEFAULT now() NOT NULL,
	"int" integer,
	"vehicle" text
);
