// eslint-disable-next-line

import React, { useContext, useEffect, useState } from "react";
import Resizer from 'react-image-file-resizer';
import { Homecontext } from "../context/homecontext";

export default function ImageContainer({currimage,setImage}) {
    const [temp,setTemp]= useState()
    useEffect(()=>{
        setTemp(currimage)
    },[])
    const {userdata, setUserdata} = useContext(Homecontext)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            Resizer.imageFileResizer(
                file,
                300, // Max width
                300, // Max height
                'JPEG', // Compression format
                20,  // Quality
                0,   // Rotation
                (uri) => {
                    setTemp(uri)
                    setImage(uri)
                },
                'base64' 
            );
        } else {
            setImage(null);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    return (
        <div className="flex justify-center h-32 items-center">
            <div
                id="imageContainer"
                onClick={triggerFileInput}
                className="w-20 h-20 rounded-full flex justify-center items-center  bg-second overflow-hidden hover:w-24 hover:h-24 hover:duration-500 duration-300"
            >
                {temp ? (
                    <img
                        src={temp}
                        alt="Uploaded Image"
                        className="w-20 h-20 object-cover"
                    />
                ) : (
                    <></>
                )}
            </div>

            <input
                type="file"
                id="fileInput"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    )
}