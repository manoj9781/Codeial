const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.josn(422, {
        message: 'Invalid Username or Pasword',
      });
    }
    return res.json(200, {
      message: 'Sign inSuccesful, here is your token, please keep it safe',
      data: {
        token: jwt.sign(user.toJSON(), 'codeial', {
          expiresIn: '100000',
        }),
      },
    });
  } catch (error) {
    console.log('****', err);
    return res.json(500, {
      message: 'Internal server Error',
    });
  }
};
