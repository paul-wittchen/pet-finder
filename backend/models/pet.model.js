const mongoose = require('mongoose');
require('mongoose-type-email');

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
        image: {
            type: Array,
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
            required: true
        },
        lat: {
            type: Number
        },
        lon: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        reward: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        mail: {
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