const oracledb = require('oracledb')
const database = require('../services/database')

let login =`select * from medicoRoles where email= :userss`

async function Login (entrada){
   
    const result = await database.simpleExecute(login,{userss:entrada.userSS});
    
    return result
}
let baseQuery = `select * from medicoRoles`;

async function find() {
    let query = baseQuery 
    const binds = {}

    const result = await database.simpleExecute(query,binds)

    return result.rows
}

const QueryRadiologo = 
`
BEGIN
IngresoRadiologo(:i_dpi_m, :i_nombre_m, :i_apellido_m, :i_email_u, :i_password_u, :i_rol_users, :o_id_radiologo, :o_error, :o_error_msg);
END;
`;

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
    
    const result = await database.simpleExecute(QueryRadiologo,bindvars)

    return result.outBinds
}

module.exports = {
    createRadiologo,
    Login,
    find
}