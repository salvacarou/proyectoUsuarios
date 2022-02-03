const { Users } = require('../database/models')
const service = require("../services/userService")
const imageDefault =  "sin-foto-de-perfil.png";
const { validationResult } = require("express-validator")

module.exports = {
    list: async (req, res) => {
        const allUsers = await Users.findAll({where: { deleted : false }})
        res.render("home", { allUsers } )
    },
    login: async (req, res) => {
        res.render("login")
    },
    processLogin: async (req, res) => {
        const resultValidation = validationResult(req)
        res.send(resultValidation)

    },
    register: async (req, res) => {
        res.render("register")
    },
    processRegister: async (req, res) => {
        const resultValidation = validationResult(req)

    if (resultValidation.errors.length == 0) {
            await Users.create({
            id : await service.newId(),
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            birthdate: req.body.birthdate,
            image: req.file ? req.file.filename : imageDefault,
            password: req.body.password,
            deleted: 0
        }) 
        res.redirect('/login') 
    }   if (resultValidation) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        } else {
            res.send('problemas')
        }
        
    },
    edit: async (req, res) => {
        res.render("edit")
    }
}

