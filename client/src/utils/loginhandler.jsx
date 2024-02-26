import axios from "axios";
import { socket } from "../components/socket";


export const handleLogin = (username, pass) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8080/user/login', {
            "username": username,
            "password": pass,
        })
            .then((res) => {
                console.log(res);
                if (res.data.message === "success") {
                    const userinfo=res.data.checkforusername
                    delete userinfo.password
                    resolve(userinfo);
                    sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error("An error occurred while logging in:", err);
                reject(err);
            });
    })
};

export const handleLogout = (username) => {
    console.log(username, "hi");
    axios.post('http://localhost:8080/user/logout', { username })
        .then((res) => {
            // console.log(res);
        })
        .catch((err) => {
            console.log(err)
        })
    socket.emit("logout",username)
}
