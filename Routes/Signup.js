const express = require('express');
const router = express.Router();
const userModel = require('../Schemas/userSchema');
const bcrypt = require('bcrypt')
const authenticator = require('../Utils/Authenticator')


//Signup Req object prototype
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
//     enrollmentNumber: { type: String, unique: true },
//     branch: { type: String },
//     year: { type: String }

router.post('/users/signup', (req, res) => {
    //Authenticating Creds
    if (!authenticator.authenticateEmail(req.body.email)) {
        res.send({ success: false, code: 1, response: { message: "Invalid Email Address!" } })
    }
    else if (!authenticator.authenticatePassword(req.body.password)) {
        res.send({ success: false, code: 2, response: { message: "Invalid Password!" } })
    }
    else {
        //Syncronously Hashing Password
        const hashed = bcrypt.hashSync(req.body.password, 10);
        //Creating New User Object
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            enrollmentNumber: req.body.enrollmentNumber,
            branch: req.body.branch,
            year: req.body.year,
            currentSem: req.body.currentSem
        })
        //Saving New User to DB
        newUser.save((err, responseObject) => {
            if (err) {
                //Duplicate Error
                if (err.code === 11000) {
                    res.send({ success: false, code: 11000, response: { message: "Enrollment Number Already Taken!", err: req.body.enrollmentNumber } })
                }
                //Other Error
                else { return console.error(err) }
            }
            else {
                //Succesfully Signed Up
                res.send({ success: true, code: 200, response: { message: "New Account Created!", id: responseObject._id } })
            }
        })
    }

});

module.exports = router;

