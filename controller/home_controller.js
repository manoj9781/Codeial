module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('id', 27);
    return res.render('home', {
        title: "Home",
    });
    // return res.end("<h1>Server is up for codeial</h1>");
};