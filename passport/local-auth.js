
const modelRadiologo = require('../model/radiologo_m')
const modelPaciente = require ('../model/paciente_m')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const encript = require('../controllers/encript')
const database = require('../services/database')

passport.serializeUser((usuario,done)=>{
    done(null,usuario);
})
passport.deserializeUser( async(user,done)=>{ 
    try {
        let sql
        if(user.mp === 'm'){
            sql = `select * from medicoRoles where dpi_m = '${user.id}'`;
        }
        if(user.mp === 'p'){
            sql = `select * from pacientesroles where dpi_p = '${user.id}'`;
        }
        let result = await database.simpleExecute(sql,{})
        return done(null,result.rows[0])
    } catch (error) {
        return done(error)
    }
})

passport.use('Autenticate', new LocalStrategy({
    usernameField :'email',
    passwordField : 'password',
    passReqToCallback : true
},async (req,user,password,done) => {
    try { 
        let result;

        console.log(`validacion ** ${req.body.mp}`)
        let validar = req.body.mp
        let datos
        let binds = {
            userSS: user
        }

        if(validar === 'm'){
            result = await modelRadiologo.Login(binds)
            if(result.rows.length === 0)   
            {
                return done(null, false, req.flash('loginMessage', 'Verifique su UserName es Invalido.'));
            }else{
                datos = {
                    id : result.rows[0].DPI_M,
                    mp:'m'
                }
            }
        }
        if(validar === 'p'){
            result = await modelPaciente.Login(binds)
            if(result.rows.length === 0)   
            {
                console.log(result.rows.length)
                return done(null, false, req.flash('loginMessage', 'Verifique su UserName es Invalido.'));
            }else{
                console.log(`resultado ${result.rows[0].DPI_P}`)
                datos = {
                    id : result.rows[0].DPI_P, 
                    mp:'p'
                }
            }
        }

        
        if(!(encript.conparePassword(result.rows[0].PASSWORD,password)))
        {
            return done(null, false, req.flash('loginMessage', 'Contraseña Incorrecta.'));
        }
        
        return done(null,datos)
    } catch (error) {
        return done(error)
    }
}))


