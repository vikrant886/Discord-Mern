const User = require('../../models/user');
const bcrypt = require('bcrypt');
const onlineuser = require('../../models/online')

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const checkforusername = await User.findOne({ username });
        if (!checkforusername) {
            console.log("no user present");
            res.json({ message: "No username exists. Please register." });
        } else {
            bcrypt.compare(password, checkforusername.password, async (err, result) => {
                if (err) {
                    console.log("error comparing the passwords");
                } else if (result) {
                    console.log("password is correct");
                    try {
                        const result = await onlineuser.updateOne({ username }, { $set: { isonline: true } });
                        console.log("User set to online:");
                        res.status(200).json({ message: "success", checkforusername })
                    } catch (error) {
                        console.log("error setting to online:", error);
                        res.json({message:"error logining in"})
                    }
                } else {
                    console.log("wrong password");
                    res.json({ message: "Failed" });
                }
            });
        }
    } catch (error) {
        console.log("got error while checking login:", error);
        res.json({ message: "Error logging in" });
    }
};


module.exports = login;
