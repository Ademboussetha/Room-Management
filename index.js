"use strict";
const express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs')
const mysql= require('mysql');

const session=require('express-session');
const passport= require('passport');
const { check, validationResult } = require('express-validator');
const cheerio=require('cheerio');
const app = express();
const routes = require('./routes/routes');
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('public'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(cookieParser());
var FileStore = require('session-file-store')(session);
var cbor = require('cbor-sync');
app.use(session({
    store: new FileStore,
    secret:'zzeojfopzejfpojz',
    resave: false,
    saveUninitialized:false,
    fileExtension: '.cbor',
    encoding: null,
    encoder: cbor.encode,
    decoder: cbor.decode
    //cookie:{secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());

var db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"departement"
});
db.connect((err) => {
    if (!err) {
        console.log("connected");
    }
    else{
        console.log("connection failed");
    }
});
global.db=db;
app.use('/',routes);


module.exports=app;

