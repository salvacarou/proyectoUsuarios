const { Users } = require('../database/models')
const service = require("../services/userService")
const imageDefault =  "sin-foto-de-perfil.png";
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const services = require('../services/userService');

module.exports = {
    list: async (req, res) => {
        // const allUsers = await Users.findAll({where: { deleted : false }, order: ['id', 'ASC']})
        const allUsers = await Users.findAll({where: { deleted : false }, order: [['id', 'DESC']]})
        const emailLog = (req.session.userLogged ? req.session.userLogged.email : null)
        res.render("home", { allUsers, emailLog  } )
    },
    login: async (req, res) => {

        res.render("login")
    },
    processLogin: async (req, res) => {
        const userSearch = await service.findByEmail(req.body.email)
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length == 0) {
            const userSearch = await service.findByEmail(req.body.email)
            if (userSearch) {
                const result = await services.comparePassword(req.body.password, userSearch)
                if (result == true) {
                    req.session.userLogged = userSearch
                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }
                    res.redirect('/profile')
                } if (result == false) {
                    res.render('login', {
                        errors: {
                            oldData: req.body,
                            email: {msg: 'Las credenciales son invalidas'},
                            password: {msg: 'Las credenciales son invalidas'},
                            
                        }
                    })
                }
            } 
        } if (resultValidation ) {
            res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } 
    },
    register: async (req, res) => {
        res.render("register")
    },
    processRegister: async (req, res) => {
        const resultValidation = validationResult(req)
        console.log(req.file)

    if (resultValidation.errors.length == 0) {
            await Users.create({
            id : await service.newId(),
            fullName: req.body.name + " " + req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            birthdate: req.body.birthdate,
            image: req.file ? req.file.filename : imageDefault,
            password: req.body.password,
            password: bcryptjs.hashSync(req.body.password, 10) ,
            deleted: 0
        }) 
        res.redirect('/login') 
    }   if (resultValidation) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } else {
            res.send('problemas')
        }     
    },
    profile: async (req, res) => {
        console.log(req.session.userLogged)
        res.render('profile', {
            user: req.session.userLogged
        })
    },
    logout: async (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/')
    },
    edit: async (req, res) => {
        res.render("edit")
    },
    update: async (req, res) => {
        const currentUser = await Users.findOne({where: { email: req.session.userLogged.email }})
        console.log(currentUser)
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length == 0) {
            const newU = await Users.update({
                image : req.file ? req.file.filename : currentUser.image,
                fullName : req.body.fullName,
                username : req.body.username,
                birthdate : req.body.birthdate,
                email : req.body.email
            }, {
                where: {
                    id: currentUser.id
                }
            })
            res.clearCookie('userEmail');
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            res.redirect('/profile')
        }
        if (resultValidation) {
            res.render('edit', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        res.redirect('/profile')

    }
}

