const router = require('express').Router();
const userHelper = require('../../helper/user.helper');

router.post('/', (req, res) => {
    userHelper
        .readData(req.decoded.userUUID)
        .then((data) => res.json({ status: true, data }))
        .catch((error) => console.log(error))
});

router.delete('/:uuid', (req, res) => {
    userHelper
        .deletePet(req.params.uuid)
        .then(() => res.json('Pet deleted'))
        .catch((error) => console.log(error))
})

module.exports = router;
