const Post = require('../models/post');
const User = require('../models/user');
  // console.log(req.cookies);
  // res.cookie('id', 27);
  // return res.end("<h1>Server is up for codeial</h1>");

  // Only for posts
  //     Post.find({}, function (err, posts) {
  //         return res.render('home', {
  //             title: "Home",
  //             posts:posts,
  //         });
  //    })

  // For User name and Deatils
//   module.exports.home = function (req, res) {
//   Post.find({})
//     .populate('user')
//     .populate({
//       path: 'comments',
//       populate: {
//         path: 'user',
//       },
//     })
//     .exec(function (err, posts) {
//       User.find({}, function (err, users) {
//         return res.render('home', {
//           title: 'Codeial | Home',
//           posts: posts,
//           all_users:users,
//         });
//       });
     
//     });
// };


module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
	  .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });
    
    let users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users:users
    })
    
  } catch (error) {
    console.log('Error', error);
    return;
  }
}