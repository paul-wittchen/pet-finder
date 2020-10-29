const router = require('express').Router();
const jwt = require('jsonwebtoken');

// ROUTES
const userRouter = require('./signup');

// DECODED
router.use((req, res, next) => {
    const token = req.body.token
    if (token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (!error && decoded && decoded.userUUID) {
                req.decoded = decoded
            } else {
                next();
            };
        })
    } else {
        next();
    }
});

// WITHOUT AUTHENTICATION
router.use('/signup', userRouter);

// VERIFIES USER
router.use((req, res, next) => {
    if (req.url.endsWith('/login')) {
        if (req.method === 'POST') {
            res.send('login')
        } else if (res.method === 'GET'){
            res.redirect('/login')
        }
    } else if (req.decoded && req.decoded.userUUID) {
        next()
    } else {
        res.json({ status: false, message: 'unathenticated' })
    }
})

module.exports = router;