
const Post = require('../models/post');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('id', 27);
    Post.find({}, function (err, posts) {
        return res.render('home', {
            title: "Home",
            posts:posts,
        });
   })
    // return res.end("<h1>Server is up for codeial</h1>");
};