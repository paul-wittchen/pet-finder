const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');

router.post('/', (req, res) => {
    petHelper
        .create(
            req.decoded.userUUID,
            req.body.image,
            req.body.petKind,
            req.body.petName,
            req.body.description,
            req.body.location,
            req.body.lat,
            req.body.lon,
            req.body.createdAt,
            req.body.reward,
            req.body.phone,
            req.body.mail
        )
        .then(() => res.json({ status: true, url: '/pets-list'}))
        .catch((error) => console.log(error))
})

module.exports = router;
