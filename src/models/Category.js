const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../routes/db'); 

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'category', 
  modelName: 'Category',
  timestamps: false, 
});

module.exports = Category;

