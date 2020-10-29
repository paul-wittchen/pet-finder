const router = require('express').Router();
const userHelper = require('../helper/user.helper');

router.use('/', (req, res) => {
    userHelper
        .read(req.decoded.userUUID)
        .then(profile => res.json({ status: true, profile }))
        .catch((error) => console.log(error))
});

module.exports = router;