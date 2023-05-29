const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "InoteUser"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "Genarel"
    },
    createOn: {
        type: Date,
        default: Date.now,
    }
})

const NoteBook = mongoose.model("Notebook", NotesSchema)
module.exports = NoteBook;