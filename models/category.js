//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const CategorySchema = Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }

}, { collection: "categories" });

/*Necesario que sea una funcion normal para obtener el objeto de la misma funcion*/
CategorySchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Category', CategorySchema);