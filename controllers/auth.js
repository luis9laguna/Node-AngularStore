//REQUIRED
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');

//CODE
const login = async(req, res) => {

    const { email, password } = req.body

    try{

        const userDB = await User.findOne({email});

        //VERIFY EMAIL
        if(!userDB){
            return res.status(404).json({
                ok:false,
                message:"Email not found."
            });
        }

        //VERIFY PASSWORD
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message:"Invalid password"
            });
        }

        //GENERATE TOKEN
        const token = await generatorJWT( userDB.id )

        res.json({
            ok: true,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Error Unexpected, check logs"
        })
    }
}




module.exports = {
    login
}