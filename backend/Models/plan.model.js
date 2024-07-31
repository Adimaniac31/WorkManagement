import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './user.model.js'; // Import the User model

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  planName:{
    type: DataTypes.STRING
  },
  planType: {
    type: DataTypes.ENUM('week', 'month'),
    allowNull: false
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
  tableName: 'plans',
  timestamps: true
});

// Set up the relationship
User.hasMany(Plan, {
  foreignKey: 'userId',
  as: 'plans'
});
Plan.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export default Plan;
