import React, { useEffect, useState } from "react";
import Qrgenerator from "../../utils/Qrgenerator";
import { useNavigate } from "react-router-dom";
import { handleLogin } from '../../utils/loginhandler'
import { socket } from "../socket";
import { ReactComponent as CircleSvg } from "../../images/loading2.svg";

export default function LoginForm() {
    const [signin, setSignin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [screensize, setScreensize] = useState(true);
    const navigate = useNavigate();
    const [loginclicked, setLoginclicked] = useState(false);
    useEffect(() => {
        setScreensize(window.innerWidth >= 600);
    })

    const handleRegister = () => {
        navigate('/register');
    };

    const handlelogin = async () => {
        setLoginclicked(true)
        const result = await handleLogin(username, password);

        if (result) {
            socket.connect()
            socket.emit("login", result);
            navigate('/home')
        }
        else console.log("could not login due to some issue");
    };

    return (
        <>
            {!signin ? (
                <div className="w-1/2 mobileM:w-1/3 mobileM:h-1/3 h-33  bg-third rounded-sm flex flex-col justify-evenly pt-4 items-center gap-2">
                    <h1 className="text-text-two text-xl font-bold">WELCOME BACK!</h1>
                    <p className="text-text-two text-sm">Have an Account?</p>
                    <button className="bg-loginbutton w-28 h-8 rounded-lg text-slate-100 hover:bg-loginbuttonhover" onClick={() => setSignin(true)}>
                        Sign In
                    </button>
                    <p className="text-text-one text-xs">Need an Account? <button className="text-loginbutton" onClick={handleRegister}> Register</button></p>
                </div>
            ) : (
                <div className="flex flex-row h-33 w-3/4 mobileM:w-1/2 mobileM:h-1/2 bg-third rounded-sm">
                    <div className="w-full sm:w-2/3 h-full">
                        <li className="flex items-center flex-col h-full pt-4">
                            <p className="text-text-two text-2xl font-semibold">Welcome back!</p>
                            <p className="text-text-three text-xs ">We're so excited to see you again!</p>
                            <div className="w-3/4 h-2/3 flex flex-col justify-center gap-2 items-start mt-6">
                                <p className="flex flex-row text-text-three text-0.8r font-bold">EMAIL OR PHONE NUMBER <p className="text-red-500 font-light"> *</p></p>
                                <input type="text" className="p-4 w-full rounded-sm text-s bg-inputfield " placeholder="Enter Email or Phone number" style={{ outline: 'none' }} onChange={(e) => setUsername(e.target.value)} />
                                <p className="text-text-three  flex felx-row text-0.8r font-bold">PASSWORD <p className="text-red-500 font-light"> *</p></p>
                                <input type="password" className="rounded-sm w-full text-black p-4 text-s bg-inputfield" placeholder="Enter your password" style={{ outline: 'none' }} onChange={(e) => setPassword(e.target.value)} />
                                <button className="text-forgotbutton text-0.8r item-left">Forgot your password?</button>
                                <button className="bg-loginbutton w-full rounded-sm  text-slate-100 hover:bg-loginbuttonhover h-12" onClick={handlelogin}>
                                    {loginclicked ? (
                                        <div className="flex justify-center">
                                            <CircleSvg className="w-12 h-12 text-white" />
                                        </div>
                                    ) : (
                                        <div>Login</div>
                                    )}
                                </button>
                                <button className="text-o.8r text-forgotbutton" onClick={() => navigate('/register')}>Create an account</button>
                            </div>
                        </li>
                    </div>
                    {
                        screensize && (
                            <div className="w-2/3 h-full flex flex-col justify-center items-center">
                                <Qrgenerator />
                            </div>
                        )
                    }
                </div>
            )}
        </>
    );
}
