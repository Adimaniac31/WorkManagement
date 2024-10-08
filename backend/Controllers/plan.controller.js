import sequelize from '../sequelize.js'; // Import the sequelize instance

// Create a new plan
export const createPlan = async (req, res) => {
  const { planType, planName } = req.body;
  const { userId } = req.params;

  try {
    // Check if the user exists using raw SQL query
    if(!planName || !planType){
      return res.status(401).json({message: 'Please Add plan name and plan type!!',details: error});
    }
    const userQuery = `SELECT * FROM users WHERE id = :userId`;
    const user = await sequelize.query(userQuery, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT
    });

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the plan using raw SQL query
    const planQuery = `
      INSERT INTO plans (planType, userId, planName, createdAt, updatedAt)
      VALUES (:planType, :userId,:planName, NOW(), NOW())
    `;
    await sequelize.query(planQuery, {
      replacements: { planType, userId, planName },
      type: sequelize.QueryTypes.INSERT
    });

    // Get the newly created plan
    const newPlanQuery = `
      SELECT * FROM plans WHERE id = LAST_INSERT_ID()
    `;
    const newPlan = await sequelize.query(newPlanQuery, {
      type: sequelize.QueryTypes.SELECT
    });

    res.status(201).json(newPlan[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan', details: error.message });
  }
};

// Delete a plan by ID
export const deletePlan = async (req, res) => {
  const { planId, userId } = req.params;

  try {
    // Check if the plan exists and belongs to the user
    const planQuery = `SELECT * FROM plans WHERE id = :planId AND userId = :userId`;
    const plan = await sequelize.query(planQuery, {
      replacements: { planId, userId },
      type: sequelize.QueryTypes.SELECT
    });

    if (plan.length === 0) {
      return res.status(404).json({ error: 'Plan not found!' });
    }

    // Retrieve all tasks associated with the plan
    const tasksQuery = `SELECT id FROM tasks WHERE planId = :planId`;
    const tasks = await sequelize.query(tasksQuery, {
      replacements: { planId },
      type: sequelize.QueryTypes.SELECT
    });

    // If there are associated tasks, delete their duplicate tasks first
    if (tasks.length > 0) {
      const taskIds = tasks.map(task => task.id);
      const deleteDuplicateTasksQuery = `DELETE FROM duplicate_tasks WHERE taskId IN (:taskIds)`;
      await sequelize.query(deleteDuplicateTasksQuery, {
        replacements: { taskIds },
        type: sequelize.QueryTypes.DELETE
      });

      // Delete associated tasks
      const deleteTasksQuery = `DELETE FROM tasks WHERE planId = :planId`;
      await sequelize.query(deleteTasksQuery, {
        replacements: { planId },
        type: sequelize.QueryTypes.DELETE
      });
    }

    // Delete the plan
    const deletePlanQuery = `DELETE FROM plans WHERE id = :planId`;
    await sequelize.query(deletePlanQuery, {
      replacements: { planId },
      type: sequelize.QueryTypes.DELETE
    });

    res.status(200).json({ message: 'Plan and associated tasks, including duplicate tasks, deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan', details: error.message });
  }
};

export const getUserPlans = async (req, res) => {
  try {
    const { userId } = req.params;
    const plansQuery = `SELECT * FROM plans WHERE userId = :userId`;
    const plans = await sequelize.query(plansQuery, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT
    });
    res.status(200).json({ plans });
  }catch(error){
    res.status(500).json({message: 'Error getting plans', details: error.message});
  }
};


