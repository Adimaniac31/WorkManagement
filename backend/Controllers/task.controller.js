import sequelize from '../sequelize.js'; // Import the sequelize instance

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
      replacements: { taskName,planId,taskType},
      type: sequelize.QueryTypes.INSERT
    });

    // Get the newly created task
    const newTaskQuery = `
      SELECT * FROM tasks WHERE id = LAST_INSERT_ID()
    `;
    const newTask = await sequelize.query(newTaskQuery, {
      type: sequelize.QueryTypes.SELECT
    });

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

    // Delete the task
    const deleteTaskQuery = `DELETE FROM tasks WHERE id = :taskId`;
    await sequelize.query(deleteTaskQuery, {
      replacements: { taskId },
      type: sequelize.QueryTypes.DELETE
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { taskId, userId } = req.params;
  const { taskType, taskName, completionStatus } = req.body;

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
       SET taskType = COALESCE(:taskType, taskType), 
           taskName = COALESCE(:taskName, taskName), 
           completionStatus = COALESCE(:completionStatus, completionStatus),
           updatedAt = NOW()
       WHERE id = :taskId`,
      {
        replacements: {
          taskId,
          taskType: taskType || null,
          taskName: taskName || null,
          completionStatus: completionStatus || null
        },
        type: sequelize.QueryTypes.UPDATE
      }
    );

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

