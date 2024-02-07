const router= require("express").Router()
const {createchannel ,getchannels} = require("../controller/channel-controller/channelcontroller")

router.post('/addchannel',createchannel)
router.post('/getchannels',getchannels)

module.exports=router