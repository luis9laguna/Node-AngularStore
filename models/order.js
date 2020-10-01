//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const OrderSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    comuna: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    numstreet: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    }

});

/*Necesario que sea una funcion normal para obtener el objeto de la misma funcion*/
OrderSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Order', OrderSchema);