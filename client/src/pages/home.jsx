import React, { useState, useEffect, useRef } from "react";
import LeftPanel from "../components/ui/LeftPanel/left-panel";
import MidPanel from "../components/ui/MidPanel/mid-panel";
import RightPanel from "../components/ui/RightPanel/rightpanel";
import { Homecontext } from "../components/context/homecontext";
import { getservers } from "../utils/getservers";
import { getfriends } from "../utils/getfriends";
import Loading from "./loading";
import { getstatus } from "../utils/onlinestatus";
import { socket } from "../components/socket";
import CallModal from "../components/videoCall/callinitiateModal";
import Confirm from "../utils/Confirm";

export default function Home() {
    const [userdata, setUserdata] = useState("");
    const [allservers, setAllservers] = useState(null);
    const [serverdata, setServerdata] = useState([]);
    const [homeclicked, setHomeclicked] = useState(true);
    const [searcheduser, setSearcheduser] = useState(null);
    const [allchannels, setAllchannels] = useState([]);
    const [channelselected, setChannelselected] = useState(null);
    const [friends, setFriends] = useState({ firstres: [], secondres: [] });
    const [addfriend, setAddfriend] = useState(false);
    const [createownserver, setCreateownserver] = useState(false);
    const [showloading, setShowloading] = useState(true);
    const [friendsectionselected, setFriendsectionselected] = useState(true);
    const [allonline, setAllonline] = useState(true);
    const [showallfriends, setShowallfriends] = useState(false);
    const [onlinefriends, setOnlinefriends] = useState(null);
    const [chatwith, setChatwith] = useState({ user: "general", image: null });
    const [messagefriend, setMessagefriend] = useState(false);
    const [message, setMessage] = useState([]);
    const [serverimage, setServerimage] = useState([]);
    const [videoCall, setVideoCall] = useState(false);
    const pc = useRef(new RTCPeerConnection());
    // const [roomId, setRoomId] = useState(null)
    const [roomId, setRoomId] = useState(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const localRef = useRef('null');
    const remoteRef = useRef('null');
    const [showConfirm, setShowConfirm] = useState(null);
    const [confirm, setConfirm] = useState(false);
    // const pc = useRef(null); // Define pc at the top level

    function randInt(min, max, exclude) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num === exclude ? randInt(min, max, exclude) : num;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("userinfo"));
                console.log(user);
                setUserdata(user);
                socket.emit("registeronsocket", user);

                const fetchedservers = await getservers();
                setAllservers(fetchedservers.servers);

                const s_image = fetchedservers.servers.map(() => randInt(1, 13, 4));
                setServerimage(s_image);

                const allfriends = await getfriends();
                console.log(allfriends, "homefetch");
                setFriends(allfriends);

                const onlinestatus = await getstatus(allfriends);
                setOnlinefriends(onlinestatus);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setShowloading(false);
            }
        };

        fetchData();
    }, [createownserver]);

    useEffect(() => {
        // Handle socket events for offers and answers
        socket.on('offer', async (data) => {
            setShowConfirm(data);
            // if (res) {
            //     const roomId = data.roomId;
            //     socket.emit("join", { roomId });

            //     // Set the remote description with the received offer
            //     await handleOffer(data);
            // } else {
            //     socket.emit("decline", { roomId: data.roomId });
            // }
        });

        pc.current.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('ice', roomId)
                setTimeout(() => {
                    socket.emit("ice-candidate", {
                        candidate: event.candidate,
                        roomId: roomId,
                    });
                }, 1000);
            }
        };

        socket.on('answer', async (data) => {
            console.log("got answer")
            await handleAnswer(data);
        });

        socket.on('ice-candidate', async (data) => {
            console.log("got ice")
            await handleIceCandidate(data);
        });

        return () => {
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate')
        };
    }, []);

    const handleOffer = async ({ offer, roomId }) => {
        console.log("got offer", roomId)
        setVideoCall(true);
        setWebcamActive(true);
        if (remoteRef.current) {
            setRoomId(roomId)
            await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.current.createAnswer();
            await pc.current.setLocalDescription(answer);

            // Emit answer back to the caller
            socket.emit('answer', {
                answer,
                roomId: roomId,
            });
        }
    };

    const handleAnswer = async ({ answer, roomId }) => {
        setRoomId(roomId)
        await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleIceCandidate = async ({ candidate }) => {
        try {
            if (candidate) {
                await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
                console.log('ICE candidate added successfully');
            }
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    };

    const handleConfirm = async () => {
        if (showConfirm) {
            const roomId = showConfirm.roomId;
            setRoomId(roomId); // Set roomId
            socket.emit("join", { roomId }); // Inform server to join the room

            // Handle the incoming offer
            await handleOffer(showConfirm); // Accept the call and handle the offer
            setShowConfirm(false); // Close the confirm modal
        }
    };

    const handleDecline = () => {
        if (showConfirm) {
            socket.emit("decline", { roomId: showConfirm.roomId }); // Inform server to decline the call
            setShowConfirm(null); // Close the confirm modal
        }
    };



    return (
        <>
            {showloading ? (
                <Loading />
            ) : (
                <div className="flex row-auto h-screen w-screen overflow-hidden">
                    <Homecontext.Provider
                        value={{
                            videoCall,
                            setVideoCall,
                            message,
                            setMessage,
                            messagefriend,
                            setMessagefriend,
                            chatwith,
                            setChatwith,
                            userdata,
                            setUserdata,
                            serverdata,
                            setServerdata,
                            homeclicked,
                            setHomeclicked,
                            searcheduser,
                            setSearcheduser,
                            allchannels,
                            setAllchannels,
                            channelselected,
                            setChannelselected,
                            friends,
                            setFriends,
                            allservers,
                            setAllservers,
                            createownserver,
                            setCreateownserver,
                            addfriend,
                            setAddfriend,
                            friendsectionselected,
                            setFriendsectionselected,
                            allonline,
                            setAllonline,
                            showallfriends,
                            setShowallfriends,
                            serverimage,
                        }}
                    >
                        {showConfirm && (
                            <Confirm text={"You have an incoming video call. Do you want to accept?"} onConfirm={handleConfirm} onDecline={handleDecline} />
                        )}
                        {videoCall && <CallModal localRef={localRef} remoteRef={remoteRef} pc={pc} roomId={roomId} setRoomId={setRoomId} setWebcamActive={setWebcamActive} webcamActive={webcamActive} />}
                        <LeftPanel />
                        <MidPanel />
                        <RightPanel />
                    </Homecontext.Provider>
                </div>
            )}
        </>
    );
}
