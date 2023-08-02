const Post = require("../models/post");
const User = require("../models/user");

// populate the user of each post
module.exports.home = async (req, res) => {
  try {
    // populate the user of each post
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    const users = await User.find({});
    return res.render("home", {
      title: "Major Project | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log('Error',err);
    return;
  }
};
