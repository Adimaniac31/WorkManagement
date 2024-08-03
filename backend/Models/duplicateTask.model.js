import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Task from './task.model.js'; // Import the Task model

const DuplicateTask = sequelize.define('DuplicateTask', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY, // Stores only the date (YYYY-MM-DD)
    allowNull: false
  },
  completionStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'id'
    }
  }
}, {
  tableName: 'duplicate_tasks',
  timestamps: true
});

// Set up the relationship
Task.hasMany(DuplicateTask, {
  foreignKey: 'taskId',
  as: 'duplicateTasks'
});
DuplicateTask.belongsTo(Task, {
  foreignKey: 'taskId',
  as: 'task'
});

export default DuplicateTask;
