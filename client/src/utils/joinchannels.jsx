import React from "react";
import { socket } from "../components/socket";

export const joinchannel=(data)=>{
    data.map((data,index)=>{
        socket.emit("joinchannel",{channelid:data._id})
    })
}