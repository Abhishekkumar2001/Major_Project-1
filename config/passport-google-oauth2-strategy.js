const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const User = require("../models/user");


// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "927543317430-a68jeqjgtpkkdlam0arm4mf803lfbbiu.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        // find a user
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if (user) {
            // if found, set this user as req.user
          return done(null, user);
        } else {
            // if not found, create a user and set it as  req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
