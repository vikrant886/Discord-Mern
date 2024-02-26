import React, { useContext } from "react";
import Midheader from "./mid-header";
import { Homecontext } from "../../context/homecontext";
import Midcontainer from "./mid-midcontainer";
import Midfooter from "./mid-footer";

export default function MidPanel() {
    const { userdata, serverdata, searcheduser } = useContext(Homecontext);
    const { allchannels, setAllchannels } = useContext(Homecontext)
    return (
        <div className="flex h-full bg-second w-80  flex-col">
            <Midheader />
            <Midcontainer />
            <Midfooter />
        </div>
    );
}
