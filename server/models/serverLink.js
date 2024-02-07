const mongoose = require('mongoose')

const schema = mongoose.Schema;

const serverlinkschema = new schema({
    username: {
        type: String,
    },
    servername: {
        type: String,
    }

});

module.exports= mongoose.model("serverlink",serverlinkschema);