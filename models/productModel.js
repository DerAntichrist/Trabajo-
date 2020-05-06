const pool = require('../db');

async function createProduct(objeto){
    try{
        let query = "insert into productos set ?"
        const rows = await pool.query(query, [objeto])
        return rows;
    }catch(error){
        throw error; 
    }
  }
  
module.exports = {createProduct}