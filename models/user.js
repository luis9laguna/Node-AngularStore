//REQUIRED
const { Schema, model } = require('mongoose');

//CODE
const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

});

/*Necesario que sea una funcion normal para obtener el objeto de la misma funcion*/
UserSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);