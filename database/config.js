//REQUIRED
const mongoose = require('mongoose');

//CONFIG
mongoose.set('useFindAndModify', false);

//CODE
const dbConnection = async() =>{

    try{
        await mongoose.connect( process.env.DB_CNN, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('Db online');

    }catch(err){
        console.log(err);
        throw new Error('Error in connecting to MongoDB');
    }


}

module.exports = {
    dbConnection
}