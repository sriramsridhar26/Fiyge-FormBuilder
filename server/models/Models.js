const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite')
});
const Users = sequelize.define('Users', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

const Forms = sequelize.define('Forms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    form_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    form_data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'email',
        },
    },
}, {
    timestamps: false,
});

// Associations
Users.hasMany(Forms, { foreignKey: 'user_email', as: 'forms' });
Forms.belongsTo(Users, { foreignKey: 'user_email', as: 'user' });

module.exports = { sequelize, Users, Forms };
