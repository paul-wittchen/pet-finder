const router = require('express').Router();
const userHelper = require('../helper/user.helper');

router.post('/', (req, res) => {
    userHelper
        .login(req.body.email, req.body.password)
        .then((token) => {
            res.json({
                status: true,
                url: '/profile',
                token
            })
        })
        .catch((error) => console.log(error))
})

module.exports = router;