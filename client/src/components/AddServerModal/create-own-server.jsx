import React, { useContext, useState } from "react";
import { X } from 'lucide-react';
import ImageContainer from "../imagecontainer/imagecontainer";
import { addServer } from "../../utils/addserver";
import { addchannel } from "../../utils/addchannel";
import { Homecontext } from "../context/homecontext";
import { socket } from "../socket";
import { createserverlink } from "../../utils/createServerLink";

export default function Createownserver({ modaltype, createclose }) {
    const [servername, setServername] = useState("");
    const [image, setImage] = useState();
    const {userdata} = useContext(Homecontext)

    function close() {
        createclose();
    }

    async function create() {
        try {
            console.log(image)
            const result = await addServer(servername, image);
            console.log(result);

            if (result) {
                const res = await addchannel({ servername, channelname: "general", channeltype: "text" })
                if (res) {
                    socket.emit("servercreated",{servername:servername,userdata:userdata})
                    createclose();
                }
            }
        } catch (error) {
            console.error("Error creating server:", error);
        }
    }
    async function join() {
        const res = await createserverlink({servername,username:userdata.username})
        socket.emit("joinserver",{servername:servername,userdata:userdata})
        createclose();
    }

    return (
        <>
            {
                modaltype === "create" ? (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="flex w-30 h-45 bg-third flex-col rounded-md items-center">
                            <div className="flex h-10 w-full text-text-two font-bold text-xl items-center relative left-0">
                                <p className="m-auto translate-x-1/3 translate-y-1/2">CREATE YOUR SERVER</p>
                                <X color="#FFFFFF" onClick={close} className="ml-auto cursor-pointer relative right-4" />
                            </div>
                            <ImageContainer  setImage={setImage}/>
                            <div className="flex justify-center flex-col w-85">
                                <p className="flex flex-row text-text-three font-bold text-0.8r text-left">Server Name<p className="text-red-500 font-light"> *</p></p>
                                <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three " placeholder="Enter Server Name" style={{ outline: 'none' }} onChange={(e) => setServername(e.target.value)} />
                                <button className="w-full p-0.8 mt-4 rounded-sm bg-loginbutton" onClick={create}>CREATE</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="flex w-30 h-45 bg-third flex-col rounded-md items-center">
                            <div className="flex h-10 w-full text-text-two font-bold text-xl items-center relative left-0">
                                <p className="m-auto translate-x-1/3 translate-y-1/2">JOIN A SERVER</p>
                                <X color="#FFFFFF" onClick={close} className="ml-auto cursor-pointer relative right-4" />
                            </div>
                            <div className="flex justify-center flex-col w-85 mt-12">
                                <p className="flex flex-row text-text-three font-bold text-0.8r text-left">Server Id<p className="text-red-500 font-light"> *</p></p>
                                <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three " placeholder="Enter a valid Server Id" style={{ outline: 'none' }} onChange={(e) => setServername(e.target.value)} />
                                <button className="w-full p-0.8 mt-4 rounded-sm bg-loginbutton" onClick={join}>JOIN</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
