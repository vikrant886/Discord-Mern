import React, { useRef } from "react";
import { X } from 'lucide-react';
// import { addServer } from "../../utils/addserver";
import { ChevronRight } from 'lucide-react';

export default function Addservermodal({ onClose, createown }) {

    const modalref = useRef();
    const closeModal = (e) => {
        if (modalref.current === e.target) {
            onClose();
        }
    }
    function createownserver(data) {
        onClose();
        createown(data);
    }
    return (
        <div ref={modalref} onClick={closeModal} className="fixed inset-0 bg-black  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 " >
            <div className="flex w-30 h-90 bg-third flex-col rounded-md" >
                <div className="flex h-10 w-full text-homegreen font-bold text-xl items-center relative left-0">
                    <p className="m-auto translate-x-1/2 translate-y-1/2">ADD A SERVER</p>
                    <X color="#FFFFFF" onClick={onClose} className="ml-auto cursor-pointer relative right-4" />
                </div>
                <div className="flex flex-col w-full h-full gap-8 pt-8 items-center">
                    <div className="flex flex-row justify-between border-solid border items-center text-text-one w-85 p-4 rounded-lg hover:text-text-two hover:bg-white hover:bg-opacity-5"
                        onClick={()=>{createownserver("create")}}
                    >
                        <>
                            <div className="w-12 h-12 rounded-full"
                                style={{
                                    backgroundImage: `url(${require("./create.png")})`,
                                }}
                            ></div>
                            Create My Own
                        </>
                        <ChevronRight size={32} color="#ffffff" />
                    </div>
                    <div className="flex flex-row justify-between items-center border-solid border text-text-one hover:text-text-two w-85 p-4 rounded-lg hover:bg-white hover:bg-opacity-5"
                    onClick={()=>{createownserver("join")}}
                    >
                        Join Server
                        <ChevronRight size={32} color="#ffffff" />
                    </div>
                </div>
            </div>
        </div>
    )
}