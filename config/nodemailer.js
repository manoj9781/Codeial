const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail',
  port: 587,
  secure: false,
  auth: {
    user: 'manojsinghrana467@gmail.com',
    password: 'Web@1234',
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
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate,
};
