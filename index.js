const express = require ('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json(), function (err, req, res, next) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://jibranyousuf:mongodb786@ds044689.mlab.com:44689/ehospital');

 Authentication = require('./models/authentication.js');
 Multiply = require('./models/multiply.js');

app.get('/', (req,res) => {
         console.log('req arrived')
         res.send('Jibran is here')
});

app.post('/api/signup', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
    var AuthData = new Authentication(userData);
    AuthData.save(function (err, getData) {
        if (!err) {
            console.log("You have signed up Successfully: Welcome", getData.username)
            return res.status(200).send(getData);
        } else {
            console.log("Err", err)
            return res.status(500).send(err);
        }
    })
})

app.post('/api/login', function (req, res) {
    Authentication.findOne({ email: req.body.email }, function (err, email) {
        if (err) {
            console.log("email err", err)
            return res.status(500).send(err)
            // return err
        }
        if (!email) {
            console.log("email 404 err")
            return res.status(404).send()
        }

            Authentication.findOne({ password: req.body.password }, function (err, get) {
                if (err) {
                    console.log("get", err)
                    return res.status(500).send(err)
                }
                if (!get) {
                    return res.status(404).send()
                }
                console.log("You are Successfully Logged In: Welcome ", get.username)
                return res.status(200).send(get.username)
            })
    });
});

app.post('/api/multiply', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    num1= req.body.num1
    num2= req.body.num2
    console.log("Hello Sir Zohaib your answer is ", num1*num2)
    // return response.send("Hello sir Zohaib your answer is ", num1*num2);
})

app.listen(3000,() => console.log('app is running on 3000 :)'))