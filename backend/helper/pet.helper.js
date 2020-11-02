const petModel = require('../models/pet.model');
const { createUUID } = require('../utility');

const create = (userUUID, image, petKind, petName, description, location, createdAt, reward, contact) => {
    return petModel.create({
        uuid: createUUID(),
        userUUID,
        image,
        petKind,
        petName,
        description,
        location,
        createdAt,
        reward,
        contact
    })
}

const read = () => { return petModel.find() }

module.exports = {
    create,
    read
};
