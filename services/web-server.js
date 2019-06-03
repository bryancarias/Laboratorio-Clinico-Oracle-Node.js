const http = require('http');
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const webServerConfig = require('../config/web-server')
const url = require('../router/Principal')
const urlLogin = require('../router/home_r')
let httpServer

function inicialize() {
    return new Promise ( (resolve, reject) => {
        const app = express()
        httpServer = http.createServer(app)

        app.set('views',path.join(__dirname,'../views'));
        app.set( 'view engine', 'pug' );
        require('../passport/local-auth')
        
        app.use( express.static(path.join(__dirname,'../public')))
        app.use( morgan('dev') )
        app.use( express.urlencoded({extended:false}) );
        app.use( express.json({reviver: reviveJson}))
        app.use( session({
            secret : 'bhccBcarias1',
            resave : false,
            saveUninitialized : false
        }));
        app.use( flash() )
        app.use( passport.initialize() );
        app.use( passport.session() );
        
        app.use((req, res, next) => {
            app.locals.signupMessage = req.flash('signupMessage');
            app.locals.loginMessage = req.flash('loginMessage');
            app.locals.result = req.flash('result');
            app.locals.user = req.user;
            next();
        })

        app.use('/',urlLogin.router)
        app.use('/',url.router)

        httpServer.listen(webServerConfig.port, (err)=> {
            if(err){
                reject(err)
                return
            }
            console.log(`Web server listening on localhost: ${webServerConfig.port}`)
            resolve()
        })
    })
}

function close(){
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if(err){
                reject(err)
                return
            }
            resolve()
        })
    })
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}
module.exports = {inicialize,close} 