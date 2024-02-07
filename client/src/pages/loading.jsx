import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/home')
    }, 4000);

    return (
        <div className="bg-third w-screen h-screen flex justify-center items-center flex-col gap-4">
            <div
                className="w-48 h-48 flex justify-center object-cover items-center bg-no-repeat bg-white"
                style={{
                    backgroundImage: `url(${require("../images/tt.gif")})`,
                }}
                
            ></div>
            <h1 className="text-text-one font-bold text-right">Hang On....</h1>
        </div>
    )
}