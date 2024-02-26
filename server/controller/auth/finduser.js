const User = require('../../models/user');

const finduser= async(req,res,next)=>{
    try{
        const {username}=req.body;
        const user=await User.findOne({username})
        if(user){
            console.log("user with username",username,"found");
            res.json({message:"user found",user});
        }
        else{
            console.log("no user exists with such username")
            res.json({message:"user does not exists"})
        }
    }
    catch{
        res.json({message:"failed"})
    }
}

module.exports=finduser;