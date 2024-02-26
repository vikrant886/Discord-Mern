const User = require('../../models/user');
const bcrypt = require('bcrypt');
const onlineuser=require("../../models/online")

const register = async (req, res, next) => {
    console.log("register used");
    try {
        const { username, email, name, password ,image } = req.body;
        const usernameCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        const isonline=true;

        if (usernameCheck) {
            console.log("username exists");
            res.json({ message: 'username already exists' });
        } else if (emailCheck) {
            console.log("email already exists");
            res.json({ message: 'email already exists' });
        } else {
            const hashPassword = await bcrypt.hash(password, 5);
            console.log(hashPassword);

            const newUser = new User({
                username,
                email,
                name,
                password: hashPassword,
                image,
            });
            delete req.body.password;
            const onlineuserdata= new onlineuser({
                username,
                isonline,
            })

            const savedUser = await newUser.save();
            const onlineusers = await onlineuserdata.save();
            console.log('User registered successfully:', savedUser);
            res.status(200).json({ message: 'registered', user: savedUser });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = register;
