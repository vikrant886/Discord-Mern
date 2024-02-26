import React, { useContext, useState } from "react";
import { Homecontext } from "../../context/homecontext";
import { Finduser } from "../../../utils/finduser";

export default function Midheader() {
    const { userdata, serverdata, homeclicked } = useContext(Homecontext)
    const {searcheduser ,setSearcheduser} = useContext(Homecontext)
    const [finduser, setFinduser] = useState("")

    async function keypressed(event) {
        if (event.key === "Enter") {
            const data = await Finduser(finduser)
            console.log(data)
            setSearcheduser(data);
        }
    }
    
    return (
        (!homeclicked ?
            <div className="h-16 w-full bg-second shadow-md flex justify-center items-center transition-all duration-300 hover:bg-opacity-50 hover:bg-first">
                <p className="text-white font-bold capitalize"> {serverdata.servername}</p>
            </div>

            :
            <div className="flex justify-center items-center w-full h-16">
                <div className="w-95">
                    <input type="text" className="p-0.8 w-full rounded-md text-xs bg-first text-text-three" placeholder="Search a Username" onKeyPress={keypressed} style={{ outline: 'none' }} onChange={(e) => setFinduser(e.target.value)} />
                </div>
            </div>
        )
    )
}