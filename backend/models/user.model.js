const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },{
        timestamps: true
    }
)

const user = mongoose.model('user', userSchema)

module.exports = user;