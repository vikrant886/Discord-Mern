import React, { useContext } from "react";
import { Homecontext } from "../../context/homecontext";

export default function Midfooter(){
    const {userdata} = useContext(Homecontext)
    return(
        <div className="bg-second border-t-2 border-third hover:bg-opacity-5 hover:bg-black flex items-center gap-3 p-2">
            <img src={userdata.image} className="w-8 h-8 rounded-full" alt="" />
            <div className="font-semibold text-text-two">{userdata.name}</div>

        </div>
    )
}