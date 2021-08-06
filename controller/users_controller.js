const User = require('../models/user');

module.exports.profile = function (req, res) {
  // return res.end('<h1> User Profile</h1>')
  //   return res.render('profile', {
  //     title: 'Profile',
  //   });

  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render('profile', {
          title: 'User Profile',
          user: user,
        });
      } else {
        return res.render('user/sign-in');
      }
    });
  } else {
    return res.render('user/sign-in');
  }
};

// Render the sign up Page
module.exports.signUp = function (req, res) {
  return res.render('user_sign_up', {
    title: 'codeail | Sign Up',
  });
};

// Render Sign in Page

module.exports.signIn = function (req, res) {
  return res.render('user_sign_in', {
    title: 'Codeial | Sign In',
  });
};

// Get sign Up data
module.exports.create = function (req, res) {
  //TODO later
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding the user');
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('Error in creating the user');
          return;
        }
        return res.redirect('/users/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};
//sign In and create a session for user
module.exports.createSession = function (req, res) {
  //TODO later

  //Find the User
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding the user in signing in');
      return;
    }
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect('back');
      }
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
    } else {
      return res.redirect('back');
    }
  });
};
