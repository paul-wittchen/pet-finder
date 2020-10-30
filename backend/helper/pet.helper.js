const petModel = require('../models/pet.model');
const { createUUID } = require('../utility');

const create = (userUUID, petName, description, location, time, reward) => {
    return petModel.create({
        uuid: createUUID(),
        userUUID,
        petName,
        description,
        location,
        time,
        reward
    })
}

module.exports = create;