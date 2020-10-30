const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');

router.post('/', (req, res) => {
    petHelper
        .create(
            req.decoded.userUUID,
            req.body.petName,
            req.body.description,
            req.body.location,
            req.body.time,
            req.body.reward
        )
        .then(() => res.json({ status: true, url: '/'}))
        .catch((error) => console.log(error))
})

module.exports = router;