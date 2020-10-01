//REQUIRED
const { Router } = require('express');
const { check } = require('express-validator');

//FUNCTIONS
const { checkParams } = require('../middlewares/check-params');
const { getProduct, getProductByID, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { checkJWT, checkAdmin } = require('../middlewares/check-jwt');

//CODE
const router = Router();

//GET
router.get('/', getProduct);

//GET BY ID
router.get('/:id', getProductByID);

//POST
router.post('/',
    [ checkJWT, checkAdmin,
        check('name', 'Name is required').not().isEmpty(),
        check('category', 'Category is required').isMongoId(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('stock', 'Stock is required').not().isEmpty(),
        checkParams
    ], 
    createProduct);

//PUT
router.put('/:id',
    [ checkJWT, checkAdmin ], 
    updateProduct);

//DELETE
router.delete('/:id', [checkJWT, checkAdmin], deleteProduct);



module.exports = router;