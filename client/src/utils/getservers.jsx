import axios from "axios";

export const getservers = () => {
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_HOST+"hserver/getservers", {user})
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
}