import React from "react";
import axios from "axios";

export const addchannel = (server,channelname ,type) => {
    return new Promise((resolve, reject) => {

        axios.post(process.REACT_APP_HOST+"channel/addchannel", {
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