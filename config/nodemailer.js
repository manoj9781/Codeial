const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'manoj11807576@gmail.com',
    pass: 'Manoj@9781'
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('Error in rendering a template file', err);
        return;
      }
      mailHTML = template;
    }
    );
    return mailHTML;
};

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate,
};
