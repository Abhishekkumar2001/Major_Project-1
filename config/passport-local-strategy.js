const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      // find a user and establish the identity
      try {
        let user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("error in signin", err);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser( (user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);

    return done(null, user);
  } catch (err) {
    console.log("error in deserialize", err);
  }
});

// check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
