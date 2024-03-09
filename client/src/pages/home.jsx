import React, { useState, useEffect } from "react";
import LeftPanel from "../components/ui/LeftPanel/left-panel";
import MidPanel from "../components/ui/MidPanel/mid-panel";
import RightPanel from "../components/ui/RightPanel/rightpanel";
import { Homecontext } from "../components/context/homecontext";
import { getservers } from "../utils/getservers";
import { getfriends } from "../utils/getfriends";
import Loading from "./loading";
import { getstatus } from "../utils/onlinestatus";
import { socket } from "../components/socket";

export default function Home() {
    const [userdata, setUserdata] = useState("");
    const [allservers, setAllservers] = useState(null);
    const [serverdata, setServerdata] = useState([]);
    const [homeclicked, setHomeclicked] = useState(true);
    const [searcheduser, setSearcheduser] = useState(null);
    const [allchannels, setAllchannels] = useState([]);
    // const [currentchannel, setCurrentchannel] = useState([]);
    const [channelselected, setChannelselected] = useState(null);
    const [friends, setFriends] = useState({ firstres: [], secondres: [] });
    const [addfriend, setAddfriend] = useState(false);
    const [createownserver, setCreateownserver] = useState(false);
    const [showloading, setShowloading] = useState(true);
    const [friendsectionselected, setFriendsectionselected] = useState(true);
    const [allonline, setAllonline] = useState(true)
    const [showallfriends, setShowallfriends] = useState(false);
    const [onlinefriends, setOnlinefriends] = useState(null);
    const [chatwith, setChatwith] = useState(null);
    const [messagefriend, setMessagefriend] = useState(false);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("userinfo"));
                console.log(user);
                setUserdata(user);
                socket.emit("registeronsocket",user)

                const fetchedservers = await getservers();
                console.log(fetchedservers);
                setAllservers(fetchedservers.servers);

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
        socket.on("rec_message", (data) => {
            // alert("hi")
            console.log("gotdata", data);
            setMessage(prevmessages => {
                const prev = [...prevmessages];
                const userindex = prev.findIndex(msg => Object.keys(msg)[0] === data.username);
                if (userindex !== -1) {
                    // prev[userindex].val.push(val);
                    prev[userindex][data.username].push({
                        val: data.val,
                        username: data.username,
                        image: data.image,
                        time: data.t,
                        date: data.date
                    })
                } else {
                    // console.log("hi")
                    prev.push({
                        [data.username]: [{
                            val: data.val,
                            username: data.username,
                            image: data.image,
                            time: data.t,
                            date: data.date
                        }]
                    });
                }

                return prev;
            });
        });
        return () => {
            socket.off("rec_message");
        };
    }, []);


    return (
        <>
            {showloading ? (
                <Loading />
            ) : (
                <div className="flex row-auto h-screen w-screen overflow-hidden">
                    <Homecontext.Provider
                        value={{
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
                        }}
                    >
                        <LeftPanel />
                        <MidPanel />
                        <RightPanel />
                    </Homecontext.Provider>
                </div>
            )}
        </>
    );
}
