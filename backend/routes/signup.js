const router = require('express').Router();
const userHelper = require('../helper/user.helper');

router.post('/', (req, res) => {
    userHelper
        .signup(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.password
        )
        .then(() => res.json({ status: true, url: '/login'}))
        .catch((error) => console.log(error))
})

module.exports = router;