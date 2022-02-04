const service = require('../services/userService')

async function userLogM(req, res, next) {

    if (req.cookies.userEmail) {
    const emailCookie = req.cookies.userEmail;    
    const cookieUser = await service.findByEmail(emailCookie);
    req.session.userLogged = cookieUser
    }
    
    res.locals.isLogged = false
    if (req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userInLog = req.session.userLogged
    }
    next();
}

module.exports = userLogM