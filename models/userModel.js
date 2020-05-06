const pool = require('../db');

async function getUserByUsernameAndPassword(user, password){
    try{
        let query = "select id,user,role from usuarios where user = ? and password = ?";
        const rows = await pool.query(query, [user,password]);
        return rows;
    }catch(error){
        //start transaction | rollback
        throw error //Pasar el error al padre
    }
}
async function createUser(objeto){
    try{
        //Se usa object notation para el insert a la tabla
        //Recordar que todas las propiedades del objeto deben coincidir con los campos de la tabla
        let query = "insert into usuarios set ?"
        const rows = await pool.query(query, [objeto])
        return rows.insertId;
    }catch(error){
        throw error; //propaga el error
    }
  }
module.exports = {createUser,getUserByUsernameAndPassword}