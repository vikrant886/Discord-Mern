import React, { useContext, useState , useEffect} from "react";
import { Plus, Hash } from "lucide-react";
import CreateChannelModal from "../../../ChannelModal/channel-modal";
import { Homecontext } from "../../../context/homecontext";
import { serverclicked } from "../../../../utils/serverclicked";
import { socket } from "../../../socket";

export default function Channelcomponent({ ctype }) {
    const { serverdata } = useContext(Homecontext);
    const [modalactive, setModalactive] = useState(false);
    const {allchannels,setAllchannels} = useContext(Homecontext)
    const {channelselected , setChannelselected} = useContext(Homecontext)

    function addchannel(channel) { 
        setModalactive(true);
    }

    function channelclicked(channel){
        setChannelselected(channel)
    }


    useEffect(() => { 
        console.log("fetching", serverdata)
        const fetchData = async () => {
            try {
                const channels = await serverclicked(serverdata.servername)  //fetching all the channels for the currrent server
                setAllchannels(channels)
            } catch (error) {
                console.error("Error fetching servers:", error);
            }
        };
        fetchData();
    }, [serverdata, modalactive])

    useEffect(()=>{
        allchannels.map((channel,index)=>{
            if(channel.channelname==="general"){
                channelclicked(channel)
                socket.emit("joinchannel",channel._id)
            }
        })
    },[allchannels])

    return (
        <div className="h-1/2 w-full">
            <div className="w-full h-10 flex flex-row justify-between items-center p-4">
                <p className="font-semibold text-xs text-text-one">VOICE-CHANNELS</p>
                <Plus
                    width={16}
                    className="text-text-one hover:text-text-two"
                    onClick={addchannel}
                />
                {modalactive && (
                    <CreateChannelModal
                        closemodal={() => {
                            setModalactive(false);
                        }}
                        servername={serverdata?.servername}
                    />
                )}
            </div>
            <div className="w-full h-full flex flex-col gap-2 text-text-three font-semibold text-sm items-center">
                {allchannels.map((channel, index) =>
                    channel.channeltype === ctype ? (
                        <div 
                            onClick={()=>{channelclicked(channel)}}
                            key={index}
                            className="flex flex-row pl-4 p-2 hover:bg-white hover:bg-opacity-5 w-85 rounded-md"
                        >
                            <Hash className="mr-2" />
                            {channel.channelname}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
