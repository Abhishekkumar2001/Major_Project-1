const Post = require("../models/post");

// populate the user of each post
module.exports.home = (req, res) => {
  Post.find({})
    .populate("user")
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .exec((err, posts) => {
      return res.render("home", {
        title: "Major Project | Home",
        posts: posts,
      });
    });

  // Post.find({}, (err, posts)=> {
  //     return res.render('home', {
  //         title: "Major Project | Home",
  //         posts: posts
  //     });
  // });
  // return res.end('<h1>Express is up for Major Project.</h1>')
};
