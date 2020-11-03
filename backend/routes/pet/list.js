const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');

router.get('/', (req, res) => {
    petHelper
        .read()
        .then(pets => res.json({pets}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:uuid', (req, res) => {
    petHelper
      .findOne(req.params.uuid)
      .then(pet => res.json({ pet }))
      .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;