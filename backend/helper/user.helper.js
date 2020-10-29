const userModel = require('../models/user.model');
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

module.exports = {
    signup,
    login
}