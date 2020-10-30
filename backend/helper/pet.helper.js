const petModel = require('../models/pet.model');
const { createUUID } = require('../utility');

const create = (userUUID, petKind, petName, description, location, time, date, createdAt, reward) => {
    return petModel.create({
        uuid: createUUID(),
        userUUID,
        petKind,
        petName,
        description,
        location,
        time,
        date,
        createdAt,
        reward
    })
}

module.exports = {
    create
};