//Constants Definations
const mongoose = require('mongoose');
const express = require('express');
const bodyParser=require("body-parser");
const res = require('express/lib/response');
const urlencoded = require('body-parser/lib/types/urlencoded');
const app = express();
const port = 8800;
let phoneNO;
let showData={
    firstName: String,
    lastName: String,
    email: String,
    phoneNO: String,
    skill: Array,
    experience: Array,
    education: Array,
    password: String
};


// Establishing Connection and Creating schema and model
mongoose.connect("mongodb://localhost:27017/test");

var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNO: String,
    skill: Array,
    experience: Array,
    education: Array,
    password: String
});

var User = mongoose.model("user", usersSchema);


// Routing requests

app.get('/',function(req, res){
    res.render('index');
});

app.get('/register',function(req,res){
    res.render('register');
});

app.post('/authenticate',bodyParser.urlencoded(), function(req,res){
    var loginInfo=req.body;
    User.find({phoneNO: loginInfo.phoneNO},function(err, response){
        if (loginInfo.password!=response[0].password){
            res.render('invalidLogin');
            // res.redirect("http://127.0.0.1:5500/views/invalidLogin.html");
        }
        else{
            phoneNO=loginInfo.phoneNO;
            res.redirect("/showUsers");
        }
    });
});

app.post('/formView',bodyParser.urlencoded(), function(req, res) {
    var userInfo=req.body;
    
    var newUser= new User({
        firstName: userInfo.fName,
        lastName: userInfo.lName,
        email: userInfo.email,
        phoneNO: userInfo.phoneNO,
        skill: userInfo.skill,
        experience: userInfo.expr,
        education: userInfo.edu,
        password: userInfo.password
    });
    phoneNO=userInfo.phoneNO;

    newUser.save(function(err,response){
        if (err) throw err;
        console.log("Inserted Successfully!")
        res.redirect("/showUsers");
    });
});


// app.get("/showUsers",function(req,res){
//     User.find({phoneNO: phoneNO},function(err, response){
//         res.write(`<body style="background-color: #335145; color: white;">`);
//         res.write(`<h1>${response[0].firstName} ${response[0].lastName}</h1>`);
//         res.write(`<p style="font-size: 20px">Email: ${response[0].email} Phone: ${response[0].phoneNO}</p><hr>`);
//         res.write("<h2>Work Experience</h2>");
//         res.write(`<ul>`);
//         for(let i=0;i<response[0].experience.length;i++){
//             res.write(`<li style="font-size: 20px">${response[0].experience[i]}</li>`);
//         }
//         res.write(`</ul>`);
//         res.write("<h2>Education</h2>");
//         res.write(`<ul>`);
//         for(let i=0;i<response[0].education.length;i++){
//             res.write(`<li style="font-size: 20px">${response[0].education[i]}</li>`);
//         }
//         res.write(`</ul>`);
//         res.write("<h2>Skills</h2>");
//         res.write(`<ul>`);
//         for(let i=0;i<response[0].skill.length;i++){
//             res.write(`<li style="font-size: 20px">${response[0].skill[i]}</li>`);
//         }
//         res.write(`</ul>`);
//         res.write(`<button type="button" onclick="window.print();">Print</button>`);

//         showData={
//             firstName: response[0].firstName,
//             lastName: response[0].lastName,
//             email: response[0].email,
//             phoneNO: response[0].phoneNO,
//             skill: response[0].skill,
//             experience: response[0].expr,
//             education: response[0].edu,
//             password: response[0].password
//         }
//         res.write(`<a href="/editRedirect">
//         <button type="button">Edit</button>
//         </a>`);
//         res.write(`<a href="http://127.0.0.1:5500/login.html">
//         <button type="button">Log out</button>
//         </a>`);

//         res.end();
//     });
// });

app.get("/showUsers",function(req,res){
    User.find({phoneNO: phoneNO},function(err, response){
        showData={
            firstName: response[0].firstName,
            lastName: response[0].lastName,
            email: response[0].email,
            phoneNO: response[0].phoneNO,
            skill: response[0].skill,
            experience: response[0].expr,
            education: response[0].edu,
            password: response[0].password
        }
        res.render('showUser',{user: response});
    });
});

app.get("/editRedirect",function(req,res){
    res.render('editForm',{user: showData});
});


app.post("/editUser",bodyParser.urlencoded(), function(req,res){
    var editInfo=req.body;
    User.updateOne({phoneNO: editInfo.phoneNO},
        {experience: editInfo.expr, education: editInfo.edu, skill: editInfo.skill},
        function(err,response){
            if (err) throw err;
            console.log("Updated Successfully");
            res.redirect("/showUsers");
        })
});


app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});