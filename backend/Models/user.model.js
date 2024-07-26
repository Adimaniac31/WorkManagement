import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  charName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255]
    }
    },
    feeling: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latestSignIn:{
      type: DataTypes.DATE,
      allowNull: True
    }
}, {
  tableName: 'users',
  timestamps: true
});

export default User;
