const express = require('express');
const mongoose = require('mongoose');
const signupRoute = require('./Routes/Signup')
const loginRoute = require('./Routes/Login')
const path = require('path')
const URI = "mongodb+srv://SDEProject:8r8adgp7sb@usictdb.eztt7.mongodb.net/USICT?retryWrites=true&w=majority";


//Connecting to the Database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to USICTDB")
});

//Server Initialisation
const app = express();

//Middlewares
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});

//Imported Routes
app.use('/', signupRoute);
app.use('/', loginRoute);
//Default Routes
app.get('/default', (req, res) => {
    res.send(JSON.stringify({ success: true, code: 200, response: { message: "Server Up and Running" } }));
})



//Listening to the Server
app.listen(process.env.PORT || 7000);