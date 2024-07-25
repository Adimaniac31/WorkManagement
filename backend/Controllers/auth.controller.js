import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../sequelize.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
    try {
        const { charName, password, feeling } = req.body;

        // Validate the input data
        if (!charName || !password) {
            return res.status(400).json({ error: 'Character name and password are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using a raw SQL query
        const [results] = await sequelize.query(
            'INSERT INTO users (charName, password, feeling, createdAt, updatedAt) VALUES (:charName, :password, :feeling, NOW(), NOW())',
            {
                replacements: { charName, password: hashedPassword, feeling }
            }
        );

        // Respond with the created user's ID
        res.status(201).json({ id: results.insertId, charName, feeling });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

export const signIn = async (req, res) => {
    try {
        const { charName, password } = req.body;

        // Validate the input data
        if (!charName || !password) {
            return res.status(400).json({ error: 'Character name and password are required' });
        }

        // Find the user by their character name
        const [results] = await sequelize.query(
            'SELECT * FROM users WHERE charName = :charName',
            { replacements: { charName }, type: sequelize.QueryTypes.SELECT }
        );

        if (!results || results.length === 0) {
            return res.status(401).json({ error: 'Incorrect username' });
        }

        const user = results;

        // Check if user is defined and has a password property
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                id: user.id,
                charName: user.charName
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with the JWT token
        res.status(200).cookie('access_token',token,{httpOnly:true}).json('Token is saved in cookies');
    } catch (err) {
        console.log('Error in signIn function:', err);
        res.status(500).json({ error: 'An error occurred while signing in' });
    }
};

export const signOut = async (req, res) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json({message:'Sign Out Successfully!'});
    }
    catch(error){
        console.log('Error while signing out!',error);
    }
};