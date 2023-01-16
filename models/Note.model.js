const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    note: String,
    category: String,
    userID: String,
    status: false,

})

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel }