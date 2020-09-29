//REQUIRED
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

//CODE

//GET
const getUser = async(req, res) =>{

    const user = await User.find();

    res.json({
        ok: true,
        user,
        uid: req.uid
    });
}

//CREATE
const createUser = async(req, res) => {

    const { email, password } = req.body;
    
    try{

        const existEmail = await User.findOne({email});

        //VERIFY EMAIL
        if(existEmail){
            return res.status(400).json({
                ok:false,
                message: "This email already exists."
            });
        }

        const user = User(req.body);

        //ENCRYPT
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //SAVE USER
        await user.save();
        
        res.json({
            ok: true,
            user
        });
        
    } catch(err){

        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });

    }
}

//UPDATE    
const updateUser = async (req, res) =>{

    const uid = req.params.id;

    try{

        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(404).json({
                ok: false,
                message: "User not found"
            })
        }

        const {password, google, ...field} = req.body;
        const userUpdate = await User.findByIdAndUpdate( uid, field, { new : true } );
        
        res.json({
            ok:true,
            user: userUpdate
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });
    }
}

//DELETE
const deleteUser = async (req, res) => {

    const uid = req.params.id;
        
    try{

        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(404).json({
                ok: false,
                message: "User not found"
            })
        }

        await User.findByIdAndDelete( uid );
        
        res.json({
            ok:true,
            message: "User deleted"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });
    }
}


module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}