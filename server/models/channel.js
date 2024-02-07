const express = require("express")
const mongoose = require("mongoose")

const schema = mongoose.Schema

const channelschema = new schema({
    channelname:{
        type: String,
    },
    servername:{
        type:String,
    },
    channeltype:{
        type:String,
    },

})

module.exports = mongoose.model("channel",channelschema)