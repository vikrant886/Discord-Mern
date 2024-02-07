import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Loader from "../components/ui/loader";

const Qrgenerator = () => {
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const value =
        "f;kajdslkfa;lksdjfj;lkajsdflknas;ldkf;alkd jfc;lkaj s;lfk al;sdkjf;laksjdfl;kasdl;kfal;ksdf;lkasd;lkfnal;skdnf;lkasndlf asldnfl;aknsd;fklnasd;lkfn;aljsg;jasnd;lkfasldknf;lajsb;lgjnas;ldkfa;lsdnfl;ands;lfnas;dlfnaljbgoawjeglkqw;rkgfnalsfngljasnfl;knasdf";

    return (
        <div className="grid-cols-2 gap-4 h-full w-full">
            <div className="h-2/3 flex justify-center items-end">
                {timer <= 0 ? (
                    <div className="w-36 h-36 bg-white flex justify-center items-center rounded-lg">
                        <QRCode value={value} className="w-32 h-32" />
                    </div>
                ) : (
                    <div className="w-36 h-36 bg-transparent flex justify-center items-center rounded-lg">
                        <Loader  />
                    </div>
                    
                )}
            </div>
            <div className="h-1/3 flex justify-center items-center flex-col ">
            <p className="text-white">Log in with QR Code</p>
            <p className="text-text-three text-xs text-center">
                Scan the QR to Login instantly
            </p>
            </div>
        </div>
    );
};

export default Qrgenerator;
