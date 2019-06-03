const bcrypt = require('bcrypt-nodejs');

let encriptPassword = (password) => {
    return bcrypt.hashSync( password,bcrypt.genSaltSync(10) )
}
let conparePassword = (alPassword,inPassword) => {
   return bcrypt.compareSync(inPassword,alPassword);
}
module.exports = {
    encriptPassword,
    conparePassword
}