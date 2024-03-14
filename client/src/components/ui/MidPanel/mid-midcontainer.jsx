import React, { useContext, useState, useEffect } from "react";
import { Homecontext } from "../../context/homecontext";
import Channelcomponent from "./channelcomponent/channel-com";
import { MessageSquareText, Video, Plus, UserRound } from 'lucide-react';
import { Addfriend } from "../../../utils/Addfriend";
import { socket } from "../../socket";

export default function Midcontainer() {
    const { userdata, serverdata, searcheduser, homeclicked, friends, setFriends, addfriend, setAddfriend, friendsectionclicked, setFriendsectionselected } = useContext(Homecontext);
    const { allchannels, setAllchannels } = useContext(Homecontext)
    const [channel, setChannel] = useState("");
    const [modalactive, setModalactive] = useState(false);
    function addchannel() {
        setModalactive(true);
    }

    // const addfriendclicked = async () => {
    //     console.log("clicked")
    //     try{
    //         const result = await Addfriend(userdata.username, searcheduser.user.username, userdata.image, searcheduser.user.image)
    //         if(result){
    //             socket.emit("addfriend", {
    //                 searcheduser: searcheduser.user.username,
    //                 userdata: userdata.username,
    //                 secondimage: searcheduser.user.image,
    //                 firstimage: userdata.image
    //             });
    //             setFriends((prevFriends) => ({
    //                         ...prevFriends,
    //                         secondres: [...prevFriends.secondres, result],
    //                     }));
    //             console.log(friends,"byeeee")
                
    //         }
    //         else {console.log("already friends")}
    //     }  
    //     catch{
    //         console("error adding friend");
    //     }
    //     setAddfriend(true);
    //     // 
    //     // if (!result) {
    //     //     console.log("already friends")
    //     // }
    //     // else {
    //     //     console.log(result)
    //     //     setFriends((prevFriends) => ({
    //     //         ...prevFriends,
    //     //         firstres: [...prevFriends.firstres, result],
    //     //     }));
    //     //     console.log(friends)
    //     // }
    // }
    function friendsecclicked() {
        setFriendsectionselected(true)

    }
    return (
        !homeclicked ? (
            <div className="h-full flex flex-col gap-12">
                <Channelcomponent ctype={"text"} />
                <Channelcomponent ctype={"voice"} />
            </div>
        ) : (
            <div className="h-full">
                {/* <div className="flex justify-center ">
                    {searcheduser
                        ? (searcheduser.message === "user found"
                            ? (
                                <div className="w-full flex flex-row gap-4 p-2 items-center">
                                    <img src={searcheduser.user.image} alt="userimage" className="w-8 h-8 rounded-full object-cover" />
                                    <div className="text-text-two font-semibold text-sm overflow-hidden">{searcheduser.user.username}</div>
                                    <MessageSquareText className="text-text-one  hover:text-text-two" />
                                    <Video className="text-text-one hover:text-text-two" />
                                    <Plus onClick={addfriendclicked} className="text-text-one hover:text-text-two" />
                                </div>
                            )
                            : "User not found")
                        : null}
                </div> */}
                <div className="h-full">
                    <div className="w-95 flex flex-row hover:bg-white hover:bg-opacity-5 hover:text-text-two text-text-one p-2 rounded-md relative left-2 gap-4" onClick={friendsecclicked}>
                        <UserRound />
                        <p>FRIENDS</p>
                    </div>
                    <p className="pl-4 text-text-three font-semibold text-md pt-4">DIRECT MESSAGES</p>
                    <div className="flex items-center flex-col pt-4">
                        {/* {friends ? (
                            friends.map((friend, index) => (
                                <div key={index} className="w-95 hover:bg-white hover:bg-opacity-5 flex flex-row gap-4 hover:text-text-two p-0.4 rounded-md text-text-one">
                                    <img src={friend ? friend.secondimage : null} className="w-8 h-8 rounded-full " alt="Friend Avatar" />
                                    <div>{friend ? friend.seconduser : null}</div>
                                </div>
                            ))
                        ) : (
                            <p>No friends found</p>
                        )} */}
                        <div className="flex justify-center text-text-two">
                            No Recent Chats
                        </div>
                    </div>

                </div>
            </div>

        )
    );
}
