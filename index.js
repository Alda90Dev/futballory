const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

//  Express App
const app = express();

// Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use(express.static(publicPath));


app.listen( process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server running in port!!', process.env.PORT);    
});