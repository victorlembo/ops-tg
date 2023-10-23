const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../routes/db');

class Role extends Model { }

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
});

module.exports = Role;