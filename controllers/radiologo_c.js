const radiologo_m = require('../model/radiologo_m')
const encript = require('./encript')

function getParamsPost(req){
    const proyect = {
        i_dpi_m: req.body.i_dpi_m,
        i_nombre_m: req.body.i_nombre_m,
        i_apellido_m: req.body.i_apellido_m,
        i_email_u: req.body.i_email_u,
        i_password_u:encript.encriptPassword( req.body.i_password_u),
        i_rol_users: req.body.i_rol_users
    }
    return proyect
}
let data = {}
async function post(req, res, next) {
    try {
      let radiologo = getParamsPost(req)
      radiologo = await radiologo_m.createRadiologo(radiologo);
      if(radiologo.o_error === 1) {
        res.redirect('/radiologo')
      }else if (paciente.o_error === 11){
        await req.flash('result', `${radiologo.o_error_msg}`)
        res.redirect('/agregarm')
      }else if (paciente.o_error === 10){
        data.o_id_paciente = await radiologo.o_id_radiologo
        await console.log(data.o_id_radiologo);
        await req.flash('result', `${radiologo.o_error_msg}`)
        res.redirect('/agregarm')
      }
    } catch (err) {
      next(err);
    }
  }
  async function get(req, res, next) {
    try {
        const rows = await radiologo_m.find()
        let data = {
          rows
        }
        res.render('radiologo',data);
    } catch (error) {
        next(error)
    }
}
  
  module.exports = {
      post,
      get
  }