const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    });

  return res.status(200).json({
    message: 'List of Posts',
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({
        post: req.params.id,
      });
      return res.status(200).json({
        message: 'post and Comments deleted',
      });
    } else {
      return res.json(401, {
        message: 'you cannot delete this post',
      });
    }
  } catch (error) {
    console.log('*******', error);
    return res.sttaus(500).json({
      message: 'internal Server Error',
    });
  }
};

// module.exports.destroy = async function (req, res) {
//   try {
//     let post = await Post.findById(req.params.id);

//     // if (post.user == req.user.id){
//     post.remove();

//     await Comment.deleteMany({ post: req.params.id });

//     return res.status(200).json({
//       message: 'Posts and  comments deleted',
//     });
//     // if (req.xhr){
//     //     return res.status(200).json({
//     //         data: {
//     //             post_id: req.params.id
//     //         },
//     //         message: "Post deleted"
//     //     });
//     // }

//     // req.flash('success', 'Post and associated comments deleted!');

//     //     return res.redirect('back');
//     // }else{
//     //     req.flash('error', 'You cannot delete this post!');
//     //     return res.redirect('back');
//     // }
//   } catch (err) {
//     // req.flash('error', err);
//     // return res.redirect('back');
// 	  console.log('***********',err)
//     return res.status(500).json({
//       message: 'internal Server error',
//     });
//   }
// };
