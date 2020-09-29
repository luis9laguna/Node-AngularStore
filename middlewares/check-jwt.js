//REQUIRED
const jwt = require('jsonwebtoken');

//CODE
const checkJWT = (req, res, next) => {

    const token = req.header('Authorization');

    if( !token ) {
        return res.status(401).send({
            ok:false,
            message: 'Needed token'
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

    }catch(err){
        return res.status(401).send({
            ok:false,
            message: 'Token Invalid'
        });
    }


    next();
}


module.exports = {
    checkJWT
}