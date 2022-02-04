const { compareSync } = require('bcryptjs');
const { body } = require('express-validator');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

const validations = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Debe ingresar su nombre completo') 
        .bail()
        .isLength({min:4, max:20})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .bail(),
    body('username')
        .trim()
        .notEmpty()
        .withMessage("Debes completar el campo")
        .bail()
        .isLength({min:4, max:20})
        .withMessage("Debe tener de 4 a 20 caracteres")
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('birthdate')
        .not().isEmpty()
        .withMessage("Debes ingresar una fecha")
        .withMessage('Solo se permite contenido alfanumerico')
        .bail(),
    body('email')
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage('Debe ingresar algun e-mail')
        .bail()
        .isEmail()
        .withMessage('La dirección de e-mail ingresada no es válida')
        .bail(),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Debe ingresar tu contraseña')
        .bail()
        .isLength({ min:4 })
        .withMessage("La contraseña debe tener por lo menos 4 caracteres")
        .bail()
        .isAlphanumeric()
        .withMessage('Solo se permite contenido alfanumerico')
        .bail()
        .custom(async (value, { req }) => {
          const user = await db.Users.findOne({ where: { email: req.session.userLogged.email, }})
          const passwordCheck = bcryptjs.compareSync(req.body.password, user.password)
            if (passwordCheck == false) {
              return Promise.reject('Esta contraseña no es la anterior');
            }
        }),
]



module.exports = validations;