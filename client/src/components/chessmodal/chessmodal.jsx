import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import Room from "../chess_integration/components/room";
import { UNSAFE_FetchersContext } from "react-router-dom";
import { Homecontext } from "../context/homecontext";
import axios from "axios";
import { socket } from "../socket";
import Play from "../chess_integration/components/play";

export default function Chessmodal({ chess, setChess }) {

    const { friends, userdata } = useContext(Homecontext)
    const [selected, setSelected] = useState(null)
    const [play, setPlay] = useState(false);
    const [room,setRoom] = useState(null);
    const [color,setColor] = useState("w")
    console.log(chess)

    useEffect(()=>{
        if(chess.data!=""){
            setRoom(chess.data);
            setColor("b");
            setPlay(true);
        }
    },[])

    const handleclick = async () => {
        try {
            const response = await axios.post(
                "https://chessable-backend-u08b.onrender.com/create_room"
            );
            // console.log(response);
            const roomid = response.data.room
            setRoom(roomid)
            console.log(roomid)
            socket.emit("chessreqcreated", {
                from: userdata.username,
                user: selected.firstuser === userdata.username ? selected.seconduser : selected.firstuser,
                roomid: roomid,
            })
            setPlay(true)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="fixed inset-0 bg-black  bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 " >
            {
                play ? (
                    <div className="w-[80%] rounded-md h-[100%] overflow-hidden p-2 flex flex-col items-center">
                        <X onClick={() => {setPlay(false);setRoom(null); setChess({val:false,data:""}); }} className="text-white size-8 ml-auto" />
                        <Play color={color} room={room} />
                    </div>
                ) : (
                    <div className="w-[20%] rounded-md h-[40%] bg-third overflow-hidden p-2 flex flex-col items-center">
                        <X onClick={() => {setPlay(false);setRoom(null); setChess({val:false,data:""}); }} className="text-white size-8 ml-auto" />
                        <div className="w-full h-[70%] gap-2 flex items-center flex-col pt-4 overflow-scroll">
                            {
                                friends.firstres.map((val, index) => (
                                    <div key={index}
                                        onClick={() => { setSelected(val) }}
                                        className="flex gap-8 items-center uppercase font-bold hover:bg-white text-text-one hover:text-text-two hover:bg-opacity-5 w-[90%] rounded-lg p-4"
                                    >
                                        <img src={val.firstuser === userdata.username ? val.secondimage : val.firstimage} className="rounded-full w-12 h-12" alt="" />
                                        <div className=" ">{val.firstuser === userdata.username ? val.seconduser : val.firstuser}</div>
                                        <div className="border border-white rounded-full ml-auto w-4 h-4 flex justify-center items-center">
                                            <div className={`${selected === val ? "bg-white rounded-full w-2 h-2" : ""}`}></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <button className="w-[80%] mt-4 rounded-md bg-loginbutton p-4" onClick={() => { handleclick() }}>SEND REQUEST</button>
                    </div>
                )
            }
        </div>
    )
}