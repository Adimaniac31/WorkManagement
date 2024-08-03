import cron from 'node-cron';
import { Op } from 'sequelize';
import DuplicateTask from './models/duplicateTask.model.js';
import Task from './models/task.model.js';
import Plan from './models/plan.model.js';
import sequelize from './sequelize.js';

const createDailyDuplicateTasks = async () => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Query tasks with their plan information
    const tasks = await sequelize.query(`
      SELECT t.id, p.planType, p.startDate FROM tasks t
      JOIN plans p ON t.planId = p.id
      LEFT JOIN duplicate_tasks dt ON t.id = dt.taskId AND dt.date = :today
      WHERE dt.id IS NULL AND t.taskType = 'daily'
    `, {
      replacements: { today },
      type: sequelize.QueryTypes.SELECT
    });

    // Create DuplicateTask entries based on the plan type and start date
    for (const task of tasks) {
      const planStartDate = new Date(task.startDate);
      let planEndDate;

      // Determine end date based on plan type
      if (task.planType === 'week') {
        planEndDate = new Date(planStartDate);
        planEndDate.setDate(planEndDate.getDate() + 7);
      } else if (task.planType === 'month') {
        planEndDate = new Date(planStartDate);
        planEndDate.setMonth(planEndDate.getMonth() + 1);
      }

      let currentDate = planStartDate;

      // Create duplicate tasks for each date within the plan's duration
      while (currentDate <= planEndDate) {
        const currentDateString = currentDate.toISOString().split('T')[0];

        // Check if a duplicate task already exists for this date
        const [existingDuplicateTask] = await sequelize.query(`
          SELECT * FROM duplicate_tasks 
          WHERE taskId = :taskId AND date = :date
        `, {
          replacements: { taskId: task.id, date: currentDateString },
          type: sequelize.QueryTypes.SELECT
        });

        if (!existingDuplicateTask) {
          await DuplicateTask.create({
            taskId: task.id,
            date: currentDateString
          });
        }

        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    }

    console.log(`Created or ensured duplicate tasks for daily tasks within their plan's duration.`);
  } catch (error) {
    console.error('Error creating duplicate tasks:', error);
  }
};

// Schedule the task to run at 12:00 AM every day
cron.schedule('0 0 * * *', createDailyDuplicateTasks);
