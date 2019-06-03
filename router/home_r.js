const express = require('express')
const router =  new express.Router()
const passport = require('passport')

router.route('/')
    .get( (req, res, next) => {
        res.render('home',{titulo:'login'})
    })
router.route('/login-m')
    .post(passport.authenticate('Autenticate',{
        successRedirect : '/perfil',
        failureRedirect : '/login-m',
        passReqToCallback : true
    }));
router.route('/login-p')
    .post(passport.authenticate('Autenticate',{
        successRedirect : '/perfil',
        failureRedirect : '/login-p',
        passReqToCallback : true
    }));
router.route('/login-m')
    .get( (req, res, next) => {
        res.render('login-m',{})
    })
router.route('/login-p')
    .get( (req, res, next) => {
        res.render('login-p',{})
    })
router.route('/logout')
    .get((req, res, next) => {
        req.logout()
        res.redirect('/')
    })
router.route('/perfil')
    .get(isAuthenticated,(req, res, next) =>{
        let data = {
            titulo: 'perfil'
        }
        res.render('perfil',data)
    })

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/')
}
module.exports = {  
    router
}