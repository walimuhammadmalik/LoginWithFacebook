// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fb', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
