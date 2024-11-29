/* eslint-disable no-undef */

const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const noteModel = require("../models/notes");
const userModel = require("../models/user");
const { body, validationResult } = require("express-validator");

//// Routes 1 : Get all the notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await noteModel.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some internal error occured ");
  }
});

// Route 2 : Add a new notes using post  " note/addnote"
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter the valid title ").isLength({ min: 3 }),
    body("description", "Enter the vlaid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, priority, dueDate } = req.body;
      const user = await userModel.findById(req.user);
      const note = new noteModel({
        title,
        description,
        priority,
        dueDate,
        user: req.user,
        name: user.name,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some internal error occured ");
    }
  }
);

// Route :3 update the existing note
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (dueDate) {
    newNote.dueDate = dueDate;
  }
  // find note to be updated
  let note = await noteModel.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }

  if (note.user.toString() !== req.user) {
    return res.status(401).send("not allowed");
  }
  note = await noteModel.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
});

/// Route :4   for deleting the note of the user
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // find note to be deleted
  let note = await noteModel.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  // allow deletion only if user owns this note
  if (note.user.toString() !== req.user) {
    return res.status(401).send("not allowed");
  }
  note = await noteModel.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been deleted", note: note });
});

// Route 5: Update the status of a note to "completed"
router.put("/updatestatus/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be updated
    let note = await noteModel.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.user) {
      return res.status(401).send("Not authorized");
    }

    // Update the status to "completed"
    note = await noteModel.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "completed" } },
      { new: true } // Return the updated note
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});

router.get("/notesDetails/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const note = await noteModel.findOne({ _id: id });
    res.json(note);
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("some internal error occured ");
  }
});

module.exports = router;
