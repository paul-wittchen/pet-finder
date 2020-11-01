const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');

router.post('/', (req, res) => {
    petHelper
        .create(
            req.decoded.userUUID,
            req.body.petKind,
            req.body.petName,
            req.body.description,
            req.body.location,
            req.body.date,
            req.body.createdAt,
            req.body.reward
        )
        .then(() => res.json({ status: true, url: '/pets-list'}))
        .catch((error) => console.log(error))
})

module.exports = router;
