import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from '../../../../firebaseconfig'
import { Homecontext } from "../../../context/homecontext";
import { socket } from "../../../socket";

export default function MessageField({ type }) {
    const messagebox = useRef()
    const { channelselected, serverdata, userdata, chatwith, message, setMessage } = useContext(Homecontext)
    // const [message, setMessage] = useState([]);
    const [val, setVal] = useState('');
    const inputref = useRef();
    console.log(message)
    useEffect(() => {
        console.log(chatwith.user)
    }, [message])
    const enter = (event) => {
        if (event.key === 'Enter') {
            console.log("hi");
            handlesubmit();
        }
    };

    const [currmess, setCurrmess] = useState(null);
    useEffect(() => {
        if (message && message.length > 0) {
            const currentUserMessages = message.find(msg => Object.keys(msg)[0] === chatwith.user);
            if (currentUserMessages) {
                setCurrmess(currentUserMessages[chatwith.user]);
            }
        }
    }, [message, chatwith.user]);


    useEffect(() => {
        socket.on("rec_message", (data) => {
            console.log("gotdata", data);
            setMessage(prevmessages => {
                const prev = [...prevmessages];
                const userindex = prev.findIndex(msg => Object.keys(msg)[0] === chatwith.user);
                if (userindex !== -1) {
                    // prev[userindex].val.push(val);
                    prev[userindex][chatwith.user].push({
                        val: data.val,
                        username: data.username,
                        image: data.image,
                        time: data.t,
                        date: data.date
                    })
                } else {
                    // console.log("hi")
                    prev.push({
                        [chatwith.user]: [{
                            val: data.val,
                            username: data.username,
                            image: data.image,
                            time: data.t,
                            date: data.date
                        }]
                    });
                }

                return prev;
            });
        });
        return () => {
            socket.off("rec_message");
        };
    }, []);

    function handlesubmit() {
        messagebox.current?.scrollIntoView({ behavior: 'smooth' });
        const time = new Date();
        const t = time.toLocaleTimeString()
        const date = time.toLocaleDateString()
        console.log(val);
        console.log(type)
        console.log("hi", userdata)
        socket.emit("message", { type: type, val: val, username: userdata.username, image: userdata.image ? userdata.image : null, to: chatwith.user, time: t, date: date });
        setMessage(prevMessages => {
            const prev = [...prevMessages];
            const userindex = prev.findIndex(msg => Object.keys(msg)[0] === chatwith.user);

            if (userindex !== -1) {
                // prev[userindex].val.push(val);
                prev[userindex][chatwith.user].push({
                    val: val,
                    username: userdata.username,
                    image: userdata.image,
                    time: t,
                    date: date
                })
            } else {
                // console.log("hi")
                prev.push({
                    [chatwith.user]: [{
                        val: val,
                        username: userdata.username,
                        image: userdata.image,
                        time: t,
                        date: date
                    }]
                });
            }

            return prev;
        });

        setVal("");
    }
    return (
        <div className="flex flex-col w-full justify-end items-center gap-2 pl-auto pb-4 h-[95%] ">
            <div className="h-[90%]   w-85 z-100">
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
                    <div  className="w-full h-full pt-10 p-2 flex flex-col gap-4  overflow-scroll">
                        {currmess && currmess.map((data, index) => (
                            <div className="flex flex-row gap-2">
                                <div className="flex ">
                                    <img src={data.image ? data.image : ""} className="rounded-full w-[40px] h-[40px]" alt="" />
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

            <div className="flex mt-auto justify-end bg-message-bar w-4/5 h-12 rounded-lg pr-4">
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