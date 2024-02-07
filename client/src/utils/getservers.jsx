import axios from "axios";

export const getservers = () => {
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/server/getservers", {user})
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
}