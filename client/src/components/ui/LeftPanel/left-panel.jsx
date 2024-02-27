import React, { useContext, useEffect, useState } from "react";
import AddServerModal from "../../AddServerModal/addservermodal";
import { LogOut, Plus } from 'lucide-react';
import Createownserver from "../../AddServerModal/create-own-server";
import { getservers } from "../../../utils/getservers";
import { serverclicked } from "../../../utils/serverclicked";
import { Homecontext } from "../../context/homecontext";
import { useNavigate } from "react-router-dom";
import { getfriends } from "../../../utils/getfriends";
import "../../../App.css"
import { handleLogout } from "../../../utils/loginhandler";

export default function LeftPanel() {
    const { allservers, setAllservers } = useContext(Homecontext)
    const [addServer, setAddServer] = useState(false);
    const { createownserver, setCreateownserver } = useContext(Homecontext);
    const { userdata, setUserdata } = useContext(Homecontext)
    const { serverdata, setServerdata, addfriend } = useContext(Homecontext)
    const { homeclicked, setHomeclicked } = useContext(Homecontext)
    const { searcheduser, setSearcheduser } = useContext(Homecontext)
    const { friends, setFriends } = useContext(Homecontext)
    const { friendsectionselected, setFriendsectionselected, setAllonline, setShowallfriends , messagefriend ,setMessagefriend } = useContext(Homecontext)
    const [friendchange, setFriendchange] = useState(false);
    const [modaltype , setModaltype] = useState("");

    const navigate = useNavigate()

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
            <button onClick={homebuttclicked} href="#">
                <img
                    className="flex w-12 h-12  "
                    src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png"
                    alt="User Profile"
                />
            </button>
            {addServer ? (
                <AddServerModal onClose={() => { setAddServer(false) }} createown={(e) => { setCreateownserver(true);setModaltype(e); }} />
            ) : (
                createownserver && <Createownserver modaltype={modaltype} createclose={() => { setCreateownserver(false) }} />
            )}

            <button onClick={() => { setAddServer(true) }} className="w-12 h-16 flex justify-center bg-third items-center rounded-full hover:bg-homegreen hover:rounded-xl transition duration-500 overflow-hidden">
                <Plus
                    size={36}
                    className="hovered-plus transition duration-500"
                />
            </button>
            <div className="w-4/5 h-0.5 bg-slate-600"></div>
            <div className="flex flex-col gap-4 h-full">
                {allservers && allservers.map((server, index) => (
                    <button onClick={() => buttonclicked(server)} href="##" key={index}>
                        <img
                            className="w-12 h-12 rounded-full hover:rounded-xl duration-1000 transition ease-in-out"
                            src={server.serverimage}  // Use serverimage as the source
                            alt={`Server ${index + 1}`}
                        />
                    </button>
                ))}
            </div>
            <button className="p-2" onClick={logout}>
                <LogOut className="text-text-one" />
            </button>

        </div>

    );
}
