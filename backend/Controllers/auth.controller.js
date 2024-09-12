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

        const query = 'SELECT * FROM users WHERE charName = :charName';
        const user = await sequelize.query(query, { 
            replacements: { charName },
            type: sequelize.QueryTypes.SELECT 
         });
        console.log(user);
        if(user.length>0){
            return res.status(400).json({ error: 'Character name already exists' });
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
            return res.status(401).json( {error: 'Incorrect username'} );
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

        // Update the latestSignIn field
        await sequelize.query(
            'UPDATE users SET latestSignIn = :latestSignIn WHERE id = :id',
            { 
                replacements: { latestSignIn: new Date(), id: user.id },
                type: sequelize.QueryTypes.UPDATE
            }
        );

        // Fetch the updated user record
        const [updatedUser] = await sequelize.query(
            'SELECT charName, latestSignIn, feeling, id  FROM users WHERE id = :id',
            { replacements: { id: user.id }, type: sequelize.QueryTypes.SELECT }
        );

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
        res.status(200).json({
          user: updatedUser,
          token : token
        });
    } catch (err) {
        console.log('Error in signIn function:', err);
        res.status(500).json({ error: 'An error occurred while signing in' });
    }
};

export const signOut = async (req, res) => {
  try {      
      // Send a success response
      res.status(200).json({ message: 'Sign Out Successfully!' });
  } catch (error) {
      console.log('Error while signing out!', error);
      res.status(500).json({ message: 'Error while signing out!' });
  }
};


export const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Check if the user exists
      const userQuery = 'SELECT * FROM users WHERE id = :userId';
      const user = await sequelize.query(userQuery, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      });
  
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve all plans related to the user
      const plansQuery = 'SELECT id FROM plans WHERE userId = :userId';
      const plans = await sequelize.query(plansQuery, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      });
  
      if (plans.length > 0) {
        // Extract plan IDs
        const planIds = plans.map(plan => plan.id);
  
        // Retrieve all task IDs associated with the user's plans
        const tasksQuery = 'SELECT id FROM tasks WHERE planId IN (:planIds)';
        const tasks = await sequelize.query(tasksQuery, {
          replacements: { planIds },
          type: sequelize.QueryTypes.SELECT
        });
  
        if (tasks.length > 0) {
          // Extract task IDs
          const taskIds = tasks.map(task => task.id);
  
          // Delete all duplicate tasks related to the user's tasks
          const deleteDuplicateTasksQuery = 'DELETE FROM duplicate_tasks WHERE taskId IN (:taskIds)';
          await sequelize.query(deleteDuplicateTasksQuery, {
            replacements: { taskIds },
            type: sequelize.QueryTypes.DELETE
          });
  
          // Delete all tasks related to the user's plans
          const deleteTasksQuery = 'DELETE FROM tasks WHERE id IN (:taskIds)';
          await sequelize.query(deleteTasksQuery, {
            replacements: { taskIds },
            type: sequelize.QueryTypes.DELETE
          });
        }
  
        // Delete all plans related to the user
        const deletePlansQuery = 'DELETE FROM plans WHERE id IN (:planIds)';
        await sequelize.query(deletePlansQuery, {
          replacements: { planIds },
          type: sequelize.QueryTypes.DELETE
        });
      }
  
      // Finally, delete the user
      const deleteUserQuery = 'DELETE FROM users WHERE id = :userId';
      await sequelize.query(deleteUserQuery, {
        replacements: { userId },
        type: sequelize.QueryTypes.DELETE
      });
  
      res.status(200).json({ message: 'User and all associated data deleted successfully' });
    } catch (error) {
      console.log('Error in deleteUser function:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  };
  