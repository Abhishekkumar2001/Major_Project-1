const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (err) {
    console.log(`error in creating a post ${err}`);
    return;
  }
};

module.exports.destroy = (req, res)=>{
  Post.findById(req.params.id,(err, post)=>{
  // .id means convorting the object id into string
    if(post.user == req.user.id){
      post.remove();

      Comment.deleteMany({post: req.params.id}, (err)=>{
        return res.redirect('back');
      });
    }else{
      return res.redirect('back');
    }
  });
}