const nodemailer = require('../config/nodemailer');

// This is the another way to exporting the method

exports.newComment = (comment) => {
    console.log('inside the comment mailer', comment);
    nodemailer.transporter.sendMail({
        from: 'manoj11807576@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1> new Comment</h1>',
    }, (err, info) => { 
        if (err) {
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
};