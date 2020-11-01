const petModel = require('../models/pet.model');
const { createUUID } = require('../utility');

const create = (userUUID, petKind, petName, description, location, date, createdAt, reward) => {
    return petModel.create({
        uuid: createUUID(),
        userUUID,
        petKind,
        petName,
        description,
        location,
        date,
        createdAt,
        reward
    })
}

const read = () => { return petModel.find() }

module.exports = {
    create,
    read
};
