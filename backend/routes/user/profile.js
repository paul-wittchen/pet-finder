const router = require('express').Router();
const userHelper = require('../../helper/user.helper');

router.post('/', (req, res) => {
    userHelper
        .readData(req.decoded.userUUID)
        .then((data) => res.json({ status: true, data }))
        .catch((error) => console.log(error))
});

module.exports = router;
