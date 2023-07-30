const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id
    },
    (post, err) => {
      if (err) {
        console.log(`error in creating a post ${err}`);
        return;
      }
      return res.redirect("back");
    }
  );
};
