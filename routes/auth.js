//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');

//FUNCTIONS
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { checkParams } = require('../middlewares/check-params');
const { checkJWT } = require('../middlewares/check-jwt');

//CODE
const router = Router();

//STANDARD
router.post('/',
    [
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        checkParams
    ],
    login);


//GOOGLE
router.post('/google',
    [
        check('token', 'Token is required').not().isEmpty(),
        checkParams
    ],
    googleSignIn);

//GET INFO OF TOKEN
router.get( '/renew', checkJWT, renewToken);


module.exports = router;