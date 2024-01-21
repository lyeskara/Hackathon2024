import { Console } from "console";
import { db, car_appointments, turned_away, initialcsvdump_appointments, overlapped_appointments } from "./db.js";
import { eq, sql } from 'drizzle-orm'
import { PgDialect } from 'drizzle-orm/pg-core';

import openai from "./openai.js";
import OpenAI from "openai";
const pgDialect = new PgDialect();

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
        const bookingTimeDate = appointment.bookingTime


        try {
            const overlapResult = await db.select()
                .from(initialcsvdump_appointments)
                .where(sql`EXISTS (
                                            SELECT 1
                                            FROM initialcsvdump_appointments
                                            WHERE (appointment_time, finish_time) OVERLAPS (${appointmentTime.toISOString()}, ${finishingTime.toISOString()})
                                        )`);
            const is_overlapping = (!(overlapResult.length === 0))
            console.log(is_overlapping)
            if (is_overlapping) {
                try {
                    await db.insert(overlapped_appointments).values(
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
            await db.insert(initialcsvdump_appointments).values(
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



async function maximizeProfit(data) {
    const prompt: string = `you are a program that will be given an input of day schedule at a tire shop
                            the schedule will have some hours filled with clients and spare places. now here is for different cars there is different cost and timing for fixing: 
                            compact cars: 30 minutes servicing time, 150$ charge
                            medium cars: 30 minutes servicing time, 150$ charge
                            full-size cars: 30 minutes servicing time, $150 charge
                            class 1 trucks: 1 hour servicing time, $250 charge
                            class 2 trucks: 2 hours servicing time, $700 charge
                            
                            to optimize the daily schedule of the tire change shop. There is 10 bays, the optimization involves ensuring that there is at least one service bay available for each vehicle category (compact, medium, full-size cars, class 1 trucks, and class 2 trucks) at all times.
                            
                            since there is 5 type of cars so the assured services are one for each meaning there will be 5 spots during the day. now here come your part.
                            
                            your mission is basically decide statistically and logically which car to book for a certain time period, goal is make most money during the day. 
                            
                            so say you have a spot between 12:00 and 16:00 that's 4 hours. the best outcome to fill those spots will be two class 2 trucks since 2 hours each will fill the 4 hours and that will be 1400$ 
                            but wait there is a catch. what if there is no client with class 2 trucks at given time period? will here you implement a sort of logical priority queue based on your provided data. 
                            
                            so say at given moment there is 2 compact and 1 class 2 trucks clients. there is 2 hours of space. the most outcome would be to give the spot to the class 2 trucks client since he will generate 700$ for us instead of the two others making only 300$. there is another catch 
                            
                            what if at given time period there is two class 2 trucks clients and one spot of 2 hours. now here you do FIFO queue where first class 2 trucks client come first served. 
                            
                            now you see the pattern. i will give a schedule of day and list of potential customers that want to take a certain spot. your job is to decide which clients taking the spot will be most beneficial in term financial revenue for the company. you will first default to priority queue behaviour will you will run all possiblities to generate money from the list of client in given time space and see most beneficial and return it. now if the clients are of the same value aka generate same money and are competing for the same spot you do a fifo but remember always most revenue client pass first then if there is no difference between different clients DO FIFO.
                            
                            now i will show you the expected input and what you should return
                            
                            ${data}
                            
                            
                            initialResults and overlappedResult are arrays of objects that contain database table row information. basically the first data is appointments the rest is overlapping data.
                            your job from these objects is figure out the best combination that will generate most money,  based on the rules we have setup above
                            
                            so if in given time period giving a priority to one client over many clients generate more revenue then do it
                            
                            you are expected to generate a json object of this format
                            do not forget to add the cost of the appointment to the money_lost variable when you're turning away clients
                            and make sure that you add 1 to the turned_away variable when you're turning away clients these are very important,
                            you must make sure that you are at ALL TIMES keeping track of all of the variables, appointments, profit_made, turned_away and money_lost.

                            {
                            "appointments":[the expected sorted appointments chosen by you following the rules maximizing profit while scheduling clients]
                            "profit_made": "number in js type of number indicates the max money made with the combination of appointment you chose that maximize profit"
                            "turned_away": "number in js type of number indicates the number of clients that were turned away"
                            "money_lost": "number in js type of number indicates the money lost from the turned away clients"    
                            }


                            again iterating for the final output from you only return 

                            {
                            "appointments":[the expected sorted appointments chosen by you following the rules maximizing profit while scheduling clients]
                            "profit_made": "number in js type of number indicates the max money made with the combination of appointment you chose that maximize profit"
                            "turned_away": "number in js type of number indicates the number of clients that were turned away"
                            "money_lost": "number in js type of number indicates the money lost from the turned away clients"    
                        }



                            without any other thing. this will be parsed directly in code, any markdwon or any text will break the code.
                            not description, no introduction, just return json string to be parsed in code. this is an api code. [NO PROSE]
                            DO YOUR BEST GUESS. IF YOU CANT DO OPTIMAL RESULT. JUST RETURN NULL. DONT RETURN ANYTHING THAT WILL LOSE US TOKENS. THIS IS API CALL NOT FREE CHATGPT. 
                            AGAIN ONLY RETURN THE FORMAT SPECIFICED. DO YOUR BEST TO PARSE THAT DATA AND PERFORM ANALYSIS BASED ON THE REQUIRMENT PROVIDED. IF YOU CANT DO YOUR BEST GUESS
                            AND DONT GENERATE ANY OUTPUT THAT DOESNT MATCH THE RULES

                            generate final output where you have an array of appointments in json alongside variable showing profit for the day
                            don't forget that for every client that you turn away, you need to increase the count by 1 for the turned_away number and
                            when you turn away a client, you need to add the cost of the appointment to the money_lost variable
                            so make sure that when you're optimizing the queue that whoever you turn away you're adding the cost of their appointment to the money_lost variable
                            and you're increasing the turned_away variable by 1 do not forget that
                            and if you're not turning away any clients, then the turned_away variable should be 0 and the money_lost variable should be 0
                            make sure that the turned_away and money_lost variables are not always 0, dont forget to add them up when you're turning away clients
                            and make sure that you add the cost of the appointment to the money_lost variable when you're turning away clients
                            if there are 20 clients for a specific day, and you only appoint 15 of them, then you need to add the cost of the 5 appointments that you turned away to the money_lost variable and turn_away variable should be 5
                            do not forget the rules, if you're turning away clients, you need to add the cost of their appointment to the money_lost variable and increase the turned_away variable by 1 

                            appointment : {
                                cost: ,
                                appointment_time: ,
                                finishing_time: ,
                                vehicle: ,
                            }
                                                        YOUR OUTPUT SHOULD BE EITHER THIS: 

                            {
                                "appointments": appointment[]
                                "profit_made": "number in js type of number indicates the max money made with the combination of appointment you chose that maximize profit"
                                "turned_away": "number in js type of number indicates the number of clients that were turned away"
                                "money_lost": "number in js type of number indicates the money lost from the turned away clients"
                            } 


                            
                            no matter what make sure that turned_away variable is never 0 and that you at least have some money_lost make sure that you follow the guidelines for the prices 

                            This is an amazing example of what the output should look like, maybe with higher numbers, but this is the format that you need to follow
                            JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY JSON ONLY 
                            :
                            {
                                "appointments": [
                                    {
                                        "cost": 150,
                                        "appointment_time": "2022-08-01T08:00:00",
                                        "finishing_time": "2022-08-01T08:30:00",
                                        "vehicle": "Compact Car"
                                    },
                                    {
                                        "cost": 150,
                                        "appointment_time": "2022-08-01T09:00:00",
                                        "finishing_time": "2022-08-01T09:30:00",
                                        "vehicle": "Medium Car"
                                    },
                                    {
                                        "cost": 150,
                                        "appointment_time": "2022-08-01T10:00:00",
                                        "finishing_time": "2022-08-01T10:30:00",
                                        "vehicle": "Full-size Car"
                                    },
                                    {
                                        "cost": 250,
                                        "appointment_time": "2022-08-01T11:00:00",
                                        "finishing_time": "2022-08-01T12:00:00",
                                        "vehicle": "Class 1 Truck"
                                    },
                                    {
                                        "cost": 700,
                                        "appointment_time": "2022-08-01T12:00:00",
                                        "finishing_time": "2022-08-01T14:00:00",
                                        "vehicle": "Class 2 Truck"
                                    }
                                ],
                                "profit_made": 1400,
                                "turned_away": 4,
                                "money_lost": 600
                            }

                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                            JSON ONLY
                        `
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [{ "role": "system", "content": prompt }],
        });
        const gptResponse = chatCompletion.choices[0].message.content;
        return gptResponse

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status);
            console.error(error.message);
            console.error(error.code);
            console.error(error.type);
        } else {
            // Non-API error
            console.log(error);
        }
    }
}



