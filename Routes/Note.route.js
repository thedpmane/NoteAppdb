const express = require("express");
const { NoteModel } = require("../models/Note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
    const note = await NoteModel.find()
    res.send(note)
})


noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("note created here")
    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})
//63c3d8bae89a9d0f34f03f38

noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_note) {
            res.send("You are not authorized")
        } else {
            await NoteModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("note updated here")
        }

    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({ "_id": id })
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req !== userID_in_note) {
            res.send("You are not authorized")
        } else {
            await NoteModel.findByIdAndDelete({ "_id": id })
            res.send("note deleted here")
        }

    } catch (error) {
        console.log(error)
        res.send(`Error:${error} something went wrong`)
    }
})

module.exports = { noteRouter }