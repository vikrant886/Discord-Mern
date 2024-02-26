import React from "react";
import axios from "axios";

export const Finduser = (username) => {
    return new Promise((resolve, reject) => {
        console.log("hi",process.env.REACT_APP_HOST);
        axios.post(process.env.REACT_APP_HOST+"user/finduser", { username })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(false);
            })
    })
}