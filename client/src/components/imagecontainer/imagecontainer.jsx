// eslint-disable-next-line

import React, { useEffect, useState } from "react";
import Resizer from 'react-image-file-resizer';

export default function ImageContainer({currimage}) {
    const [image,setImage]= useState()
    useEffect(()=>{
        setImage(currimage)
    },[])
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            Resizer.imageFileResizer(
                file,
                300, // Max width
                300, // Max height
                'JPEG', // Compression format
                0,  // Quality
                0,   // Rotation
                (uri) => {
                    setImage(uri); 
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
                {image ? (
                    <img
                        src={image}
                        alt="Uploaded Image"
                        className="bg-white object-contain"
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