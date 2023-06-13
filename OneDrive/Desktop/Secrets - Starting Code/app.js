//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encryption = require('mongoose-encryption');
const { emit } = require('nodemon');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/userDB');
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

console.log(process.env.API_KEY);

userSchema.plugin(encryption, {secret: process.env.SECRET, encryptedFields: ["password", "email"]});

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res)=> {
    res.render('home');
})

app.get('/login', (req, res)=> {
    res.render('login');
})

app.get('/register', (req, res)=> {
    res.render('register');
})

app.post('/register', (req, res)=> {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })
    newUser.save()
    .then(()=> {
        res.render("secrets");
    })
    .catch((err)=> {
        console.log(err);
    })
})

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username})
    .then((foundUser)=> {
        if(foundUser) {
            if(foundUser.password === password) {
                res.render('secrets');
            } else {
                console.log("Password is not current, Please enter correct password");
            }
        } else {
            console.log("User not found. Please register yourself.");
        }
    })
    .catch((err)=> {
        console.log(err);
    })
})


app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})