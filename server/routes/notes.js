import Router from "express";
import Note from "../models/note.model.js";

const router = Router();

router.route("/").get((req, res) => {
  // Show all notes
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  //Add new note to mongoDB
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Note({ title, content });

  newNote
    .save()
    .then(() => res.json("Note added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  // Delete specific note by id
  Note.findByIdAndDelete(req.params.id) // req.params.id => get the note id
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;
