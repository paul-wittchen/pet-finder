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
        petKind: {
            type: String,
            trim: true,
            required: true
        },
        petName: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        location: {
            type: String,
            trim: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        reward: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const pet = mongoose.model('pet', petSchema);

module.exports = pet;