const { body } = require('express-validator');
const db = require('../database/models');

const validations = [
body('email')
.trim()
.isAlphanumeric()
.withMessage('Solo se permite contenido alfanumerico')
.bail()
.notEmpty()
.withMessage('Debe ingresar algun e-mail')
.bail()
.isEmail()
.withMessage('La dirección de e-mail ingresada no es válida')
.bail(),
body('password')
.trim()
.notEmpty()
.withMessage('Debe ingresar una contraseña')
.bail()
.isLength({ min:4 })
.withMessage("La contraseña debe tener por lo menos 4 caracteres")
.bail()
]


module.exports = validations;