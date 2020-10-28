const crypto = require('crypto');
const {v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const hash = (string) => {
    crypto.createHash('sha512').update(string).digest('hex');
}

const getSessionTokenExpireTimestamp = () =>
  new Date(Date.now() + 315360000000).getTime();

const createUUID = () => uuidv4()

module.exports = {
    hash,
    getSessionTokenExpireTimestamp,
    createUUID
}