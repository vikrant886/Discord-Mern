const User = require('../../models/user');

const userdata = async(req,res)=>{
    try{
        console.log("hi");
        const {username}=req.body;
        const result = await User.findOne({username})
        console.log("user set to offline");
        res.json({result})
    }
    catch{
        console.log("error logging out and setting offline");
    }
}
module.exports=userdata;