const express = require('express')
const radiolog = require('../controllers/radiologo_c')
const paciente = require('../controllers/paciente_c')
const examen = require('../controllers/examen_c')
const router =  new express.Router()

/* Rutas compartidad */
/*Seguridad Medico o radiologo*/ 
router.route('/paciente/:id?')
    .get(isAuthenticated,paciente.get)
.post(isAuthenticated,paciente.post)
router.route('/agregar')
    .get(isAuthenticated,(req, res, next) => {
        res.render('addp')
    })
router.route('/tipoexamen')
    .get(isAuthenticated,examen.tipoExamen)
router.route('/categoria/:id')
    .get(isAuthenticated,examen.categoria)
router.route('/examen/:id?')
    .get(isAuthenticated,examen.tipoExamenInfo)
    .post(isAuthenticated,examen.crearExamen)

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
    {
        console.log(`Autenticate ${req.user.NROL}`)
        let validar = req.user.NROL
        if(validar === 'Admin'){
            return next();
        }
        else if(validar === 'Medico'){
            return next();
        }else{
            res.redirect('/perfil')
        }
    }
    res.redirect('/')
}
/*Seguridad Admin*/

router.route('/radiologo/:id?')
    .get(isAuthenticatedAdmin,radiolog.get)
    .post(isAuthenticatedAdmin,radiolog.post)

router.route('/agregarm')
    .get(isAuthenticatedAdmin,(req, res, next) => {
        res.render('addm') 
    })

function isAuthenticatedAdmin (req, res, next){
    if(req.isAuthenticated())
    {
        console.log(`Autenticate ${req.user.NROL}`)
        let validar = req.user.NROL
        if(validar === 'Admin'){
            return next();
        }else{
            res.redirect('/perfil')
        }
    }
    res.redirect('/')
}
module.exports = {
    router
}