import React from "react";
import axios from "axios";

export const setonline = (username)=>{
    axios.post("http://localhost:8080/user",{username})
}