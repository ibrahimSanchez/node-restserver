const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }

});

Category.belongsTo(User, {
    foreignKey: 'userId'
});



Category.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    return values;
};


// Crear la tabla
// (async () => {
//     await Category.sync({force: true});
// })();



module.exports = { Category };