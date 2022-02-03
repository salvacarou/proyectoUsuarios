const express = require('express');
const router = express.Router();
const userRegisValidation = require('../middlewares/userValidator')
const userLoggingValidation = require('../middlewares/userLogginValidator')
const multer = require('../middlewares/userMulter')
const guestMiddleware = require('../middlewares/guestMiddle')
const notLoggedMiddle = require('../middlewares/notLoggedMid')

const usersCon = require('../controllers/usersControllers');

// Lista
router.get('/', usersCon.list);

// Login
router.get('/login', guestMiddleware, usersCon.login);
router.post('/login', userLoggingValidation, usersCon.processLogin);

// Register
router.get('/register', guestMiddleware, usersCon.register);
router.post('/register',  multer.single('image'), userRegisValidation, usersCon.processRegister);

// Profile
router.get('/profile', notLoggedMiddle, usersCon.profile)

// Edit
router.get('/edit', usersCon.edit);

module.exports = router;