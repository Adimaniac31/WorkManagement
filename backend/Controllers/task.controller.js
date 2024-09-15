import sequelize from '../sequelize.js'; // Import the sequelize instance
import DuplicateTask from '../Models/duplicateTask.model.js';

// Create a new task
export const createTask = async (req, res) => {
  const { taskName, planId, taskType } = req.body;

  try {
    // Check if the plan exists using a raw SQL query
    const planQuery = `SELECT * FROM plans WHERE id = :planId`;
    const plan = await sequelize.query(planQuery, {
      replacements: { planId },
      type: sequelize.QueryTypes.SELECT
    });

    if (plan.length === 0) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Create the task using a raw SQL query
    const taskQuery = `
      INSERT INTO tasks (taskName, planId, taskType, createdAt, updatedAt)
      VALUES (:taskName,:planId,:taskType, NOW(), NOW())
    `;
    await sequelize.query(taskQuery, {
      replacements: { taskName, planId, taskType },
      type: sequelize.QueryTypes.INSERT
    });

    // Get the newly created task
    const newTaskQuery = `
      SELECT * FROM tasks WHERE id = LAST_INSERT_ID()
    `;
    const newTask = await sequelize.query(newTaskQuery, {
      type: sequelize.QueryTypes.SELECT
    });

    // If taskType is 'daily', create duplicate tasks based on planType
    if (taskType === 'daily') {
      const planType = plan[0].planType;
      const duration = planType === 'week' ? 7 : 30; // Weekly or monthly duration
      const currentDate = new Date();

      for (let i = 0; i < duration; i++) {
        const duplicateDate = new Date(currentDate);
        duplicateDate.setDate(currentDate.getDate() + i);

        await DuplicateTask.create({
          date: duplicateDate.toISOString().split('T')[0],
          taskId: newTask[0].id
        });
      }
    }

    res.status(201).json(newTask[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  const { taskId, userId } = req.params;

  try {
    // Check if the task exists and belongs to a plan of the user
    const taskQuery = `
      SELECT tasks.* FROM tasks 
      INNER JOIN plans ON tasks.planId = plans.id 
      WHERE tasks.id = :taskId AND plans.userId = :userId
    `;
    const task = await sequelize.query(taskQuery, {
      replacements: { taskId, userId },
      type: sequelize.QueryTypes.SELECT
    });

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found!' });
    }

    // Delete related duplicate tasks
    await DuplicateTask.destroy({ where: { taskId } });

    // Delete the task
    const deleteTaskQuery = `DELETE FROM tasks WHERE id = :taskId`;
    await sequelize.query(deleteTaskQuery, {
      replacements: { taskId },
      type: sequelize.QueryTypes.DELETE
    });

    res.status(200).json({ message: 'Task and related duplicate tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { taskId, userId } = req.params;
  const { taskName, completionStatus, taskType } = req.body;

  try {
    // Find the task by id and validate user ownership
    const [task] = await sequelize.query(
      `SELECT t.*, p.userId AS planOwner 
       FROM tasks t 
       JOIN plans p ON t.planId = p.id 
       WHERE t.id = :taskId AND p.userId = :userId`,
      {
        replacements: { taskId, userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or you are not authorized to update this task.' });
    }

    // Update the task with the new data
    await sequelize.query(
      `UPDATE tasks 
       SET taskName = COALESCE(:taskName, taskName), 
           completionStatus = COALESCE(:completionStatus, completionStatus),
           updatedAt = NOW()
       WHERE id = :taskId`,
      {
        replacements: {
          taskId,
          taskName: taskName || null,
          completionStatus: completionStatus || null
        },
        type: sequelize.QueryTypes.UPDATE
      }
    );

    // If taskType is 'daily', update all duplicate tasks to have completionStatus = 1
    if (taskType === 'daily') {
      await sequelize.query(
        `UPDATE duplicate_tasks 
         SET completionStatus = 1 
         WHERE taskId = :taskId`,
        {
          replacements: { taskId },
          type: sequelize.QueryTypes.UPDATE
        }
      );
    }

    // Return the updated task
    const [updatedTask] = await sequelize.query(
      `SELECT * FROM tasks WHERE id = :taskId`,
      {
        replacements: { taskId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    return res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'An error occurred while updating the task.' });
  }
};


export const updateTodaysTasks = async (req, res) => {
  const { taskId } = req.params; // Adjust this if taskId is in req.body
  const { completionStatus } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  try {
    // Check if the task exists
    const [task] = await sequelize.query(
      `SELECT * FROM duplicate_tasks WHERE id = :taskId`,
      {
        replacements: { taskId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (!task || task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task
    await sequelize.query(
      `UPDATE duplicate_tasks
       SET completionStatus = COALESCE(:completionStatus, completionStatus),
           updatedAt = NOW()
       WHERE id = :taskId`,
      {
        replacements: {
          taskId,
          completionStatus: completionStatus
        },
        type: sequelize.QueryTypes.UPDATE
      }
    );

    const [task2] = await sequelize.query(
      `SELECT * FROM duplicate_tasks WHERE id = :taskId`,
      {
        replacements: { taskId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getTodaysTasks = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().slice(0, 10);  // Format as YYYY-MM-DD

  try {

    const result = await sequelize.query(
      `SELECT dt.*, t.taskName, dt.completionStatus FROM duplicate_tasks dt
      JOIN tasks t ON dt.taskId = t.id
      WHERE dt.date = :today AND t.planId IN (
        SELECT id FROM plans WHERE userId = :userId
      )`,
      {
        replacements: { today, userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No tasks found for today.',tasks: [] });
    }

    res.status(200).json({ tasks: result });

  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    res.status(500).json({ message: 'An error occurred while fetching today\'s tasks.' });
  }
};

export const getUserTasks = async (req, res) => {
  const { userId,planId } = req.params;

  try {
    const result = await sequelize.query(
      `SELECT p.*, t.* FROM plans p 
      LEFT JOIN tasks t ON p.id = t.planId 
      WHERE p.userId = :userId AND t.planID = :planId`,
      {
        replacements: { userId,planId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user on this plan.' });
    }

    res.status(200).json({ tasks: result });

  } catch (error) {
    console.error('Error fetching user tasks', error);
    res.status(500).json({ message: 'An error occurred while fetching tasks and plans.' });
  }
};

// Get all daily tasks for a user
export const getUserAllDailyTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await sequelize.query(
      `SELECT t.*, p.planName FROM tasks t
       JOIN plans p ON t.planId = p.id
       WHERE t.taskType = 'daily' AND p.userId = :userId`,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No daily tasks found for this user.' });
    }

    res.status(200).json({ tasks: result });

  } catch (error) {
    console.error('Error fetching daily tasks:', error);
    res.status(500).json({ message: 'An error occurred while fetching daily tasks.' });
  }
};

// Get all weekly tasks for a user
export const getUserAllWeeklyTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await sequelize.query(
      `SELECT t.*, p.planName FROM tasks t
       JOIN plans p ON t.planId = p.id
       WHERE t.taskType = 'week' AND p.userId = :userId`,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No weekly tasks found for this user.' });
    }

    res.status(200).json({ tasks: result });

  } catch (error) {
    console.error('Error fetching weekly tasks:', error);
    res.status(500).json({ message: 'An error occurred while fetching weekly tasks.' });
  }
};

