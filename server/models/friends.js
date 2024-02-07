const mongoose = require('mongoose')
const schema = mongoose.Schema

const friendschema = new schema({
    firstuser:{
        type:String,
    },
    seconduser:{
        type:String,
    },
    firstimage:{
        type:String,
    },
    secondimage:{
        type:String,
    },
    status:{
        type:Boolean,
    }
})

module.exports=mongoose.model("friends",friendschema)