import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import Plan from './plan.model.js'; // Import the Plan model

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  taskType: {
    type: DataTypes.ENUM('daily','week'),
    allowNull: false
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completionStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
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
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Plan,
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

// Set up the relationship
Plan.hasMany(Task, {
  foreignKey: 'planId',
  as: 'tasks'
});
Task.belongsTo(Plan, {
  foreignKey: 'planId',
  as: 'plan'
});

export default Task;

