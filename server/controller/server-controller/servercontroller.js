const express = require("express");
const router = express.Router();
const server = require("../../models/server");
const serverlink = require("../../models/serverLink");

module.exports.addserver = async (req, res) => {
    const { servername, serverimage } = req.body;
    const { username } = req.body.user;
    const serverinfo = new server({
        servername,
        serverimage,
    });
    const serverlinkinfo = new serverlink({
        username,
        servername,
    });

    try {
        const checkservername = await server.findOne({ servername });
        if (checkservername) {
            res.json({ message: "server already exists" });
        } else {
            const creatingserver = await serverinfo.save();
            const creatingserverlink = await serverlinkinfo.save();
            res.json({ message: "success" });
        }
    } catch (error) {
        console.error("Error adding server:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getservers = async (req, res) => {
    try {
        const { username } = req.body.user;
        const allservers = await serverlink.find({ username });

        const extractedServers = await Promise.all(
            allservers.map(async (serverLink) => {
                if (allservers.length > 0) {
                    const serverDetails = await server.findOne({ servername: serverLink.servername });
                    return {
                        servername: serverDetails.servername,
                        serverimage: serverDetails.serverimage,
                    };
                } else {
                    return {}; 
                }
            })
        );

        res.json({ servers: extractedServers });
    } catch (error) {
        console.error("Error fetching servers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.createServerLink = async (req, res) => {
    const { servername, username } = req.body

    try {
        const checkservername = await server.findOne({ servername });
        if (checkservername) {
            const serverlinkinfo = new serverlink({
                username,
                servername,
            });

            const creatingserverlink = await serverlinkinfo.save();
            res.json({ message: "success" });
        } else {
            res.json({ message: "Server does not exist" });
        }
    } catch (error) {
        console.error("Error creating server link:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

