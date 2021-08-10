const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;
const User = require('../models/user');


// Authentication using passport js
passport.use(new LocalStartegy({
    usernameField: 'email'
},
    function (email, password, done) {
        // Find a user and establish the idenatity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error in finding the User ---> Passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invalid Username/Password");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

/* Serialize the user to decide 
   which key is kept in the cookies
*/

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

/*
Deserialize the user form the key 
in the cookies 
*/

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding the User ---> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

// Check if the user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // If the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthencticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user fron the session cookie 
        // we are just sending this to locals from the views
        res.locals.user = req.user;
    } 
    next(); 
}


module.exports = passport;