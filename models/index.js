const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

console.log("index.js");
try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}



const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, DataTypes);

// db.user.findOrCreate({
//     where: { facebookId: user.facebookId },
//     defaults: {
//         name: user.name,
//         email: user.email,
//         facebookId: user.facebookId,
//     },
// });


db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});
console.log("model index.js");



module.exports = db;
