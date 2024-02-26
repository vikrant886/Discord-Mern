import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Homecontext } from '../context/homecontext';
import { socket } from '../socket';
const Allonline = () => {
    const [onlineFriends, setOnlineFriends] = useState([]);
    const { friends, userdata } = useContext(Homecontext)
    const firstres = friends.firstres;
    useEffect(() => {
        socket.connect();
        socket.emit("fecthalluser");

        socket.on("allonlineuser", (data) => {
            const uniqueOnlineUsers = Array.from(new Set(data));
            if (firstres) {
                setOnlineFriends(
                    uniqueOnlineUsers.filter((user) =>
                        firstres.some(
                            (friend) => {
                                if (userdata.username === friend.firstuser || userdata.username === friend.seconduser) {
                                    return (friend.seconduser === user.username || friend.firstuser === user.username) && userdata.username !== user.username;
                                }
                                return false;
                            }
                        )
                    )
                );
            }
        });
    }, [firstres]);
    return (
        <div className="flex w-full h-full justify-center items-center">
            {onlineFriends.length > 0 ? (
                <div className='w-full h-full flex flex-row'>
                    <div className='flex flex-col w-2/3 h-full'>
                        <div className='flex text-text-two font-semibold justify-center p-4 text-xl'>Online Buddies!</div>
                        <div className='w-full h-full flex p-4 gap-4 flex-col'>
                            {onlineFriends.map((user, index) => (
                                user.username !== userdata.username ? (
                                    <div key={index} className='hover:bg-white hover:bg-opacity-5 gap-8 text-text-one hover:text-text-two  h-4 w-[80%] flex items-center p-8 rounded-lg'>
                                        <img src={user.image} className='w-12 h-12 rounded-full' alt="" />
                                        {user.username}
                                    </div>
                                ) : null
                            ))}
                        </div>


                    </div>
                    <div className='w-1/3'>hello world</div>
                </div>
            ) :
                (
                    <img src={require("./RightPanel/no_online.png")} alt="no one online" className="z-0" />
                )
            }
        </div>
    );
};

export default Allonline;
