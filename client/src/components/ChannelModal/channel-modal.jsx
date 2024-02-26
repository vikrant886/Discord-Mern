import React, { useContext, useState } from "react";
import { useRef } from "react";
import { X, Hash, Volume2 } from "lucide-react";
import { addchannel } from "../../utils/addchannel";

export default function CreateChannelModal({ closemodal, servername }) {
    const [channelname, setChannelname] = useState("")
    const [channeltype , setChanneltype] = useState(true)
    const modalRef = useRef();
    const textref = useRef();
    const voiceref = useRef();

    const createOwnServer = () => {
        console.log("Creating own server");
    };
    function handletextclick(){
        setChanneltype("text");
        if(textref.current){
            voiceref.current.style.backgroundColor = 'transparent'; 
            textref.current.style.backgroundColor = 'white'; 
        }
    }
    function handlevoiceclick(){
        setChanneltype("voice");
        if(voiceref.current){
            textref.current.style.backgroundColor = 'transparent'; 
            voiceref.current.style.backgroundColor = 'white'; 
        }
    }

    const handleModalClick = (e) => {
        if (modalRef.current === e.target) {
            closemodal()
        }
    };
    const createchannel=async()=>{
        const res = await addchannel({servername,channelname,channeltype})
        if(res){
            closemodal()
        }
    }

    return (
        <div ref={modalRef} onClick={handleModalClick} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="flex w-30 h-80 bg-third flex-col rounded-md ">
                <div className="flex h-10 w-full text-text-two font-bold text-xl items-center relative left-0">
                    <p className="m-auto text-right relative left-12">CREATE A CHANNEL</p>
                    <X onClick={closemodal} className="ml-auto cursor-pointer text-text-one hover:text-text-two relative right-4" />
                </div>
                <div className="pl-8 text-text-three font-semibold text-sm pt-8  ">CHANNEL-TYPE</div>
                <div className="flex flex-col  w-full h-1/3 gap-4 p-4 pl-8">
                    <div className="w-95 h-33 bg-second rounded-md hover:bg-white hover:bg-opacity-5 pr-4 flex items-center " onClick={handletextclick}>
                        <div className="w-20 h-full  flex justify-center items-center">
                            <Hash className="text-icons" />
                        </div>
                        <div className="text-text-one w-85 ">Text Channel</div>
                        <div className="bg-transparent w-4 h-4 rounded-full border flex justify-center items-center">
                            <div  ref={textref} className="bg-transparent w-2 h-2 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-95 h-33 bg-second rounded-md hover:bg-white hover:bg-opacity-5 flex pr-4 items-center " onClick={handlevoiceclick}>
                        <div className="w-20 h-full  flex justify-center items-center">
                            <Volume2 className="text-icons" />
                        </div>
                        <div className="text-text-one w-85">Voice Channel</div>
                        <div className="bg-transparent w-4 h-4 rounded-full border  flex justify-center items-center">
                            <div  ref={voiceref} className="bg-transparent w-2 h-2 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="pl-8 text-text-three font-semibold text-sm pt-8 ">CHANNEL-NAME</div>
                <div className="w-full flex justify-center items-center flex-col gap-4 pt-4">
                    <input type="text" className="p-1 w-85 rounded-md text-xs bg-first text-text-three" placeholder="Enter a ChannelName" style={{ outline: 'none' }} onChange={(e) => setChannelname(e.target.value)} />
                    <button className="w-85 p-0.8 mt-4 rounded-sm bg-loginbutton" onClick={createchannel} >CREATE</button>
                </div>

            </div>
        </div>
    );
}
