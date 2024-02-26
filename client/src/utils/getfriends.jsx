import axios from "axios";

export const getfriends = () => {
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    const username=user.username;
    return new Promise((resolve, reject) => {
        console.log(username)
        axios.post(process.REACT_APP_HOST+"friend/getfriend", { username })
            .then((res) => {
                resolve(res.data)
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    })
}