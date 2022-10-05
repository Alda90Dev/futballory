const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

//  Express App
const app = express();


//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept, Credentials');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Body reading and parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

// Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use(express.static(publicPath));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stadium', require('./routes/stadium'));
app.use('/api/confederation', require('./routes/confederation'));

app.listen( process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server running in port!!', process.env.PORT);    
});