import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

