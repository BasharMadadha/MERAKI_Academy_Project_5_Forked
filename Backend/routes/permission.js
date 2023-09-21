const express=require('express')
const {addpermissions,getAllPermissions}=require("../controller/permission")



const permissionRouter=express.Router()

permissionRouter.post("/add",addpermissions)
permissionRouter.get("/",getAllPermissions)



module.exports= permissionRouter