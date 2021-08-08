const passport = require('passport');
const LocalStartegy = require('passport-local');
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
        return dine(null, user);
    });
});


module.exports = passport;