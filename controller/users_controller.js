module.exports.profile = function (req, res) {
    // return res.end('<h1> User Profile</h1>')
    return res.render('profile', {
        title: "Profile"
    });
};


// Render the sign up Page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "codeail | Sign Up",
    });
};

// Render Sign in Page

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

// Get sign Up data
module.exports.create = function (req, res) {
    //TODO later
}
//sign In
module.exports.createSession = function (req, res) {
    //TODO later
}