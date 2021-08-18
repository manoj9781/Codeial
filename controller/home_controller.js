const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function (req, res) {
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

  Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render('home', {
          title: 'Codeial | Home',
          posts: posts,
          all_users:users,
        });
      });
     
    });
};
