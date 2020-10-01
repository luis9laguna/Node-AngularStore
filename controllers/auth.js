//REQUIRED
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const { generatorJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

//CODE
const login = async(req, res) => {

    try{
        
        const { email, password } = req.body
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
        const token = await generatorJWT( userDB.id, userDB.role )

        res.json({
            ok: true,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Error Unexpected, check logs"
        });
    }
}


const googleSignIn = async (req, res) => {

    try{

        const tokenGoogle = req.body.token;
        const { name, email } = await googleVerify( tokenGoogle );
        const UserDB = await User.findOne({ email });

        let user;

        //VERIFY USER
        if ( !UserDB ){
            user = new User({
                name,
                email,
                password: '@@@',
                google: true
            });
        }else{
            user = UserDB;
            user.google = true;
        }

        //SAVE USER
        await user.save();

        //GENERATE TOKEN
        const token = await generatorJWT( user.id, user.role )
    
        res.json({
            ok: true,
            token
        });

    }catch(err){

        res.status(401).json({
            ok: false,
            message: "Token Invalid"
        })

    }

}




module.exports = {
    login, googleSignIn
}