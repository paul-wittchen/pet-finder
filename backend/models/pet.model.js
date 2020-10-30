const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        },
        userUUID: {
            type: String,
            required: true
        },
        petName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        location: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        },
        reward: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const pet = mongoose.model('pet', petSchema);

module.exports = pet;