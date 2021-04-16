const express = require('express');
const router = express.Router();
const userModel = require('../Schemas/userSchema');
const bcrypt = require('bcrypt')

router.post('/users/login', (req, res) => {

    userModel.findOne({ enrollmentNumber: req.body.enrollmentNumber }, (err, responseObject) => {
        if (err) return console.error(err);
        else {
            //Account Exists?
            if (!responseObject) {
                //No
                res.send({ success: false, code: 3, response: { message: "Account does not Exist" } })
            }
            //Yes
            //Password Correct?
            else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, responseObject.password);
                //Yes
                if (isPasswordCorrect) {
                    res.send({ success: true, code: 200, response: { message: "Credentials Authenticated!", id: responseObject._id } })
                }
                //No
                else {
                    res.send({ success: false, code: 3, response: { message: "Incorrect Password" } })
                }

            }
        }
    })
})



module.exports = router;

