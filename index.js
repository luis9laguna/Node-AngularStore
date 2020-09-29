//REQUIRED
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//SERVER
const app = express();

//CORS
app.use(cors());

//READ BODY 
app.use( express.json() );

//DATABASE
dbConnection();

//ROUTES
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/auth'));
 
//LISTEN
app.listen( process.env.PORT, () => {
    console.log('Server in ' +  process.env.PORT);
});