import React, { useContext, useRef, useState } from "react";
import { X, Pen } from 'lucide-react';
// import { addServer } from "../../utils/addserver";
import { ChevronRight } from 'lucide-react';
import ImageContainer from "../imagecontainer/imagecontainer";
import { Homecontext } from "../context/homecontext";

export default function EditAvatar({ image, setEditmodal }) {

    const { userdata, setUserdata } = useContext(Homecontext)
    const [usc, setUsc] = useState(null);  //user name change
    const [dnc, setDnc] = useState(null);  // display name change

    const handlechange=()=>{
        console.log(usc,dnc)
    }


    return (
        <div className="fixed inset-0 bg-black  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 " >
            <div className="flex w-[40%] h-[50%] bg-third flex-col rounded-md p-4" >
                <X className="text-text-two" onClick={() => { setEditmodal(false) }} />
                <div className="w-full h-full flex justify-center flex-col items-center">
                    <ImageContainer currimage={image} setImage={null} />
                    <div className="w-85 h-full flex gap-3 flex-col ">
                        <p className="flex flex-row text-text-three text-0.8r font-bold">USERNAME<p className="text-red-500 font-light"> *</p></p>
                        {
                            usc ? (
                                <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three" placeholder="Enter a Username" value={usc} style={{ outline: 'none' }} onChange={(e)=>{setUsc(e.target.value)}}/>
                            ) : (
                                <div className="flex text-white font-bold p-2">
                                    {userdata.username}
                                    <Pen className="ml-auto" onClick={()=>{setUsc(userdata.username)}}/>
                                </div>
                            )
                        }
                        <p className="flex flex-row text-text-three text-0.8r font-bold">DISPLAY NAME<p className="text-red-500 font-light"> *</p></p>
                        {
                            dnc ? (
                                <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three" placeholder="Enter a Name" value={dnc} style={{ outline: 'none' }} onChange={(e)=>{setDnc(e.target.value)}}/>
                            ) : (
                                <div className="flex text-white font-bold p-2">
                                    {userdata.name}
                                    <Pen className="ml-auto" onClick={()=>setDnc(userdata.name)} />
                                </div>
                            )
                        }
                        <button className="w-full p-0.8 mt-4 rounded-sm bg-loginbutton" onClick={handlechange} >SAVE CHANGES</button>
                    </div>
                </div>

            </div>
        </div>
    )
}