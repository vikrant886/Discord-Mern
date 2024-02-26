import React from "react";
import axios from "axios";

export const addchannel = (server,channelname ,type) => {
    return new Promise((resolve, reject) => {

        axios.post("http://localhost:8080/channel/addchannel", {
            server,
            type,
        })
            .then((res) => {
                resolve(true)
                console.log(res);
            })
            .catch((err) => {
                resolve(false)
                console.log(err);
            })
    })
}