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
  const { taskName, completionStatus } = req.body;

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

    if (taskType === 'daily') {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      const [duplicateTask] = await DuplicateTask.findAll({
        where: {
          taskId: taskId,
          date: today
        }
      });

      if (duplicateTask) {
        await DuplicateTask.update(
          {
            completionStatus: completionStatus || duplicateTask.completionStatus
          },
          {
            where: { id: duplicateTask.id }
          }
        );
      }
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
