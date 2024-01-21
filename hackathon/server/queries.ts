import { Console } from "console";
import { db, car_appointments, turned_away } from "./db.js";
import { sql } from 'drizzle-orm'


export enum VehicleType {
    Compact = 'compact',
    Medium = 'medium',
    FullSize = 'full-size',
    ClassOneTruck = 'class 1 truck',
    ClassTwoTruck = 'class 2 truck',
}

// Define timeAndCostPerType as a variable instead of a function
const timeAndCostPerType: Record<VehicleType, [number, number]> = {
    [VehicleType.Compact]: [30, 150],
    [VehicleType.Medium]: [30, 150],
    [VehicleType.FullSize]: [30, 150],
    [VehicleType.ClassOneTruck]: [60, 250],
    [VehicleType.ClassTwoTruck]: [120, 700],
};

export async function insertAppointment(appointment: { bookingTime: Date, selectedTime: Date, vehicle: VehicleType }) {

    // if exist store in turned away and send 401 to the client
    try {
        const [duration, cost] = timeAndCostPerType[appointment.vehicle]
        const finishingTime = new Date(appointment.selectedTime.getTime() + duration * 60000)
        // Format timestamp values for SQL
        const appointmentTime = appointment.selectedTime
        const finishTime = finishingTime
        const bookingTimeDate = appointment.bookingTime

        let isDuplicate: boolean 
        try {
            const duplicateResult = await db.execute(sql.raw(`
            SELECT 
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM car_appointments
                    WHERE 
                        appointment_time = ${appointmentTime} AND 
                        booking_time = ${bookingTimeDate} AND 
                        finish_time = ${finishTime} AND 
                        vehicle = ${appointment.vehicle}
                ) THEN TRUE ELSE FALSE END AS is_duplicate;
        `));
            isDuplicate = duplicateResult.rowAsArray.valueOf()
            console.log(isDuplicate)
            if (isDuplicate) {
                return "duplicate"
            }
        } catch (Error) {
            console.log("duplicate checking query error")
            console.log(Error.message)
        }

        
        try {
            const overlapResult = await db.execute(sql`
            SELECT 
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM car_appointments
                    WHERE (appointment_time, finish_time) OVERLAPS (${appointmentTime}, ${finishingTime})
                ) THEN TRUE ELSE FALSE END AS is_overlapping;
            `);
            const is_overlapping = overlapResult.rowAsArray.valueOf()
            console.log(overlapResult)
            if (is_overlapping) {
                try {
                    await db.insert(turned_away).values(
                        {
                            booking_time: appointment.bookingTime,
                            appointment_time: appointment.selectedTime,
                            finish_time: finishingTime,
                            cost: cost,
                            vehicle: appointment.vehicle
                        })
                    return "overlapping"
                } catch (error) {
                    console.log("turned away adding error")
                    return null
                }
            }
        } catch (Error) {
            console.log("overlapping checking query error")
            console.log(Error.message)
        }

        
        try {
            await db.insert(car_appointments).values(
                {
                    booking_time: appointment.bookingTime,
                    appointment_time: appointment.selectedTime,
                    finish_time: finishingTime,
                    cost: cost,
                    vehicle: appointment.vehicle
                })
            return "success"
        } catch (error) {
            console.log("appointment adding error")
            return null
        }


    } catch (error) {
        console.log("error at adding appoitments: server error");
        console.log(appointment);
    }

}

/*


** 

** get appointments for type per date
** get appointments for date



*/

