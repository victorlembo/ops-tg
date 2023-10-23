const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../routes/db');

class UserJob extends Model { }

UserJob.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_job: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'UserJob',
  timestamps: false,
});

module.exports = UserJob;
