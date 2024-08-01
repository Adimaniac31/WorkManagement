import sequelize from '../sequelize.js'; // Import the sequelize instance

// Create a new plan
export const createPlan = async (req, res) => {
  const { planType} = req.body;
  const {userId} = req.params;

  try {
    // Check if the user exists using raw SQL query
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
      INSERT INTO plans (planType, userId, createdAt, updatedAt)
      VALUES (:planType, :userId, NOW(), NOW())
    `;
    await sequelize.query(planQuery, {
      replacements: { planType, userId },
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
  const { planId,userId } = req.params;
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

    // Delete associated tasks
    const deleteTasksQuery = `DELETE FROM tasks WHERE planId = :planId`;
    await sequelize.query(deleteTasksQuery, {
      replacements: { planId },
      type: sequelize.QueryTypes.DELETE
    });

    // Delete the plan
    const deletePlanQuery = `DELETE FROM plans WHERE id = :planId`;
    await sequelize.query(deletePlanQuery, {
      replacements: { planId },
      type: sequelize.QueryTypes.DELETE
    });

    res.status(200).json({ message: 'Plan and associated tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan', details: error.message });
  }
};


