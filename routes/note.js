

import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const noterouter = express.Router();


noterouter.post('/add', middleware, async (req, res) => {
    try {
        const { title, description, tags = [] } = req.body;

        const newNote = new Note({
            title,
            description,
            tags, 
            userId: req.user.id,
        });

        await newNote.save();

        return res.status(200).json({ success: true, message: "Note Created Successfully" });
    } catch (error) {
        console.error("Note creation error:", error);
        return res.status(500).json({ success: false, message: "Error in adding Note" });
    }
});


noterouter.get('/', middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        return res.status(200).json({ success: true, notes });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Can't retrieve notes" });
    }
});


noterouter.put("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags = [] } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description, tags },
            { new: true }
        );

        return res.status(200).json({ success: true, updatedNote });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Can't update note" });
    }
});


noterouter.delete("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        return res.status(200).json({ success: true, deletedNote });
    } catch (error) {

        return res.status(500).json({ success: false, message: "Can't delete note" });
    }
});

export default noterouter;