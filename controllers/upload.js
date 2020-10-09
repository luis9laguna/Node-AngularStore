//REQUIRED
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

//FUNCTIONS
const { updateImage } = require('../helpers/update-image');

//CODE
const router = Router();

//UPLOAD IMAGE
const upload = async (req, res) => {

    const id = req.params.id;
    const collection = req.params.collection;
    const validCollections = ['product', 'category']; 

    //VERIFY COLLECTION
    if ( !validCollections.includes( collection ) ) {
        return res.status(400).json({
            ok: false,
            message: "I need a valid collection"
        });
    }
    //VERIFY FILES
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: true,
            message: "No files were uploaded."
        });

    }

    const file = req.files.image;
    const fileparts = file.name.split(".");
    const extension = fileparts[fileparts.length - 1];
    const validExtensions = ['png', 'jpeg', 'jpg', 'gif'];

    //VERIFY EXTENSION
    if (!validExtensions.includes(extension)) {
        res.status(400).json({
            ok: false,
            msg: "The extension has to be one of: " + validExtensions
        });
    }

    const namefile = `${ uuidv4() }.${ extension }`
    const path = `./uploads/${ collection }/${ namefile }`;

    //MOVING FILE
    file.mv( path , (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: "The image no was moved successfully."
          });
        }

        //UPDATE IMAGE
        updateImage( collection, id, namefile );
    
        res.json({
            ok: true,
            message: "The image was moved successfully upload",
            namefile
        });
    });

}

//GET IMAGE
const getImage = async (req, res) => {

    const collection = req.params.collection;
    const image = req.params.image;
    const pathImage = path.join( __dirname, `../uploads/${collection}/${image}` );

    if( fs.existsSync(pathImage) ) {
        res.sendFile( pathImage );
    }else{
    const pathImage = path.join( __dirname, '../uploads/noimage.jpg' );
    res.sendFile( pathImage );
    }


}




module.exports = { upload, getImage };