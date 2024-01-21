ALTER TABLE "car_appointments" ADD COLUMN "finish_time" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "car_appointments" ADD COLUMN "int" integer;