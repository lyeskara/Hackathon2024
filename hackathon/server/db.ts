import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv'
dotenv.config()


const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);

// db/schema.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const car_appointments = pgTable('car_appointments', {
    id: serial('id').primaryKey(),
    booking_time: timestamp('booking_time').notNull().defaultNow(),
    appointment_time: timestamp('appointment_time').notNull().defaultNow(),
    finish_time: timestamp('finish_time').notNull().defaultNow(),
    cost: integer('int'),
    vehicle: text("vehicle")
});

export const turned_away = pgTable('turned_away', {
    id: serial('id').primaryKey(),
    booking_time: timestamp('booking_time').notNull().defaultNow(),
    appointment_time: timestamp('appointment_time').notNull().defaultNow(),
    finish_time: timestamp('finish_time').notNull().defaultNow(),
    cost: integer('int'),
    vehicle: text("vehicle")
});
