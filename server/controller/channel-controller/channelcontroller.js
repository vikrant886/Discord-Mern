const channel = require("../../models/channel");
const server = require("../../models/server");

module.exports.createchannel=async(req,res)=>{
    const {servername ,channelname, channeltype}=req.body.server
    try{
        const data=new channel({
            channelname:channelname,
            servername:servername,
            channeltype:channeltype,
        })
        const result = await data.save()
        res.json({message:"channel created",result})
    }
    catch{
        console.log("error")
    }
}

module.exports.getchannels=async(req,res)=>{
    const servername=req.body
    const result = await channel.find(servername)
    res.json({message:"hello there",result})
}