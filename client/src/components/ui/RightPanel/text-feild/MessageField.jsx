import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from '../../../../firebaseconfig'
import { Homecontext } from "../../../context/homecontext";
import { socket } from "../../../socket";

export default function MessageField({ type }) {
    const { channelselected, serverdata, userdata, chatwith } = useContext(Homecontext)
    const [message, setMessage] = useState([]);
    const [val, setVal] = useState('');
    const inputref = useRef();
    console.log(message)
    useEffect(() => {

    }, [])
    const enter = (event) => {
        if (event.key === 'Enter') {
            console.log("hi");
            handlesubmit();
        }
    };

    useEffect(() => {
        socket.on("rec_message", (data) => {
            console.log("gotdata", data);
            setMessage(prevMessages => [...prevMessages, data]);
        });
        return () => {
            socket.off("rec_message");
        };
    }, []);

    function handlesubmit() {
        const time = new Date();
        const t = time.toLocaleTimeString()
        const date = time.toLocaleDateString()
        console.log(val);
        console.log("hi", userdata)
        socket.emit("message", { type: type, val: val, from: userdata.username, image: userdata.image, to: userdata.username === chatwith.firstuser ? chatwith.seconduser : chatwith.firstuser , time:t ,date: date });
        setMessage(prevMessages => [...prevMessages, { val, username: userdata.username, image: userdata.image, time: t, date: date }]);
        setVal("");
    }
    return (
        <div className="flex flex-col w-full justify-end items-center gap-2 pl-auto pb-4 h-full ">
            <div className="h-full w-85 z-100">
                {message.length == 0 && channelselected && channelselected.channelname === "general" && type === "c" ? (
                    <div className="w-full h-full flex flex-col justify-end items-center pb-8">
                        <p className="text-text-two text-4xl font-bold">
                            Welcome to
                        </p>
                        <p className="text-text-two text-4xl font-bold">
                            {serverdata.servername}
                        </p>
                    </div>
                ) : (
                    <div className="w-full h-full pt-28 p-2 flex flex-col gap-4 overflow-scroll">
                        {message.map((data, index) => (
                            <div className="flex flex-row gap-2">
                                <div className="flex ">
                                    <img src={data.image} className="rounded-full w-[40px] h-[40px]" alt="" />
                                </div>
                                <div className="text-white" key={index}>
                                    <div className="text-sm text-text-three flex flex-row gap-2 items-center">
                                        <div className="text-white text-lg font-bold">{data.username}</div>
                                        <div>
                                            {data.date}
                                        </div>
                                        {data.time}
                                    </div>
                                    {data.val}
                                </div>
                            </div>
                        ))}
                    </div>
                )
                }

            </div>

            <div className="flex justify-end bg-message-bar w-4/5 h-12 rounded-lg pr-4">
                <input
                    ref={inputref}
                    className="w-full h-full rounded-lg pl-4 pr-4 p-4 text-emerald-50 bg-message-bar"
                    type="text"
                    placeholder="Type your message here"
                    value={val}
                    style={{ outline: 'none' }}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyPress={enter}
                />
                <button className="ml-2" onClick={(e) => { handlesubmit() }}>
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