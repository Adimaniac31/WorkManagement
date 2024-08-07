import sequelize from './sequelize.js'; // Adjust the path as necessary
import Task from './Models/task.model.js';
import User from './Models/user.model.js';
import Plan from './Models/plan.model.js';
import DuplicateTask from './Models/duplicateTask.model.js';

export const sync = (async () => {
  try {
    await sequelize.sync({alter:true}); // Use { force: true } only for development
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
