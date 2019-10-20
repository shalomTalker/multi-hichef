const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
// const passportConf = require('../services/passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/authController');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.signupSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signinSchema), passportSignIn, UsersController.signIn);

router.route('/confirmation/:token')
  .get(UsersController.confirmation);

router.route('/resend')
  .post(passportJWT,UsersController.resendToken);

router.route('/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

router.route('/link/google')
  .post(passportJWT, passport.authorize('googleToken', { session: false }), UsersController.linkGoogle)

router.route('/unlink/google')
  .post(passportJWT, UsersController.unlinkGoogle);

router.route('/link/facebook')
  .post(passportJWT, passport.authorize('facebookToken', { session: false }), UsersController.linkFacebook)

router.route('/unlink/facebook')
  .post(passportJWT, UsersController.unlinkFacebook);

router.route('/dashboard')
  .get(passportJWT, UsersController.dashboard);

router.route('/status')
  .get(passportJWT, UsersController.checkAuth);

router.route('/signout')
  .get(passportJWT, UsersController.signOut);
  
module.exports = router;