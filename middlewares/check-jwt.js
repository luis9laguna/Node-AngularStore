//REQUIRED
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

//CODE

//VERIFY JWT USER
const checkJWT = (req, res, next) => {
  
    try{

        const token = req.header('Authorization');

        //VERIFY TOKEN
        if( !token ) {
            return res.status(401).send({
                ok:false,
                message: 'Needed token'
            });
        }

        //GET ID AND ROLE
        const { uid, role } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        req.role = role;

        next();

    }catch(err){
        return res.status(401).send({
            ok:false,
            message: 'Token Invalid'
        });
    }
}

//VERIFY JWT ADMIN
const checkAdmin = async(req, res, next) => {

    const role = req.role;
    
    if(role == "USER_ADMIN"){
        next();
    }else{
        return res.status(401).send({
            ok:false,
            message: 'This user is not an admin'
        });
    }
}


module.exports = {
    checkJWT,
    checkAdmin
}