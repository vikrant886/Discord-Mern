import React, { useContext, useEffect } from "react";
import { db } from '../../../../firebaseconfig'
import { Homecontext } from "../../../context/homecontext";


export default function MessageField() {
    const { channelselected ,serverdata } = useContext(Homecontext)

    useEffect(() => {

    }, [])
    function handleclick() {
        console.log("sent clicked")
        console.log("hello");
    }
    return (
        <div className="flex flex-col w-full justify-end items-center pl-auto pb-4 h-full ">
            <div className="h-full w-85 z-100">
                {channelselected && channelselected.channelname === "general" ? (
                    <div className="w-full h-full flex flex-col justify-end items-center pb-8">
                        <p className="text-text-two text-4xl font-bold">
                            Welcome to
                        </p>
                        <p className="text-text-two text-4xl font-bold">
                            {serverdata.servername}
                        </p>
                    </div>
                ) : (
                    // Render other content or leave empty
                    null
                )}

            </div>

            <div className="flex justify-end bg-message-bar w-4/5 h-12 rounded-lg pr-4">
                <input
                    className="w-full h-full rounded-lg pl-4 pr-4 text-emerald-50 bg-message-bar"
                    type="text"
                    placeholder="Type your message here"
                    style={{ outline: 'none' }}
                />
                <button className="ml-2" onClick={handleclick}>
                    <img
                        className="w-6 h-6"
                        src="https://cdn-icons-png.flaticon.com/512/3682/3682321.png"
                        alt="Send"
                    />
                </button>
            </div>
        </div>
    )
}