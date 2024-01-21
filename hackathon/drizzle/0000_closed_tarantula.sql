CREATE TABLE IF NOT EXISTS "car_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"finish_time" timestamp DEFAULT now() NOT NULL,
	"cost" integer,
	"vehicle" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "initialcsvdump_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"finish_time" timestamp DEFAULT now() NOT NULL,
	"cost" integer,
	"vehicle" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "overlapped_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"finish_time" timestamp DEFAULT now() NOT NULL,
	"cost" integer,
	"vehicle" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "turned_away" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"finish_time" timestamp DEFAULT now() NOT NULL,
	"cost" integer,
	"vehicle" text
);
