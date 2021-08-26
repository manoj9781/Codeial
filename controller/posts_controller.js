const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.create = function (req, res) {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id,
//     }, function (err, post) {
//         if (err) {
//             console.log("Error in creating the post");
//             return;
//         }
//         return res.redirect('back');
//     });
// };

module.exports.create = async function (req, res) {
  try {
   let post =  await Post.create({
      content: req.body.content,
      user: req.user.id,
   });
	  
	  if (req.xhr) {
		  return res.status(200).json({
			  data: {
				  post: post
			  },
			  message: 'Post Created',
		  });
	  }
	 
    req.flash('success', 'Post Published!');
    return res.redirect('back');
  } catch (error) {
    // console.log('Error', error);
    req.flash('error', err);
    return res.redirect('back');
  }
};

// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         // .id means converting the object id into string
//         if (post.user == req.user.id) {
//             post.remove();
//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         }
//         else {
//             return res.redirect('back');
//         }
//     });
// };

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
		
		if(req.xhr){
			return res.status(200).json({
				data:{
					post_id:req.params.id
				},
				message:"Post Deleted"
			})
		}
		
      req.flash('success', 'Post and associasted comments deleted');
      return res.redirect('back');
    } else {
      req.flash('success', 'You are not authorised to delete the post');
      return res.redirect('back');
    }
  } catch (error) {
    // req.flash('error', err);
    console.log('Error', error);
    return;
  }
};
