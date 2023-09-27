const express=require('express')
const {addrole,getAllRoles,beAdmin}=require("../controller/role")



const roleRouter=express.Router()

roleRouter.post("/addrole",addrole)
roleRouter.get("/getAllRoles",getAllRoles)
roleRouter.put("/beAdmin",beAdmin)


module.exports= roleRouter