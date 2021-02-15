const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
var jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const pool = mysql.createPool({
    connectionLimit: 100, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kupovinakarataskript'
});

const route = express.Router();
const bcrypt = require('bcrypt');

const userSchema = Joi.object().keys({
    firstName : Joi.string().min(3).max(20).required(),
    lastName : Joi.string().min(3).max(20).required(),
    username : Joi.string().min(5).max(20).required(),
    password : Joi.string().min(5).max(20).required(),
    email : Joi.string().email()
});

const loginSchema = Joi.object().keys({
    username : Joi.string().min(5).max(20).required(),
    password : Joi.string().min(5).max(20).required()
})

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash)
}

route.use(express.json());

route.post('/register', jsonParser, (req, res) => {
    let { error } = userSchema.validate(req.body);
    if (error){
        console.log(error);
        res.status(400).send(error.details[0].message);
    }
    else {
        const username = req.body.username;
        const email = req.body.email;
        var password = req.body.password;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        let errors = [];

        if(!firstName || !lastName  || !password  ){
            errors.push({msg: 'Please fill in all the fields'});
            res.send({message:'Please fill in all the fields'});
        }

        if(errors.length>0){

        }else{
            if(email){
                pool.query('SELECT * FROM users WHERE username = ?', [username],
                    (error, results, fields)=>{
                        if (false){
                            res.send('username exists');
                        }else{
                            res.send('Registration success')
                            bcrypt.hash(password, 5, (err, hash)=> {
                                if(err)throw err;
                                password = hash;
                                pool.query('INSERT INTO user(firstName, lastName, username, password, email) VALUES("'+firstName+'", "'+lastName+'","'+username+'", "'+password+'","' +email+ ' ")',
                                    [firstName, lastName, username, password, email], function(err, results) {
                                        console.log(err);
                                    });
                            });
                            console.log("uspesna registracija")
                        }

                    });
            }else{
                res.send('Enter Email');
            };
        }
    }
});

route.post('/login',jsonParser, (req, res)=> {
    let { error } = loginSchema.validate(req.body);
    console.log(req.body.username)
    console.log(req.body.password)
    if (error){
        res.status(400).send(error.details[0].message);
    }else {
        const username = req.body.username;
        const password = req.body.password;

        if (username && password) {
            pool.query('SELECT * FROM user WHERE username = ?', [username],
                (error, results, fields) => {
                    pass = results[0].password;
                    console.log(results[0]);
                    console.log(pass);
                    if (bcrypt.compareSync(password, pass)) {
                        console.log("success");
                        var token = jwt.sign({ username:results[0].username }, 'shhhhh');
                        res.send({'token' :token});
                    } else {
                        res.send({'token': ''});
                    }
                    res.end();
                });
        } else {
            res.send({'token': ''});
            res.end();
        }
    }
});

route.get('/test', (req, res) => {
    res.send("Hello");
});

module.exports = route;

