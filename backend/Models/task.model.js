import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.model.js'; // Import the User model

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  planType: {
    type: DataTypes.ENUM('week', 'month', 'year'),
    allowNull: false
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completionStatus: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

// Set up the relationship
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks'
});
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export default Task;
