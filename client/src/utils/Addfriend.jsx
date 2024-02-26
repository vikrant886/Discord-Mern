import React from "react";
import axios from "axios";

export const Addfriend = (firstname, secondname, firstimage, secondimage) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/friend/addfriend", { firstname, secondname, firstimage, secondimage })
            .then((res) => {
                // console.log(res);
                if (res.data.message === "already") {
                    resolve(false)
                }
                else {
                    resolve(res.data.result)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export const acceptreqeust = (firstuser, seconduser) => {
    console.log(firstuser, seconduser)
    axios.post("http://localhost:8080/friend/acceptrequest", { firstuser, seconduser })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}


export const removefriend = (_id) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/friend/removefriend", { _id })
            .then((res) => {
                console.log("friend removed");
                if (res.data.message === "removeed") {
                    resolve(true);
                } else {
                    resolve(false);
                }
                console.log(res);
            })
            .catch((err) => {
                resolve(false);
                console.log(err);
            });
    });
};
