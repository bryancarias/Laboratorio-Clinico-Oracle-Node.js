const oracledb = require('oracledb')
const database = require('../services/database')

let tipoExamen1 = `SELECT DISTINCT ID_TE,NOMBRE_TE FROM  tiposSubTiposExamen`
async function tipoExamen() {
    let query = tipoExamen1 
    const binds = { }

    const result = await database.simpleExecute(query,binds)

    return result.rows
}
let baseQuery = `select * from pacientesroles where dpi_p = :id`;

async function findPaciente(emp) {
    let query = baseQuery 
    const binds = {id:emp.idp}
    console.log(binds)
    const result = await database.simpleExecute(query,binds)

    return result.rows
}
let baseQue= `select * from medico_referente where dpi_mf = :id `;

async function findMF(emp) {
    let query = baseQue 
    const binds = {id:emp.idmf}

    const result = await database.simpleExecute(query,binds)

    return result.rows
}
let subTiposExamen = `SELECT ste.id_ste,ste.titulo_pre_stp,ste.diagnostico_pre_stp,ste.conclusion_pre_stp,ste.comentario_pre_stp 
FROM  tiposSubTiposExamen ste where ID_STE = :id_ste`;
async function subtipoExamen(emp) {
    let query = subTiposExamen 
    const binds = {
        id_ste: emp.id_te
    }

    const result = await database.simpleExecute(query,binds)

    return result.rows
}

let pdiPaciente = 'SELECT DPI_P FROM  pacientesRoles'
async function paciente() {
    let query = pdiPaciente 
    const binds = {}

    const result = await database.simpleExecute(query,binds)

    return result.rows
}

let pdiMf = 'SELECT DPI_MF FROM  MEDICO_REFERENTE'
async function medicoReferente() {
    let query = pdiMf 
    const binds = {}

    const result = await database.simpleExecute(query,binds)

    return result.rows
}


async function elegirEXAMEN(emp) {
    let query = `SELECT ID_STE,titulo_pre_stp FROM  tiposSubTiposExamen WHERE ID_TE = ${emp.id_te}` 
    const binds = {  }
    const result = await database.simpleExecute(query,binds)

    return result.rows
}
// TO_DATE('2018-11-02 08:49:37', 'YYYY-MM-DD HH24:MI:SS')

async function createRadiologo (entrada){
    let bindvars = Object.assign({},entrada)

    bindvars.o_id_radiologo = { 
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    }
    bindvars.o_error = {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
    } 
    bindvars.o_error_msg = {
        dir: oracledb.BIND_OUT,
        type: oracledb.STRING
    }
    IngresoMedicoReferente(i_dpi_mf, i_nombre_mf, i_apellido_mf, o_error, o_error_msg,o_dpi_mf);
    const result = await database.simpleExecute(QueryRadiologo,bindvars)

    return result.outBinds
}
let insertQuery =
`INSERT INTO EXAMEN(dpi_m,dpi_p,dpi_mf,id_ste,titutlo_e,diagnostico_e,conclusion_e,comentario_e,fecha_e,estado_e,precio_e,nombre_pdf)VALUES(:DP_M,:DP_P,:DP_MF,:I_STE,:TITUTLO,:DIAGNOSTICO,:CONCLUSION,:COMENTARIO,TO_DATE('2018-11-02 08:49:37', 'YYYY-MM-DD HH24:MI:SS'), :ESTADO,:PRECIO,:NOMBRE_P)`

async function crearExamen (emp){
    let query = insertQuery
    let binds = Object.assign({},emp)
    console.log(emp)
    let result = await database.simpleExecute(query,binds)
    console.log('hoal')
    return result.rowsAffected 
}

module.exports = {
    crearExamen,
    tipoExamen,
    elegirEXAMEN,
    subtipoExamen,
    paciente,
    medicoReferente,
    findPaciente,
    findMF
}