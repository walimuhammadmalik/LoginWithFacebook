// middleware/facebook-passport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../models/');
const { profile } = require('console');

passport.use(new FacebookStrategy({
  clientID: '718449097073996',
  clientSecret: '174e9dcc13b6145288a56dde7c1f123a',
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  enableProof: true,
  profileFields: ['id', 'displayName', 'email'],
},
  // async (accessToken, refreshToken, profile, done) => {
  //   try {
  //     let user = await db.user.findOne({ where: { facebookId: profile.id } });

  //     if (!user) {
  //       user = await db.user.create({
  //         facebookId: profile.id,
  //         name: profile.displayName,
  //         email: profile.emails[0].value // Assuming the profile has an email field

  //       });
  //     }
  //     return done(null, user);
  //   } catch (err) {
  //     return done(err, false);
  //   }
  // }

  // function (accessToken, refreshToken, profile, cb) {
  //   db.user.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //     console.log("User: ", user);
  //     return cb(err, user);
  //   });
  // }

  async function (accessToken, refreshToken, profile, cb) {
    try {
      console.log("Profile: ", profile);
      const [user, created] = await db.user.findOrCreate({
        where: { facebookId: profile.id },
        defaults: {
          name: profile.displayName,
          // email: profile.emails[0].value,
          email: profile.emails ? profile.emails[0].value : null,
          facebookId: profile.id,
        }
      });
      console.log("User: a", user);
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  }
));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
