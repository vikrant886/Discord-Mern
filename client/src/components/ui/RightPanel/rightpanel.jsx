import React, { useContext, useEffect, useState } from "react";
import Rightheader from "./right-header";
import MessageField from "./text-feild/MessageField";
import { Homecontext } from "../../context/homecontext";
import Allonline from "../Allonline";
import { Search, X, MessageSquareText, Video } from "lucide-react";
import { socket } from "../../socket";
import { getfriends } from "../../../utils/getfriends";
import { removefriend } from "../../../utils/Addfriend";

export default function RightPanel() {
    const { allonline, setAllonline, showallfriends, setHomeclicked, friends, userdata, homeclicked, setShowallfriends, setFriends, chatwith, setChatwith ,messagefriend ,setMessagefriend } = useContext(Homecontext);
    const [addfriendclicked, setAddfriendclicked] = useState(false);
    const [pending, setPending] = useState(false);
    const [all, setAll] = useState(false);
    const [change, setChange] = useState(null);
    const [firstres, setFirstres] = useState(null)
    const secondres = friends.secondres;
    const [pendingfriends, setPendingfriends] = useState(null);
    console.log(chatwith);

    useEffect(() => {
        setPendingfriends(secondres.filter(user => user.firstuser === userdata.username))
        console.log(pendingfriends, "pendgin")
        setFirstres(friends.firstres)
        console.log("change in friends")

        
    }, [friends]);

    useEffect(()=>{
        socket.on("reqaccepted", (data) => {
            fetchfriends()
        })

        return () => {
            socket.off("reqaccepted");
        };
    },[])

    const remfriend = async (friend) => {
        console.log(friend, "remove friend")
        const result = await removefriend(friend)
        if (result) {
            alert("removed")
            socket.emit("friendremoved", friend.firstuser === userdata.username ? friend.seconduser : friend.firstuser)
            fetchfriends()
        }
    }

    const fetchfriends = async () => {
        const allfriends = await getfriends();
        setFriends(allfriends);
    }

    return (
        <div className="flex flex-col w-full bg-third">
            <Rightheader setAddfriendclicked={setAddfriendclicked} setMessagefriend={setMessagefriend} setShowallfriends={setShowallfriends} setAllonline={setAllonline} setPending={setPending} />
            {messagefriend ? (
                <MessageField type="f" />
            ) :
                homeclicked ? (
                    allonline ? (
                        <Allonline className="z-10" />
                    ) : showallfriends ? (
                        <div className="w-65  p-8 h-full  ">
                            <div className="flex flex-row justify-center items-center">
                                <input className="w-full bg-first outline-none rounded-l-md text-text-two p-2" placeholder="Search Friend?" />
                                <div className="bg-first p-2 rounded-r-md">
                                    <Search className="text-text-one" />
                                </div>
                            </div>

                            <div className="text-text-one text-sm font-semibold pt-4 pl-5 ">All friends</div>
                            <div className="flex justify-center items-center flex-col w-full gap-2 pt-4 ">
                                {friends.firstres && friends.firstres.length > 0 ? (
                                    friends.firstres.map((friend, index) => (
                                        <div key={index} className="w-95 hover:bg-white hover:bg-opacity-5 flex items-center  hover:text-text-two cursor-pointer rounded-md text-text-one p-2 ">
                                            <div className="flex gap-4">
                                                <img src={friend.seconduser === userdata.username ? friend.firstimage : friend.secondimage} className="w-12 h-12 rounded-full" alt="Friend Avatar" />
                                                <div className="font-bold capitalize flex items-center">{friend.seconduser === userdata.username ? friend.firstuser : friend.seconduser}</div>
                                            </div>
                                            <div className="flex ml-auto gap-8">
                                                <MessageSquareText className="ml-auto" onClick={() => { setChatwith(friend); setMessagefriend(true); }} />
                                                <Video className="ml-auto" />
                                                <X className="ml-auto" onClick={() => remfriend(friend)} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white w-full h-full">no friend</div>
                                )}
                            </div>
                        </div>
                    ) : addfriendclicked ? (
                        <div className="w-65 pt-8 flex flex-col  items-center gap-4 ">
                            <h2 className="text-text-two font-semibold ">ADD A FRIEND</h2>
                            <div className="w-full p-8 flex flex-row justify-center items-center ">
                                <input className="w-full bg-first outline-none rounded-l-md text-text-two p-3" placeholder="You can search with their Username !" />
                                <div className="bg-first w-3/4 flex  p-2 rounded-r-md  ">
                                    <button className="text-text-two w-1/2 ml-auto bg-loginbutton rounded-md p-0.25 ">Send a request</button>
                                </div>
                            </div>
                            <img src={require("../../../images/Screenshot 2024-01-19 010558.png")} className="z-0" alt="" />
                        </div>
                    ) : (
                        <div className="w-65 pt-12 border-r border-text-one h-full flex flex-col items-center">
                            {pendingfriends && pendingfriends.length > 0 ? (
                                pendingfriends.map((user, index) => (
                                    <div key={index} className="w-full h-full">{user.seconduser}</div>
                                ))
                            ) : (
                                <img src={require("../../../images/Screenshot 2024-01-19 110808.png")} className="size-96 object-contain" alt="No pending friends" />
                            )}
                        </div>
                    )
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <MessageField type="c" />
                    </div>
                )}
        </div>
    );
}
