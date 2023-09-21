const express=require('express')
const {addrole,getAllRoles}=require("../controller/role")



const roleRouter=express.Router()

roleRouter.post("/",addrole)
roleRouter.get("/",getAllRoles)



module.exports= roleRouter