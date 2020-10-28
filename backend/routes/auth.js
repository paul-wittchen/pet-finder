const router = require('express').Router();
const userModel = require('../models/user.model');
const { createUUID } = require('../utility');
const { signupSchema, loginSchema } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
    // validate
    const {error} = signupSchema(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check email
    const emailExists = await userModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists')

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    // save user
    const user = new userModel({
        userUUID: createUUID(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPwd
    });
    try {
        const savedUser = await user.save();
        res.send({user: user.userUUID})
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    // validate
    const {error} = loginSchema(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check email
    const user = await userModel.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email doesnt exists')

    // compare password
    const checkPwd = await bcrypt.compare(req.body.password, user.password)
    if (!checkPwd) return res.status(400).send('Invalid password')

    res.send('Logged in')

})

module.exports = router;