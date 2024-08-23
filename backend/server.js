import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.route.js'
import taskRoutes from './Routes/task.route.js'
import planRoutes from './Routes/plan.route.js'
import chatRoutes from './Routes/chats.route.js'
import {sync} from './sync.js'
import sequelize from './sequelize.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
    credentials: true
}));

async function connectToDatabase() {
    try {
        // Create the connection to the database
        const query = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`;
        await sequelize.query(query);
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
sync;//To create tables like users

app.use('/api/auth',authRoutes);
app.use('/api/task',taskRoutes);
app.use('/api/plan',planRoutes);
app.use('/api/msg',chatRoutes);


const PORT = process.env.PORT_SERVER;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
  

