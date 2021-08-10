const express = require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../controller/users_controller');

router.get('/profile',passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);
//Use passport as a middle were to auth eticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), userController.createSession);


module.exports = router;