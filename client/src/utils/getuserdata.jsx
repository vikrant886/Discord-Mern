import axios from "axios";
import { useContext } from "react";
import { Homecontext } from "../components/context/homecontext";



export const getuserdata = (username,setUserdata) => {
    axios.post(process.REACT_APP_HOST+'user/userdata', {
        "username": username,
    })
        .then((res) => {
            console.log(res);
            setUserdata(res.data.result);
        })
        .catch((err) => {
            console.error("An error occurred while logging in:", err);
        });
};