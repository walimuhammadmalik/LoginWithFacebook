// server.js
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const passport = require('./middleware/passport');
const facebookPassport = require("./middleware/facebook-passport");
// const userRouter = require('./routes/userRouter');
const authRouter = require("./routes/authRouter");
require("./models/index");
const User = require("./models/userModel"); // Import the User model

const app = express();

app.use(bodyParser.json());
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(
  session({
    secret: "your_secret_key",
    name: "facebook-auth-session",
    keys: ["key1", "key2"],
  })
);

// app.use(passport.initialize());
// app.use(passport.session());
app.use(facebookPassport.initialize());
app.use(facebookPassport.session());

// app.use('/user', userRouter);
app.use("/auth", authRouter);
const PORT = process.env.PORT || 8080;

// Sync all models with the database and start the server
// sequelize.sync({ force: false })  // 'force: true' drops the table if it already exists
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
