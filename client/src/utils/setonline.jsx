import React from "react";
import axios from "axios";

export const setonline = (username)=>{
    axios.post(process.env.REACT_APP_HOST+"user",{username})
}