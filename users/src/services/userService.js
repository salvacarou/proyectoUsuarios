const { Users } = require('../database/models')

const services = {
    async newId() {
       const id = await Users.max("id") + 1;
       return id 
    } 
}

module.exports = services

// console.log(exportssss.newId())


// async function salva (db) {
//     console.log(await db.max("id") + 1)
// //    return await db.max("id") + 1
// }

// salva(Users)