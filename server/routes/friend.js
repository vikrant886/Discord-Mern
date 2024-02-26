const router= require("express").Router()
const {addfriend , getfriend ,onlinefriends , acceptrequest,removefriend} = require("../controller/friends-controller/friendscontroller")

// console.log("here");
router.post('/addfriend',addfriend)
router.post('/getfriend',getfriend)
router.post('/status',onlinefriends)
router.post('/acceptrequest',acceptrequest)
router.post('/removefriend',removefriend)

module.exports=router