//REQUIRED
const Category = require('../models/category');

//CODE

//GET
const getCategory = async (req, res) => {

    try{

        const categories = await Category.find().sort('name');
    
        res.json({
            ok: true,
            categories
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
const getCategoryByID = async (req, res) => {
    
    try{
        
        const uid = req.params.id;
        const category = await Category.findById(uid);
    
        res.json({
            ok: true,
            category
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
const createCategory = async (req, res) => {

    try {
        
        const { name } = req.body;
        const existCategory = await Category.findOne({name});

        //VERIFY CATEGORY
        if(existCategory){
            return res.status(400).json({
                ok:false,
                message: "This Category already exists."
            });
        }

        const category = new Category(req.body);

        //SAVE CATEGORY
        await category.save();

        res.json({
            ok: true,
            category
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
const updateCategory = async (req, res) => {

    try{

        const uid = req.params.id;
        const userDB = await Category.findById( uid );

        //VERIFY CATEGORY
        if(!userDB){
            return res.status(404).json({
                ok: false,
                message: "Category not found"
            });
        }

        //UPDATE CATEGORY
        const { __v, ...field } = req.body;
        const categoryUpdate = await Category.findByIdAndUpdate( uid, field, { new : true } );
        
        res.json({
            ok:true,
            category: categoryUpdate
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
const deleteCategory = async (req, res) => {

    try{
        
        const uid = req.params.id;
        const CategoryDB = await Category.findById( uid );

        //VERIFY CATEGORY
        if(!CategoryDB){
            return res.status(404).json({
                ok: false,
                message: "Category not found"
            });
        }
        
        //DELETE CATEGORY
        await Category.findByIdAndDelete( uid );
        
        res.json({
            ok:true,
            message: "Category deleted"
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
    getCategory,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory
}