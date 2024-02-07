const mongoose = require('mongoose')

const schema = mongoose.Schema;

const serverschema = new schema({
    serverimage: String,
    servername: {
        type: String,
    }

});

module.exports= mongoose.model("server",serverschema);