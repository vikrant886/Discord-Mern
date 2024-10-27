import React, { useContext, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { Homecontext } from "../context/homecontext";
import { socket } from "../socket";

export default function CallModal({ pc, setWebcamActive, webcamActive, setRoomId, roomId,localRef,remoteRef }) {
    const { friends, userdata } = useContext(Homecontext);
    const [selected, setSelected] = useState(null);
    const [localStream, setLocalStream] = useState(null); // Track local stream
    
    const [id, setId] = useState('');
    const { setVideoCall } = useContext(Homecontext);

    useEffect(() => {
        if (webcamActive) {
            setupPeerConnection();
        }
    }, [webcamActive]);

    const setupPeerConnection = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream); // Save local stream to state

            if (localRef.current) {
                stream.getTracks().forEach((track) => {
                    pc.current.addTrack(track, stream);
                });
                localRef.current.srcObject = stream;
            }

            pc.current.ontrack = (event) => {
                if (remoteRef.current) {
                    console.log("Remote stream received", event.streams[0]);
                    remoteRef.current.srcObject = event.streams[0];
                } else {
                    console.log("remoteRef is not defined when ontrack is called");
                }
            };


            // Set up onicecandidate event to send candidates to the other peer
            pc.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("ice-candidate", {
                        candidate: event.candidate,
                        roomId: roomId,
                    });
                }
            };

            if (selected) {
                const offer = await pc.current.createOffer();
                await pc.current.setLocalDescription(offer);

                socket.emit('offer', {
                    offer,
                    roomId: id,
                    user: selected.firstuser === userdata.username ? selected.seconduser : selected.firstuser,
                });
            }

        } catch (error) {
            console.error("Error setting up peer connection:", error);
        }
    };

    const generateRoomID = () => Math.round(Math.random() * 1000);

    const handleClick = async () => {
        try {
            const roomId = generateRoomID();
            setId(roomId);
            socket.emit("join", { roomId });
            setId(roomId);
            setWebcamActive(true);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClose = () => {
        if (localStream) {
            // alert("local stream remmoved")
            localStream.getTracks().forEach((track) => track.stop()); // Stop camera and microphone
            setLocalStream(null);
        }
        setWebcamActive(false);
        setVideoCall(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-40">
            {
                !webcamActive ? (
                    <div className="w-[20%] rounded-md h-[40%] bg-third overflow-hidden p-2 flex flex-col items-center">
                        <X onClick={handleClose} className="text-white size-8 ml-auto" />
                        <div className="w-full h-[70%] gap-2 flex items-center flex-col pt-4 overflow-scroll">
                            {
                                friends.firstres.map((val, index) => (
                                    <div key={index}
                                        onClick={() => { setSelected(val) }}
                                        className="flex gap-8 items-center uppercase font-bold hover:bg-white text-text-one hover:text-text-two hover:bg-opacity-5 w-[90%] rounded-lg p-4"
                                    >
                                        <img src={val.firstuser === userdata.username ? val.secondimage : val.firstimage} className="rounded-full w-12 h-12" alt="" />
                                        <div>{val.firstuser === userdata.username ? val.seconduser : val.firstuser}</div>
                                        <div className="border border-white rounded-full ml-auto w-4 h-4 flex justify-center items-center">
                                            <div className={`${selected === val ? "bg-white rounded-full w-2 h-2" : ""}`}></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <button className="w-[80%] mt-4 rounded-md bg-loginbutton p-4" onClick={handleClick}>SEND REQUEST</button>
                    </div>
                ) : (
                    <div className="w-[80%] rounded-md h-[90%] bg-third overflow-hidden p-2 flex flex-col items-center">
                        <X onClick={handleClose} className="text-white size-8 ml-auto" />
                        <div className="flex flex-row w-full h-full justify-center items-center">
                            <video ref={localRef} autoPlay playsInline className="doc-video bg-second p-8 rounded-xl w-auto h-auto" />
                            <video ref={remoteRef} autoPlay playsInline className="doc-video w-40 h-40" />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
