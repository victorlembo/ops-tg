const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../routes/db'); 

class Job extends Model {}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  budget: DataTypes.FLOAT,
  skills: DataTypes.STRING,
  location: DataTypes.STRING,
  deadline: DataTypes.DATE,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Job',
  timestamps: false, // Você pode ajustar isso conforme necessário
});

module.exports = Job;
