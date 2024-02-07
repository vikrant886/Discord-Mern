const router =require('express').Router()
const {addserver , getservers ,createServerLink} = require("../controller/server-controller/servercontroller")

router.post('/addserver',addserver)
router.post('/getservers',getservers)
router.post('/createlink',createServerLink)

module.exports= router;