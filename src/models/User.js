const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../routes/db');

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_image: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false, // Você pode ajustar isso conforme necessário
});

module.exports = User;
