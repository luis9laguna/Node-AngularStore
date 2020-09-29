//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { checkParams } = require('../middlewares/check-params');

//CODE
const router = Router();

//POST
router.post('/',
    [
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        checkParams
    ],checkParams,
    login);


module.exports = router;