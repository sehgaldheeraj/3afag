const passport = require("passport");
const LocalStrategy = require("passport-local");
//const GoogleStrategy = require("passport-google");
//configuring strategy
passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err); //Server side error - 500
      }
      if (!user) {
        return done(null, false); //Not found - 404
      }
      if (!user.verifyPassword(password)) {
        //Bad Creds - 401
        return done(null, false);
      }
      return done(null, user); //Success - 200
    });
  })
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
module.exports = passport;
