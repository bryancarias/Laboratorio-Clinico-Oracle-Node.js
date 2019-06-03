const paciente_m = require('../model/paciente_m')
const encript = require('./encript')

let data = {}

function getParamsPost(req){
    const proyect = {
        i_dpi_p: req.body.i_dpi_p,
        i_nombre_p: req.body.i_nombre_p,
        i_apellido_p: req.body.i_apellido_p,
        i_edad_p : req.body.i_edad_p,
        i_sexo_p  : req.body.i_sexo_p,
        i_email_u: req.body.i_email_u,
        i_password_u: encript.encriptPassword(req.body.i_password_u)
    }
    return proyect
}

async function post(req, res, next) {
    try {
      let paciente = getParamsPost(req)
        paciente = await paciente_m.createPaciente(paciente)
      if(paciente.o_error === 1) {
        res.redirect('/paciente')
      }else if (paciente.o_error === 11){
        await req.flash('result', `${paciente.o_error_msg}`)
        res.redirect('/agregar')
      }else if (paciente.o_error === 10){
        data.o_id_paciente = await paciente.o_id_paciente
        await console.log(data.o_id_paciente);
        await req.flash('result', `${paciente.o_error_msg}`)
        res.redirect('/agregar')
      }
    } catch (err) {
      next(err);
    }
  }

  async function get(req, res, next) {
    try {
        const rows = await paciente_m.find()
        let data = {
          rows
        }
        res.render('paciente',data);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    post,
    get
}