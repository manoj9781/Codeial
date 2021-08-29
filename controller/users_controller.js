const User = require('../models/user');
const path = require('path');
const fs = require('path');

module.exports.profile = function (req, res) {
  // return res.end('<h1> User Profile</h1>')
  User.findById(req.params.id, function (err, user) {
    return res.render('profile', {
      title: 'Profile',
      profile_user:user
    });
  })
};

module.exports.update = async function (req, res) {
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('****Multer Error****');
                }
//                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
//                       fs.unbind(path.join(__dirname,'..', user.avatar));
                    }
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(error){
            req.flash('error', error);
            return res.redirect('back');
        }
    }
    else{
         req.flash('error', 'Unaothorised')
         return res.status(401).send('Unaothorised');
    }
    
    
}

// Render the sign up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    title: 'codeial | Sign Up',
  });
};

// Render Sign in Page

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
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

  req.flash('success', 'Logged in Succesfully');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'Sign out Succesfully');

  return res.redirect('/');
}





  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (user) {
  //       return res.render('profile', {
  //         title: 'User Profile',
  //         user: user,
  //       });
  //     }
  //     else {
  //       return res.redirect('/users/sign-in');
  //    }
  //   });
  // }
  // else {
  //   return res.redirect('/users/sign-in');
  // }


  /* Find the User
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
  */



//  if (req.user.id == req.params.id) {
//    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
//      return res.redirect('back');
//    });
//  }
//  else {
//    req.flash('error', 'Unaothorised')
//    return res.status(401).send('unAothorized');
//  }