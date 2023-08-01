const Post = require("../models/post");
const User = require('../models/user');

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

      User.find({}, (err, users)=>{
        return res.render("home", {
          title: "Major Project | Home",
          posts: posts,
          all_users: users
        });
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
