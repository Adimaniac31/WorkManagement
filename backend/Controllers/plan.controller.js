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

