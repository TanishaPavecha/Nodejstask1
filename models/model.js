const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,  
        unique: true,
    },
    firstname: {
        type: String,
        required:true,
    },
    lastname: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required:true
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);