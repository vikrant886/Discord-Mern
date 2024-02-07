const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String
    },

    name: {
        type: String,
    },
    password:{
        type: String,
    },
    image: String
    ,
    isonline:{
        type:Boolean,
    }
});

module.exports = mongoose.model('User', userSchema); 
