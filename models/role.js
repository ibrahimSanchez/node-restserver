const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING
    }
});


module.exports = { Role };