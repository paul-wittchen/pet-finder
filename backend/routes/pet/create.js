const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');

router.post('/', (req, res) => {
    petHelper
        .create(
            req.decoded.userUUID,
            req.body.image,
            req.body.petKind,
            req.body.petName,
            req.body.description,
            req.body.location,
            req.body.createdAt,
            req.body.reward,
            req.body.contact
        )
        .then(() => res.json({ status: true, url: '/pets-list'}))
        .catch((error) => console.log(error))
})

module.exports = router;
