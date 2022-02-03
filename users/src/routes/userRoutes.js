const express = require('express');
const router = express.Router();
const userRegisValidation = require('../middlewares/userValidator')
const userLoggingValidation = require('../middlewares/userLogginValidator')
const multer = require('../middlewares/userMulter')

const usersCon = require('../controllers/usersControllers');

// Lista
router.get('/', usersCon.list);

// Login
router.get('/login', usersCon.login);
router.post('/login', userLoggingValidation, usersCon.processLogin);

// Register
router.get('/register', usersCon.register);
router.post('/register',  multer.single('image'), userRegisValidation, usersCon.processRegister);

// Edit
router.get('/edit', usersCon.edit);

module.exports = router;