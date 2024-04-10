import React, { useContext, useState } from "react";
import { Homecontext } from "../../context/homecontext";
import { User } from "lucide-react";
import EditAvatar from "../../edit avatar modal/edit_avatar";

export default function Midfooter() {
    const { userdata } = useContext(Homecontext);
    const [setting, setSetting] = useState(false);
    const [editmodal, setEditmodal] = useState(false);

    return (
        <>
            {
                editmodal? (
                    <EditAvatar image={userdata.image} setEditmodal={setEditmodal}/>
                ): null
            }
            <div className={` z-0 text-text-two w-full bg-first transition-all ease-in-out duration-300 ${setting ? "translate-y--40" : "translate-y-40"}`}
            onClick={()=>{setEditmodal(!editmodal)}}
            >
                <div className="hover:bg-white hover:bg-opacity-5 text-text-one hover:text-text-two flex gap-4 font-bold  items-center p-4">
                    <User size={30} />
                    <p>Edit Profile</p>
                </div>
            </div>
            <div className="z-40 hover:bg-third bg-second flex items-center gap-3 p-4" onClick={() => setSetting(!setting)}>
                <img src={userdata.image} className="w-8 object-cover h-8 rounded-full" alt="" />
                <div className="font-semibold text-text-two">{userdata.name}</div>
            </div>
        </>
    );
}
