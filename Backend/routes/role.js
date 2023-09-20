const express=require('express')
const {addrole}=require("../controller/role")



const roleRouter=express.Router()

roleRouter.post("/",addrole)



module.exports= roleRouter