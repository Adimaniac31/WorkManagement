import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.route.js'
import {sync} from './sync.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

async function connectToDatabase() {
    try {
        // Create the connection to the database
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.PORT_DATABASE
        });

        // Print a success message to the console
        console.log(`Database connected successfully! and running on port ${process.env.PORT_DATABASE}.`);

        // Don't forget to close the connection when you're done
        await connection.end();
    } catch (error) {
        // Print an error message if the connection fails
        console.error('Error connecting to the database:', error.message);
    }
}

connectToDatabase();
sync;

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT_SERVER;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

