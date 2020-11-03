const router = require('express').Router();
const jwt = require('jsonwebtoken');

// ROUTES
const signupRouter = require('./user/signup');
const loginRouter = require('./user/login');
const profileRouter = require('./user/profile');
const createPetRouter = require('./pet/create');
const uploadPetImageRouter = require(('./pet/uploadImage'))
const listPetsRouter = require('./pet/list');

// DECODED
router.use((req, res, next) => {
    const token = req.body.token
    if (token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (!error && decoded && decoded.userUUID) {
                req.decoded = decoded
            }
            next();
        })
    } else {
        next();
    }
});

// WITHOUT AUTHENTICATION
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/pets-list', listPetsRouter);
// should be authenticated -> not the right place yet


// VERIFIES USER
router.use((req, res, next) => {
    if (req.url.endsWith('/login')) {
        if (req.method == 'POST') {
            res.send('login')
        } else if (res.method == 'GET'){
            res.redirect('/login')
        }
    } else if (req.decoded && req.decoded.userUUID) {
        next()
    } else {
        res.json({ status: false, message: 'unathenticated' })
    }
})

// WITH AUTHENTICATION
router.use('/profile', profileRouter);
router.use('/lost-pet', createPetRouter);
router.use('/upload-pet-image', uploadPetImageRouter)

module.exports = router;