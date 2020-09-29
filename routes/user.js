//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');
const { checkParams } = require('../middlewares/check-params');

//FUNCTIONS
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user');
const { checkJWT } = require('../middlewares/check-jwt');

//CODE
const router = Router();

//GET
router.get('/', checkJWT , getUser);

//POST
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        checkParams
    ], 
    createUser);

//PUT
router.put('/:id',
    [
        checkJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        checkParams
    ], 
    updateUser);

//DELETE
router.delete('/:id', checkJWT, deleteUser);



module.exports = router;