export async function getAppointments(date: Date) {
    // select data from both tables starting 01 october to 30 november 
    const initialResults = db
        .select()
        .from(initialcsvdump_appointments)
        .where(sql` DATE_TRUNC('day', appointment_time) = ${date.toISOString()}::date
                AND EXTRACT(HOUR FROM appointment_time) >= 7
                AND EXTRACT(HOUR FROM appointment_time) < 19;`)
    const overlappedResult = db
        .select()
        .from(overlapped_appointments)
        .where(sql` DATE_TRUNC('day', appointment_time) = ${date.toISOString()}::date
                AND EXTRACT(HOUR FROM appointment_time) >= 7
                AND EXTRACT(HOUR FROM appointment_time) < 19;`)

    const GPT_PROMPT = {
        "appointments": {
            "initialdumps": JSON.stringify((await initialResults)),
            "overlappedrows": JSON.stringify((await overlappedResult))
        }
    }

    console.log(GPT_PROMPT)

    const result = await maximizeProfit(GPT_PROMPT)
    if (result) {
        const final_result = JSON.parse(result)
        return final_result
    }


}





export async function getAppointmentPerDay(date: Date) {
    console.log(date)
    const results = db
        .select()
        .from(car_appointments)
        .where(sql` DATE_TRUNC('day', appointment_time) = ${date.toISOString()}::date
                AND EXTRACT(HOUR FROM appointment_time) >= 7
                AND EXTRACT(HOUR FROM appointment_time) < 19;`)
    return results
}



// SELECT *
// FROM car_appointments
// WHERE DATE_TRUNC('day', appointment_time) = '2022-10-14'::date
//   AND EXTRACT(HOUR FROM appointment_time) >= 7
//   AND EXTRACT(HOUR FROM appointment_time) < 19;


