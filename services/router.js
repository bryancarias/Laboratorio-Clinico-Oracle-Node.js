const express = require('express')
const proyects = require('../controllers/proyect')
const router =  new express.Router()

router.route('/proyect/:id?')
    .get(proyects.get)
    .post(proyects.post)
    .put(proyects.put)
    .delete(proyects.delete);

module.exports = {
    router
}