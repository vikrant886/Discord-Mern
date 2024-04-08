import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageContainer from "../components/imagecontainer/imagecontainer";
import { ReactComponent as CircleSvg } from "../images/loading2.svg";
import person from "../images/person.png"

export default function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState()
    const [registerclicked, setRegisterclicked] = useState(false);
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const navigate = useNavigate();

    const handleValueChange = newValue => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    function register() {
        setRegisterclicked(true)
        console.log(process.env.REACT_APP_HOST);
        axios.post(process.env.REACT_APP_HOST + 'user/register', {
            "username": username,
            "email": mail,
            "name": name,
            "password": password,
            "image": image,
        })
            .then((res) => {
                console.log(res);
                if (res.data.message === "registered") {
                    sessionStorage.setItem("userinfo", JSON.stringify(res.data.user));
                    navigate('/home');
                }
            })
            .catch((err) => {
                console.log("Error sending data:", err);
            });

    }
    return (
        <div
            className="w-full h-screen bg-cover bg-no-repeat flex items-center justify-center bg-right"
            style={{
                backgroundImage: `url(${require("../images/OIG.jpeg")})`,
            }}
        >
            <div className="h-[80%] p-2 bg-third w-63 flex flex-col rounded-md ">
                <div className="w-full h-16 flex justify-center items-center">
                    <h1 className="text-white font-bold text-2xl">Create an Account</h1>

                </div>
                <ImageContainer currimage={person} onImagechange={(e) => { setImage(e) }} />

                <div className="h-full  w-full flex  justify-center">
                    <div className="w-85 h-full flex gap-3 flex-col ">
                        <p className="flex flex-row text-text-three  font-bold text-0.8r">MAIL<p className="text-red-500 font-light"> *</p></p>
                        <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three " placeholder="Enter Email or Phone number" style={{ outline: 'none' }} onChange={(e) => setMail(e.target.value)} />
                        <p className="flex flex-row text-text-three text-0.8r font-bold">USERNAME<p className="text-red-500 font-light"> *</p></p>
                        <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three" placeholder="Enter a Username" style={{ outline: 'none' }} onChange={(e) => setUsername(e.target.value)} />
                        <p className="flex flex-row text-text-three text-0.8r font-bold">DISPLAY NAME<p className="text-red-500 font-light"> *</p></p>
                        <input type="text" className="p-0.8 w-full rounded-sm text-xs bg-first text-text-three" placeholder="Enter a Name" style={{ outline: 'none' }} onChange={(e) => setName(e.target.value)} />
                        <p className="text-text-three  flex felx-row text-0.8r font-bold">PASSWORD <p className="text-red-500 font-light"> *</p></p>
                        <input type="password" className="rounded-sm w-full  p-0.8 text-xs bg-first text-text-three" placeholder="Enter your password" style={{ outline: 'none' }} onChange={(e) => setPassword(e.target.value)} />
                        <p className="text-text-three  flex felx-row text-0.8r font-bold">DATE OF BIRTH <p className="text-red-500 font-light"> *</p></p>
                        <Datepicker value={value} onChange={handleValueChange} />
                        <button className="w-full p-4 mt-4 rounded-sm bg-loginbutton" onClick={register}>
                            {registerclicked ? (
                                <div className="flex justify-center">
                                    <CircleSvg className="w-8 h-8 text-white" />
                                </div>
                            ) : (
                                <div>Register</div>
                            )}
                        </button>
                        <button onClick={() => navigate('/')} className="text-loginbutton font-light text-0.8r">Already have an account?</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
