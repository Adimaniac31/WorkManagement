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

