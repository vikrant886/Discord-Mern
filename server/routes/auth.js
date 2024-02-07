const router =require('express').Router()
const register= require('../controller/auth/register')
const login = require("../controller/auth/login")
const logout = require("../controller/auth/logout")
const finduser = require("../controller/auth/finduser")
const userdata = require("../controller/auth/userdata")

router.post("/login",login)
router.post("/logout",logout)
router.post("/register",register)
router.post("/finduser",finduser)
router.post("/userdata",userdata)

module.exports= router;