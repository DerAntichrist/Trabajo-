const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')

router.get('/user', async (req,res,next)=>{
    try{
        res.json({status : true, message : 'Usuario autenticado'})
    }catch(error){
        res.status(500).json({status : false})
    }
})

router.post('/new', async (req,res,next)=>{
    try{
      let object = { 
        Nombre : req.body.Nombre,
        Descripcion : req.body.Descripcion,
        Stock : req.body.Stock,
        Estado : req.body.Estado,
      }
      let result = await productModel.createProduct(object)
      console.log(req.body)
      res.json({status : true, message : 'Producto cargado con exito'})
    }catch(error){
      console.log(error)
      res.status(500).json({status : false, message : error})
    }
  })
  
module.exports = router