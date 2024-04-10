const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);


const User = sequelize.define("user", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // validate: {
        //     len: [8, 16]
        // }
    },

    image: {
        type: DataTypes.STRING(100),
        // allowNull: false,
    },

    role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isIn: [['ADMIN_ROLE', 'USER_ROLE']]
        }
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Crear la tabla
// (async () => {
//     await User.sync({force: true});
// })();


User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    delete values.updatedAt;
    delete values.createdAt;
    return values;
};



module.exports = { User }; 