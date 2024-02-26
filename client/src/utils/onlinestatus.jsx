import axios from "axios";

export const getstatus = (data)=>{
    return new Promise((resolve,reject)=>{
        console.log(data)
        axios.post(process.REACT_APP_HOST+"friend/status",{data})
        .then((res)=>{
            console.log(res,"hi");
            resolve(res.data.result);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
}