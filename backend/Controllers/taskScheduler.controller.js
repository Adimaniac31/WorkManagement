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

    // Query all daily tasks and their associated plans
    const tasks = await sequelize.query(`
      SELECT t.id, p.planType, p.startDate 
      FROM tasks t
      JOIN plans p ON t.planId = p.id
      WHERE t.taskType = 'daily'
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    // Iterate through tasks to determine if they need duplicate tasks created
    for (const task of tasks) {
      const planStartDate = new Date(task.startDate);
      let planEndDate;

      // Determine the plan's end date based on plan type
      if (task.planType === 'week') {
        planEndDate = new Date(planStartDate);
        planEndDate.setDate(planEndDate.getDate() + 7); // 1 week after start date
      } else if (task.planType === 'month') {
        planEndDate = new Date(planStartDate);
        planEndDate.setMonth(planEndDate.getMonth() + 1); // 1 month after start date
      }

      const todayDate = new Date(today);

      // Check if today's date is within the plan's duration
      if (todayDate >= planStartDate && todayDate <= planEndDate) {
        const [existingDuplicateTask] = await sequelize.query(`
          SELECT * FROM duplicate_tasks 
          WHERE taskId = :taskId AND date = :today
        `, {
          replacements: { taskId: task.id, today },
          type: sequelize.QueryTypes.SELECT
        });

        // If no duplicate task exists for today, create one
        if (!existingDuplicateTask) {
          await DuplicateTask.create({
            taskId: task.id,
            date: today
          });
        }
      }
    }

    console.log('Created or ensured duplicate tasks for daily tasks within their plan\'s duration.');
  } catch (error) {
    console.error('Error creating duplicate tasks:', error);
  }
};

// Schedule the task to run at 12:00 AM every day
cron.schedule('0 0 * * *', createDailyDuplicateTasks);
