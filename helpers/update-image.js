//REQUIRED
const fs = require('fs');

const Category = require('../models/category');
const Product = require('../models/product');

//CODE

const updateImage = async ( collection, id, namefile ) => {

    let oldPath = "";

    switch (collection) {
        case 'product':

            const product = await Product.findById(id);
            if (!product) {
                return false;
            }

            oldPath = `./uploads/product/${ product.image }`;
            //ELIMINATED OLD IMAGE
            if( fs.existsSync( oldPath ) ) {
                fs.unlinkSync( oldPath );
            }

            product.image = namefile;

            //SAVE IMAGE
            await product.save();
            return true;

        break;

        case 'category':
            
            const category = await Category.findById(id);

            if (!category) {
                return false;
            }

            oldPath = `./uploads/category/${ category.image }`;
            //ELIMINATED OLD IMAGE
            if( fs.existsSync( oldPath ) ) {
                fs.unlinkSync( oldPath );
            }

            category.image = namefile;

            //SAVE IMAGE
            await category.save();
            return true;
    
        break;
    }
}



module.exports = {
    updateImage
}