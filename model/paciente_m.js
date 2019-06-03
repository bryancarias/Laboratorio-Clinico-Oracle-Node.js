const oracledb = require('oracledb')
const database = require('../services/database')

let login =`select * from pacientesroles where email= :userss`
async function Login (entrada){

    const result = await database.simpleExecute(login,{userss:entrada.userSS});
    
    return result
}

let baseQuery = `select * from pacientesroles`;

async function find() {
    let query = baseQuery 
    const binds = {}

    const result = await database.simpleExecute(query,binds)

    return result.rows
}

const QueryPaciente = 
`
BEGIN
IngresoPacientes(:i_dpi_p, :i_nombre_p, :i_apellido_p, :i_edad_p,:i_sexo_p, :i_email_u, :i_password_u, :o_id_paciente, :o_error, :o_error_msg);
END;
`;

async function createPaciente (entrada){
    let bindvars = Object.assign({},entrada)

    bindvars.o_id_paciente = {
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
    const result = await database.simpleExecute(QueryPaciente,bindvars)

    return result.outBinds
}

module.exports = {
    createPaciente,
    Login,
    find
}