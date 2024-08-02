// middleware/facebook-passport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../models/');
const { profile } = require('console');

passport.use(new FacebookStrategy({
  clientID: 'client id add here',
  clientSecret: 'client secret add here',
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  enableProof: true,
  profileFields: ['id', 'displayName', 'email'],
},
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
