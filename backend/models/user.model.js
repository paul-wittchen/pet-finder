const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);

const user = mongoose.model('user', userSchema);

module.exports = user;