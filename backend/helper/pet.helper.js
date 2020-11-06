const petModel = require('../models/pet.model');
const { createUUID } = require('../utility');

const create = (userUUID, image, petKind, petName, description, location, lat, lon, createdAt, reward, phone, mail) => {
    return petModel.create({
        uuid: createUUID(),
        userUUID,
        image,
        petKind,
        petName,
        description,
        location,
        lat,
        lon,
        createdAt,
        reward,
        phone,
        mail
    })
}

const read = () => { petModel.find() }

const findOne = (uuid) => { petModel.findOne({ uuid })}

module.exports = {
    create,
    read,
    findOne
};
