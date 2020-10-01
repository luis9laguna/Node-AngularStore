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
app.use('/api/category', require('./routes/category'));
app.use('/api/product', require('./routes/product'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/search', require('./routes/search'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/order', require('./routes/order'));
 
//LISTEN
app.listen( process.env.PORT, () => {
    console.log('Server in ' +  process.env.PORT);
});