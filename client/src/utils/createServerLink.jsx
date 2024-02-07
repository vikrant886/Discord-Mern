import axios from "axios";


export const createserverlink = (servername, username) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/server/createlink", 
            servername,
            username,
        )
            .then((res) => {
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