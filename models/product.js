const { Sequelize, DataTypes, STRING, BOOLEAN } = require("sequelize");
const { User } = require("./user");
const { Category } = require("./category");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    description: { type: STRING },

    available: {
        type: BOOLEAN,
        defaultValue: true
    },

    image: {
        type: DataTypes.STRING
        // allowNull: false,
    },

});

// Relacion con otras tablas
Product.belongsTo(User, { foreignKey: 'userId' });

Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Crear la tabla
// (async () => {
//     await Product.sync({ force: true });
// })();


Product.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    // delete values.id;
    return values;
};



module.exports = { Product };