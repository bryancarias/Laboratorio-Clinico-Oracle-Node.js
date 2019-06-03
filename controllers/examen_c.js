const examen = require('../model/examen-m')
const pdf = require('../pdf/generadorPDF')
function getParametro(req){
    let proyect = {
        id_te: parseInt(req.params.id)
    }
    return proyect
}
function getParameterBody (req){
    
    let proyecto = {
        DP_M: parseInt(req.body.DPI_M)
    ,   DP_P:  parseInt(req.body.DPI_P)
    ,   DP_MF:parseInt(req.body.DPI_MF)
    ,   I_STE:parseInt(req.body.ID_STE)
    ,   TITUTLO:req.body.TITUTLO_E
    ,   DIAGNOSTICO:req.body.DIAGNOSTICO_E
    ,   CONCLUSION:req.body.CONCLUSION_E
    ,   COMENTARIO:req.body.COMENTARIO_E
    ,   ESTADO:req.body.ESTADO_E
    ,   PRECIO:parseInt(req.body.PRECIO_E)
    }
    return proyecto
}
async function crearExamen(req, res, next) {
    try {
        let data = getParameterBody(req)
    let aleatorio = Math.floor( (Math.random()*999)+1)
    let emp = {
        idp: data.DP_P,
        idmf:data.DP_MF 
    }
    let paciente = await examen.findPaciente(emp)
    let mf = await examen.findMF(emp)
    
    console.log('llego aqui')
    let dataPDf =  {
            nombrePdf: `Examen${aleatorio}.pdf`,
            numero: '18-1212',
            fecha:data.FECHA,
            nombre: `${paciente[0].NOMBRE_P} ${paciente[0].APELLIDO_P}`,
            edad:paciente[0].EDAD_P,
            sexo:paciente[0].SEXO_P,
            mf:`${mf[0].NOMBRE_MF} ${mf[0].APELLIDO_MF}`,
            titulo:data.TITUTLO,
            diagnostico: data.DIAGNOSTICO,
            conclusion: data.CONCLUSION,
            comentario: data.COMENTARIO,
            radiolgo:`Bryan Heraldo Carias Cervantes`
        }
    data.NOMBRE_P =`Examen${aleatorio}`
    pdf.GenerarPdf(dataPDf)

    data = await examen.crearExamen(data)

    if(data > 0) {
        res.redirect('/perfil')
    }
    else{
        res.redirect('/perfil')
    }
    } catch (error) { 
        next(error)
    }
    
    
}



async function tipoExamen ( req, res, next) {
    try {
        const rows = await examen.tipoExamen()
        let data = {
          rows
        }
        res.render('tipoexamen',data);
    } catch (error) {
        next(error)
    }
}
async function tipoExamenInfo ( req, res, next){
    try {
        let cat = getParametro(req)
        const medico = await examen.medicoReferente()
        const paciente = await examen.paciente()
        const rows = await examen.subtipoExamen(cat)
        let data = {
          rows,
          medico,
          paciente
        }
        console.log(data.medico)
        console.log(data.paciente)
        res.render('tipoexameninfo',data);
    } catch (error) {
        next(error)
    }
}
async function categoria ( req, res, next){
    try {
        let cat = getParametro(req)
        const rows = await examen.elegirEXAMEN(cat)
        let data = {
          rows
        }
        console.log(data.rows)
        res.render('categoria',data);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    tipoExamen,
    categoria,
    tipoExamenInfo,
    crearExamen
}