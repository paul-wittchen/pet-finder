const router = require('express').Router();
const verify = require('./verifyAccess');

router.get('/', verify, (req, res) => {
    res.send('Profile page')
})

module.exports = router;