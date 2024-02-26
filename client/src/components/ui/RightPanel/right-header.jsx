import React, { useContext, useEffect, useState } from "react";
import { Homecontext } from "../../context/homecontext";
import { Check, UserRound } from "lucide-react";
import { Bell, Inbox } from "lucide-react";
import { acceptreqeust } from "../../../utils/Addfriend";
import { socket } from "../../socket";

export default function Rightheader({ setAddfriendclicked, setShowallfriends, setAllonline, setPending }) {
    const { friendsectionselected, friends ,userdata ,channelselected } = useContext(Homecontext)
    const [notification, setNotification] = useState(false);
    const [filtered, setFiltered] = useState([]);
 
    const friendreq=async(data)=>{
        console.log(data)
        await acceptreqeust(data.userdata,data.searcheduser);
        socket.emit("requestaccepted",data);
        setFiltered(filtered => filtered.filter(user => user.userdata !== data.userdata));
    }

    useEffect(()=>{
        socket.connect();
        socket.emit("fetchallreq",)
        socket.on("friendreq",(data)=>{
            console.log(data);
            const fdata = new Set(data)
            setFiltered(d => d.concat(Array.from(fdata).filter((user)=>user.searcheduser===userdata.username)))
        })
    },[socket])

    return (
        <div className="h-12 w-full  bg-third shadow-md z-40">
            {friendsectionselected ? (
                <div className="flex flex-row w-full h-full items-center justify-left gap-4 pr-4 z-10">
                    <div className="flex flex-row pl-4 h-full justify-center items-center gap-2">
                        <UserRound className="w-4 h-4 text-text-two" />
                        <p className="text-text-two">Friends</p>
                        <div className=" border border-solid border-text-three rounded-lg h-60 "></div>
                    </div>
                    <button className="text-text-one hover:text-text-two hover:bg-white hover:bg-opacity-5 pl-2 pr-2 rounded-md" onClick={() => { setAllonline(true); setShowallfriends(false); setAddfriendclicked(false); setPending(false) }}>Online</button>
                    <button className="text-text-one hover:text-text-two hover:bg-white hover:bg-opacity-5 pl-2 pr-2 rounded-md" onClick={() => { setAllonline(false); setShowallfriends(true); setAddfriendclicked(false); setPending(false) }}>All</button>
                    <button className="text-text-one hover:text-text-two hover:bg-white hover:bg-opacity-5 pl-2 pr-2 rounded-md" onClick={() => { setAllonline(false); setShowallfriends(false); setAddfriendclicked(false); setPending(true) }}>Pending</button>
                    <button className="w-24 bg-red-900 rounded-md pl-2 pr-2 text-text-two " onClick={() => { setAddfriendclicked(true); setShowallfriends(false); setAllonline(false) }}>Add friend</button>
                    <Bell className="flex ml-auto text-text-one hover:text-text-two " onClick={() => { notification ? setNotification(false) : setNotification(true) }} />
                    {
                        filtered ? (filtered.length > 0 && <div className="w-2 h-2 bg-red-600 rounded-full relative right-5 bottom-2"></div>) : null
                    }
                </div>
            ) : (
                <div className="flex w-full h-full items-center pl-4 pr-4">
                    <div className="text-text-one text-lg">{channelselected ? channelselected.channelname : null}</div>
                </div>
            )
            }
            {notification &&
                <div className="z-50 w-96 h-56  animate-drop_down ml-auto bg-second shadow-2xl rounded-md  ">
                    <div className="flex flex-row items-center p-1 justify-center w-full  gap-4 shadow-md">
                        <Inbox className="text-text-one " />
                        <h2 className=" text-text-one font-semibold">Inbox</h2>
                    </div>
                    <div className="w-full flex justify-center flex-col">
                        {filtered.map((data, index) => (
                            <>
                                <div key={index} className="w-full flex  hover:bg-white hover:bg-opacity-5 text-text-one hover:text-text-two p-2">
                                    {data.userdata}
                                    <Check className="ml-auto " onClick={()=>{friendreq(data)}} />
                                </div>

                            </>
                        ))}
                    </div>

                </div>
            }

        </div>
    )
}

