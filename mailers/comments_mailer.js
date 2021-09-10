const nodemailer = require('../config/nodemailer');

// This is the another way to exporting the method

exports.newComment = (comment) => {
    // console.log('inside the comment mailer', comment);
    let htmlString = nodemailer.renderTemplate({
        comment: comment,
    }, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'manoj11807576@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString,
    }, (err, info) => { 
        if (err) {
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
};