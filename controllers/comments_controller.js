const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
        post.comments.push(comment);
        post.save();

        res.redirect("/");
      };
    }
  catch (err) {
    console.log(`error in creating a post ${err}`);
    return;
  }
};

module.exports.destroy = (req, res)=>{
  Comment.findById(req.params.id, (err, comment)=>{
    if (comment.user == req.user.id){
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, (err, post)=>{
        return res.redirect('back');
      })
    }else{
      return res.redirect('back');
    }
  })
}