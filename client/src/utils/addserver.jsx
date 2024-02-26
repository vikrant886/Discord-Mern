import axios from "axios";


export const addServer = (servername, image) => {
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_HOST+"server/addserver", {
            user,
            "servername": servername,
            "serverimage": image,

        })
            .then((res) => {
                console.log(res);
                if(res.data.message === "success"){
                    resolve(true);
                }
                else resolve(false);
            })
            .catch((err) => {
                console.log(err);
                reject(true);
            })
    })
}