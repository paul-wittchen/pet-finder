const router = require('express').Router();
const petHelper = require('../../helper/pet.helper');

router.get('/', (req, res) => {
    petHelper
        .read()
        .then((pets) => res.json({ pets }))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.get('/:uuid', (req, res) => {
    petHelper
      .findOne(req.params.uuid)
      .then((pet) => res.json({ pet }))
      .catch(error => res.status(400).json('Error: ' + error));
})

module.exports = router;