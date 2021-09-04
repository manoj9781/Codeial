const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


// Tell Passport to use Google Strategy
passport.use(
  new googleStrategy({
    clientID:
      '503879458233-f396m4ocrc7lt405pvb157b1u1scg4ai.apps.googleusercontent.com',
    clientSecret: '4xu4o7f3dkciHXOkLnvt07fI',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
  }, function (accessToken, refreshToken, profile, done) {
      User.findOne({
          email: profile.email[0].value
      }).exec(function (err, user) {
          if (err) {
              console.log('Error in find the User', err);
              return;
          }
          console.log(profile);
          if (user) {
              return done(null, user);
          }
          else {
              User.create({
                  name: profile.display,
                  email: profile.email[0].value,
                  password: crypto.randomBytes(20).toString('hex'),
              }, function (err, user) {
                  if (err) {
                      console.log('Error in creating the user', err);
                      return;
                  }
                  return done(null, user);
              });
          }
      });
  })
);

module.exports = passport;