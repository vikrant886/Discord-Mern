const friends = require("../../models/friends");
const onlineuser = require("../../models/online")

module.exports.addfriend = async (req, res) => {
    try {
        const { firstname, secondname, secondimage, firstimage } = req.body
        const checkifexits = await friends.findOne({ firstuser: firstname, seconduser: secondname })
        const check = await friends.findOne({ firstuser: secondname, seconduser: firstimage })
        if (check || checkifexits) {
            res.json({ message: "already" })
        }
        else {
            const status = false;
            const data = new friends({
                firstuser: firstname,
                seconduser: secondname,
                firstimage: firstimage,
                secondimage: secondimage,
                status: status,
            })
            const result = await data.save()
            res.status(200).json({ message: "Friend added successfully", result });
        }
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getfriend = async (req, res) => {
    try {
        const { username } = req.body;

        console.log(username, "getfriend");
        const firstres = await friends.find({ status: true });
        const secondres = await friends.find({ status: false });
        // console.log(firstres,secondres)
        res.json({ firstres, secondres })

    }
    catch (error) {
        console.log("got error while fetching friends");
        res.status(500).json({ message: "error getting friends" })
    }
};

module.exports.onlinefriends = async (req, res) => {
    try {
        const friends = req.body;
        // console.log(friends);
        const result = await onlineuser.find({ isonline: true });
        res.json({ result })
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.acceptrequest = async (req, res) => {
    try {
        const { firstuser, seconduser } = req.body;
        const result = await friends.updateOne(
            { firstuser: firstuser, seconduser: seconduser },
            { $set: { status: true } }
        );
        res.json({ result })
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.removefriend = async (req, res) => {
    try {
        const { _id } = req.body
        console.log(_id)
        const result = await friends.findByIdAndDelete(_id)
        if (result) {
            res.json({ message: "removeed", result })
        }
        else{
            res.json({message:"notremoved"})
        }

    }
    catch (err) {
        console.log(err)
    }
}
