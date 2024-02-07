import axios from "axios";

export const getstatus = (data)=>{
    return new Promise((resolve,reject)=>{
        console.log(data)
        axios.post("http://localhost:8080/friend/status",{data})
        .then((res)=>{
            console.log(res,"hi");
            resolve(res.data.result);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
}