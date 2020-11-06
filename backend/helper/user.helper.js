const userModel = require('../models/user.model');
const petModel = require('../models/pet.model');
const { hash, createUUID } = require('../utility');
const jwt = require('jsonwebtoken');

const signup = (firstname, lastname, email, password) => 
    new Promise((resolve, reject) => {
        if (firstname && lastname && email && password) {
            userModel
                .countDocuments({ email })
                .then( async () => {
                    const user = {
                        uuid: createUUID(),
                        firstname,
                        lastname,
                        email,
                        password: hash(password)
                    };
                    const token = jwt.sign(
                        { userUUID: user.uuid }, process.env.SECRET
                    );
                    await userModel.create(user)
                    resolve(token)
                })
                .catch((error) => console.log(error))
        } else {
            reject()
        }
    })

const login = (email, password) => 
    new Promise((resolve, reject) => {
        if (email && password) {
            userModel
                .findOne({ email, password: hash(password) }, { _id: 0, uuid: 1 })
                .then((user) => {
                    if (user && user.uuid) {
                        const token = jwt.sign(
                            { userUUID: user.uuid }, process.env.SECRET
                        );
                        resolve(token)
                    } else {
                        reject('No user')
                    }
                })
                .catch((error) => console.log(error))
        } else {
            reject()
        }
    })

const readData = (uuid) =>
    new Promise((resolve, reject) => {
        userModel
        .aggregate([
            { $match: { uuid }},
            {
                $lookup: {
                    from: 'pets',
                    localField: 'uuid',
                    foreignField: 'userUUID',
                    as: 'pet'
                },
            }
        ])
        .then((userArray) => {
            if(userArray.length === 1) {
                resolve(userArray[0])
            } else {
                reject('multiple or no user found')
            }
        })
        .catch((error) => reject(error))
    })

const deletePet = (uuid) => 
    new Promise((resolve, reject) => {
        petModel.findOneAndDelete({ uuid })
        .then(resolve())
        .catch((error) => reject(error))
    })

module.exports = {
    signup,
    login,
    readData,
    deletePet
}
