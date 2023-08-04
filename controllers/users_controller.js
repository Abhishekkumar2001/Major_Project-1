const User = require("../models/user");
const fs = require('fs');
const path = require('path');

// let's keep it same  as before
module.exports.profile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("*******Multer Error: ", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {


            if(user.avatar){
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
            }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};
// Render the Sign Up Page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Major Project | Sign Up",
  });
};

// Render the Sign In Page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Major Project | Sign In",
  });
};

// get the sign up data
module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

// Sign In and Create a session for the user
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in Successfully!");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");
    return res.redirect("/");
  });
};
