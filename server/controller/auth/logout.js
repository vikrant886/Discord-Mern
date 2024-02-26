const onlineuser = require('../../models/online');

const logout = async(req,res)=>{
    try{
        const {username}=req.body;
        const result = await onlineuser.updateOne({username},{$set : {isonline:false}})
        console.log("user set to offline");
    }
    catch{
        console.log("error logging out and setting offline");
    }
}
module.exports=logout;