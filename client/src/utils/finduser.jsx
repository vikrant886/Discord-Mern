import React from "react";
import axios from "axios";

export const Finduser = (username) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/user/finduser", { username })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(false);
            })
    })
}