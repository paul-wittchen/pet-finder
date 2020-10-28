const Joi = require('joi');

const signupSchema = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().max(100).required(),
        lastname: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    return schema.validate(data)
}

const loginSchema = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    return schema.validate(data)
}

module.exports = {
    signupSchema,
    loginSchema
}