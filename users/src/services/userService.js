const bcryptjs = require('bcryptjs')
const { Users } = require('../database/models')

const services = {
    async newId() {
       const id = await Users.max("id") + 1;
       return id 
    },
    async findByEmail(text) {
        const user = await Users.findOne({where: {email: text, deleted: false}});
        if (user) {
            return user
        } else {
            return 'No se encontro el usuario'
        }       
    },
    async comparePassword(password, user) {
        return bcryptjs.compareSync(password, user.password)
    }
}

module.exports = services

