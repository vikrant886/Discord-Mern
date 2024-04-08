import React, { useContext, useEffect, useState } from "react";
import AddServerModal from "../../AddServerModal/addservermodal";
import { LogOut, Plus } from 'lucide-react';
import Createownserver from "../../AddServerModal/create-own-server";
import { Homecontext } from "../../context/homecontext";
import { useNavigate } from "react-router-dom";
import "../../../App.css"
import { handleLogout } from "../../../utils/loginhandler";
import Chessmodal from "../../chessmodal/chessmodal";
import { socket } from "../../socket";
import axios from "axios";
// import { getservers } from "../../../utils/getservers";
// import { getfriends } from "../../../utils/getfriends";
// import { serverclicked } from "../../../utils/serverclicked";

export default function LeftPanel() {
    const { allservers, setAllservers ,serverimage } = useContext(Homecontext)
    const [addServer, setAddServer] = useState(false);
    const { createownserver, setCreateownserver } = useContext(Homecontext);
    const { userdata, setUserdata } = useContext(Homecontext)
    const { serverdata, setServerdata, addfriend } = useContext(Homecontext)
    const { homeclicked, setHomeclicked } = useContext(Homecontext)
    const { searcheduser, setSearcheduser } = useContext(Homecontext)
    const { friends, setFriends } = useContext(Homecontext)
    const { friendsectionselected, setFriendsectionselected, setAllonline, setShowallfriends, messagefriend, setMessagefriend } = useContext(Homecontext)
    const [friendchange, setFriendchange] = useState(false);
    const [modaltype, setModaltype] = useState("");
    const [chess, setChess] = useState({ val: false, data: "" });
    const navigate = useNavigate()


    useEffect(() => {
        socket.on("chessacc", (data) => {
            // alert(data);
        })
        socket.on("chessreq", (data) => {
            /* eslint-disable no-restricted-globals */
            let res = confirm(`${data.from} sent you a CHESS challenge`);
            /* eslint-enable no-restricted-globals */
            console.log("new chess req")
            if (res) {
                validate({ room: data.roomid, from: data.from })
            }
            else {
                console.log("req rejected")
            }
        });

        const validate = async ({ room, from }) => {
            try {
                const response = await axios.post(
                    "https://chessable-backend-u08b.onrender.com/validate",
                    {
                        room,
                    }
                );
                console.log(response);
                if (response.data.status === true) {
                    setChess({ val: true, data: room });
                    socket.emit("chessreqacc", { from: from })
                }
            } catch (e) {
                console.error("join room request error!");
            }
        }


        return () => {
            socket.off("chessreq");
            socket.off("chessacc");
        };
    }, []);

    function buttonclicked(server) {
        setMessagefriend(false);
        setHomeclicked(false);
        setServerdata(server)
        setFriendsectionselected(false);
    }

    const homebuttclicked = async () => {
        setSearcheduser(null)
        setHomeclicked(true);
        setFriendsectionselected(true);
        setAllonline(true);
        setShowallfriends(false);
    }
    function logout() {
        console.log("logout called");
        handleLogout(userdata.username);
        localStorage.removeItem("userinfo");
        navigate('/')
    }

    return (
        <div className="flex flex-col bg-first w-24 h-full z-100 gap-4 items-center pt-4">
            <div className="flex flex-col gap-4">
                <button onClick={homebuttclicked} href="#">
                    <img
                        className="flex w-12 h-12  "
                        src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png"
                        alt="User Profile"
                    />
                </button>
                {
                    chess.val ? (
                        <Chessmodal chess={chess} setChess={setChess} />
                    ) : null
                }
                {addServer ? (
                    <AddServerModal onClose={() => { setAddServer(false) }} createown={(e) => { setCreateownserver(true); setModaltype(e); }} />
                ) : (
                    createownserver && <Createownserver modaltype={modaltype} createclose={() => { setCreateownserver(false) }} />
                )}

                <button onClick={() => { setAddServer(true) }} className="w-12 h-12 flex justify-center bg-third items-center rounded-full hover:bg-homegreen hover:rounded-xl transition duration-500 overflow-hidden">
                    <Plus
                        size={36}
                        className="hovered-plus transition duration-500"
                    />
                </button>
            </div>
            <div className="w-4/5 h-0.5 bg-slate-600"></div>
            <div className="flex flex-col gap-4 h-full">
                {allservers && allservers.map((server, index) => (
                    <button onClick={() => buttonclicked(server)} href="##" key={index}>
                        <img
                            className="w-12 h-12 rounded-full hover:rounded-xl duration-1000 transition ease-in-out"
                            src={server.serverimage ? server.serverimage : require(`../../../images/Avatar/${serverimage[index]}.png`)}
                            alt={`Server ${index + 1}`}
                        />
                    </button>
                ))}
            </div>
            <div className="w-4/5 h-0.5 bg-slate-600"></div>
            <div className=" h-full w-full flex flex-col items-center">
                <button onClick={() => { setChess({ val: !chess.val, data: "" }) }}>
                    <img src="https://th.bing.com/th/id/OIP.Kmbf3tCX57OyB69xPGMd0AHaHa?rs=1&pid=ImgDetMain" className="rounded-full size-12" alt="" />
                </button>
            </div>
            <button className="p-2" onClick={logout}>
                <LogOut className="text-text-one" />
            </button>

        </div>

    );
}
