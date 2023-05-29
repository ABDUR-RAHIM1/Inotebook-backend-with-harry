const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now,
    }
})

const InoteUser = mongoose.model("InoteUser", userSchema)
module.exports = InoteUser;