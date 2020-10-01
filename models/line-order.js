//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const LineOrderSchema = Schema({

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    Product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }

});

/*Necesario que sea una funcion normal para obtener el objeto de la misma funcion*/
LineOrderSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('LineOrder', LineOrderSchema);