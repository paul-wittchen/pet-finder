const userModel = require('../models/user.model');
const { hash, createUUID } = require('../utility');

const signup = (firstname, lastname, email, password) => {
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
                    await userModel.create(user)
                    resolve()
                })
                .catch((error) => console.log(error))
        } else {
            reject()
        }
    })
}

module.exports = {
    signup
}