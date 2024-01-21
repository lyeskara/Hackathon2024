import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import fastCsv from 'fast-csv'
import { Readable } from 'stream';
import { VehicleType, insertAppointment } from './queries.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post("/add_appointment", async (req, res) => {
    const car_appointment = req.body.appointment
    const bookingTime = new Date(car_appointment.bookingTime);
    const selectedTime = new Date(car_appointment.selectedTime);

    const result = await insertAppointment({
        bookingTime: bookingTime,
        selectedTime: selectedTime,
        vehicle: car_appointment.vehicle.toLowerCase() as VehicleType
    });

    result && res.send(result)
})

app.post("/csv", upload.single('csvFile'), async (req, res) => {
    const csvFile = req.file;
    console.log(csvFile)
    if (!csvFile) {
        return res.status(400).json({ error: 'No CSV file provided' });
    }

    // Process the CSV file
    const stream = Readable.from([csvFile.buffer.toString()]); // []
    console.log(stream)
    fastCsv
        .parseStream(stream, { headers: false })
        .on('data', async (row: any) => {
            if (Array.isArray(row) && row.length === 3) {
                const [bookingTime, selectedTime, vehicle] = row;
                const bookingTimeDate = new Date(bookingTime);
                const selectedTimeDate = new Date(selectedTime);
                const car_appointment = {
                    bookingTime: bookingTimeDate,
                    selectedTime: selectedTimeDate,
                    vehicle: vehicle.toLowerCase() as VehicleType
                };
                console.log(row)

                const result = await insertAppointment(car_appointment);

            } else {
                console.error('Invalid row format:', row);
            }
        })
        .on('end', () => {
            // Do something with the processed CSV data, for example, save it to a database
            res.json({ message: 'CSV file processed successfully' });
        })
        .on('error', (error) => {
            console.error('CSV parsing error:', error);
            res.status(500).json({ error: 'Error processing CSV file' });
        });

})

app.listen(3000, () => {
    console.log(`Server is running on ${3000}`);
});