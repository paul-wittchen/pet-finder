const router = require('express').Router();
const userModel = require('../models/user.model');
const { createUUID } = require('../utility');
const { signupSchema } = require('../validation');

router.post('/signup', async (req, res) => {
    // validate
    const {error} = signupSchema(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // check email
    const emailExists = await userModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists')

    // save user
    const user = new userModel({
        uuid: createUUID(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;