//REQUIRED
const { Router } = require('express');
const fileUpload = require('express-fileupload');

//FUNCTIONS
const { checkJWT, checkAdmin } = require('../middlewares/check-jwt');
const { upload, getImage } = require('../controllers/upload');


//CODE
const router = Router();
router.use(fileUpload());

//ROUTES
router.post('/:collection/:id',[ checkJWT, checkAdmin ], upload);
router.get('/:collection/:image', getImage);



module.exports = router;