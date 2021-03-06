const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require("path");

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app =  express();

//body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB

mongoose
.connect(db)
.then(()=>console.log("Connected to MongoDB"))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);


//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//port
const port =  process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); 