import React, { useContext } from "react";
import axios from "axios";
import { Homecontext } from "../components/context/homecontext";

export const serverclicked = async (servername) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/channel/getchannels", { servername })
            .then((res) => {
                // console.log(res);
                resolve(res.data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    })
} 