//REQUIRED
const Product = require('../models/product');

//CODE

//GET
const getProduct = async (req, res) => {

    try{

        const products = await Product.find({ "available": true }).sort('name');
    
        res.json({
            ok: true,
            products
        });

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Unexpected Error"
        });
    }
}

//GET BY ID
const getProductByID = async (req, res) => {
    
    try{
        
        const uid = req.params.id;
        const product = await Product.findById(uid)
                                    .populate("category", "name image");
    
        res.json({
            ok: true,
            product
        });
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Unexpected Error"
        });
    }
}

//CREATE
const createProduct = async (req, res) => {

    try {
        
        const { name } = req.body;
        const existProduct = await Product.findOne({name});

        //VERIFY PRODUCT
        if(existProduct){
            return res.status(400).json({
                ok:false,
                message: "This product already exists."
            });
        }

        const product = new Product(req.body);

        //SAVE PRODUCT
        await product.save();

        res.json({
            ok: true,
            product
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Unexpected Error"
        });

    }
}

//UPDATE    
const updateProduct = async (req, res) => {

    try{

        const uid = req.params.id;
        const productDB = await Product.findById( uid );

        //VERIFY PRODUCT
        if(!productDB){
            return res.status(404).json({
                ok: false,
                message: "Product not found"
            });
        }

        //UPDATE PRODUCT
        const { __v, ...field } = req.body;
        const productUpdate = await Product.findByIdAndUpdate( uid, field, { new : true } );
        
        res.json({
            ok:true,
            product: productUpdate
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });
    }
}

//DELETE 
const deleteProduct = async (req, res) => {

    try{

        const uid = req.params.id;
        const ProductDB = await Product.findById( uid );

        //VERIFY PRODUCT
        if(!ProductDB){
            return res.status(404).json({
                ok: false,
                message: "Product not found"
            });
        }
        
        //DELETE PRODUCT
        ProductDB.available = false;
        await Product.findByIdAndUpdate( uid, ProductDB );
        
        res.json({
            ok:true,
            message: "Product deleted"
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });
    }
}

//DELETE DEFINITY
const deleteDefinityProduct = async (req, res) => {

    try{

        const uid = req.params.id;
        const ProductDB = await Product.findById( uid );

        //VERIFY PRODUCT
        if(!ProductDB){
            return res.status(404).json({
                ok: false,
                message: "Product not found"
            });
        }
        
        //DELETE PRODUCT
        await Product.findByIdAndDelete( uid );
        
        res.json({
            ok:true,
            message: "Product definity deleted"
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            message: "Error Unexpected, check logs"
        });
    }
}


module.exports = {
    getProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteDefinityProduct
    
}