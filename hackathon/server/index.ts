import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import fastCsv from 'fast-csv'
import fs from 'fs'
import { Readable } from 'stream';
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage(); // Use memory storage for handling file uploads
const upload = multer({ storage: storage });

app.post("/csv", upload.single('csvFile'), (req, res) => {
    const csvFile = req.file;

    if (!csvFile) {
        return res.status(400).json({ error: 'No CSV file provided' });
    }

    // Process the CSV file
    const csvData: any[] = [];
    const stream = Readable.from([csvFile.buffer.toString()]);

    fastCsv
        .parseStream(stream, { headers: true })
        .on('data', (row: any) => {
            csvData.push(row);
        })
        .on('end', () => {
            // Do something with the processed CSV data, for example, save it to a database
            console.log('CSV data:', csvData);
            res.json({ message: 'CSV file processed successfully' });
        })
        .on('error', (error) => {
            console.error('CSV parsing error:', error);
            res.status(500).json({ error: 'Error processing CSV file' });
        });

})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});