import React, { useContext } from "react";
import axios from "axios";
import { Homecontext } from "../components/context/homecontext";

export const serverclicked = async (servername) => {
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_HOST+"channel/getchannels", { servername })
            .then((res) => {
                // console.log(res);
                resolve(res.data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    })
} 