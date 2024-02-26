const mongoose = require('mongoose')
const schema = mongoose.Schema

const onlineuser = new schema({
    username:{
        type:String,
    },
    isonline:{
        type:Boolean,
    }
})

module.exports=mongoose.model("useronline",onlineuser)