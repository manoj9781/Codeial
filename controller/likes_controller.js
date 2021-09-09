const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function (req, res) {
  try {
    //likes/toggle/?id=1232344&type=post

    let likeable;
    let deleted = false;
    if (req.query.type == 'Post') {
      likeable = await Post.findById(req.query.id).populate('likes');
    } else {
      likeable = await Comment.findById(req.query.id).populate('likes');
    }
    // check if a like is already exist or not if exist remove it if not then add it
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existingLike) {
      likeable.likes.push(exixtingLike.id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(Like._id);
      likeable.save();
    }
    return res.json(200, {
      message: 'Added succesfully',
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    console.log('Error', error);
    req.flash('error', 'Unaothorised');
    return res.status(401).send('Unaothorised');
  }
};
