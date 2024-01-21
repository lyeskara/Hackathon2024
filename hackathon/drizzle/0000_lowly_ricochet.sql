CREATE TABLE IF NOT EXISTS "car_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_time" timestamp DEFAULT now() NOT NULL,
	"appointment_time" timestamp DEFAULT now() NOT NULL,
	"vehicle" text
);
