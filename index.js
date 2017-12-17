const express = require ('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var request = require('request');
var http = require("http");
var https = require("https");
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
 DoctorProfile = require('./models/doctorprofile.js');

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
    created_date: req.body.date,
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
app.post('/api/drsignup', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    var DrUserData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
    created_date: req.body.date,
    birthday: req.body.birthday,
    gender: req.body.gender,
    maritalstatus: req.body.maritalstatus,
  }
    var AuthData = new DoctorProfile(DrUserData);
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

app.put('/api/drupdate/:_id', function (req, res) {
    
    DoctorProfile.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

app.get('/api/getalldr', function(req, res) {
    DoctorProfile.find({}, function(err, users) {
      var userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      res.send(userMap); 
      console.log("These are the lists of all users in your database ", userMap) 
    });
  });

  app.get('/api/getuserdr', function (req, res) {
    
    DoctorProfile.findOne({ username: req.query.username },function (err, user) {
        if (err) {
            console.log("username err", err)
            return res.status(500).send(err)
            // return err
        }
        if(user.username !== req.query.username){
            return res.status(404).send('username invalid');
          }
          console.log("You are Successfully Searched: Welcome ", user.username)
          console.log("User_id: ", user._id)
          console.log("User Password: ", user.password)
          console.log("You created account on: ", user.created_date)
                  return res.status(200).send(user);
      });
})

app.delete('/api/deletedr/:id', function (req, res) {
    DoctorProfile.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.username +" was deleted.");
    });
});

app.post('/api/login', function (req, res) {
    Authentication.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("email err", err)
            return res.status(500).send(err)
            // return err
        }
        if (!user) {
            console.log("email 404 err")
            return res.status(404).send()
        }

        if(user.password !== req.body.password){
          return res.status(404).send('Password invalid');
        }

        console.log("You are Successfully Logged In: Welcome ", user.username)
                return res.status(200).send(user.username);
  
    });
});
app.get('/api/getall', function(req, res) {
  Authentication.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap); 
    console.log("These are the lists of all users in your database ", userMap) 
  });
});
app.get('/api/getuser', function (req, res) {
    
    Authentication.findOne({ username: req.query.username },function (err, user) {
        if (err) {
            console.log("username err", err)
            return res.status(500).send(err)
            // return err
        }
        if(user.username !== req.query.username){
            return res.status(404).send('username invalid');
          }
          console.log("You are Successfully Searched: Welcome ", user.username)
          console.log("User_id: ", user._id)
          console.log("User Password: ", user.password)
          console.log("You created account on: ", user.created_date)
                  return res.status(200).send(user);
      });
})
app.put('/api/update/:_id', function (req, res) {
    
    Authentication.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

app.delete('/api/delete/:id', function (req, res) {
    Authentication.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.username +" was deleted.");
    });
});

 app.post('/api/multiply', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    num1= req.body.num1
    num2= req.body.num2
    console.log("Hello Sir Zohaib your answer is ", num1*num2)
    // return response.send("Hello sir Zohaib your answer is ", num1*num2);
})

app.listen(3000,() => console.log('app is running on 3000'))