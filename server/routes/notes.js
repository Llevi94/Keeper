import Router from "express";
import Note from "../models/note.model.js";
import cors from "cors";

const router = Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  res.header(
    "Cache-Control",
    "no-cache, no-store, max-age=0, must-revalidate"
  );
  next();
});

app.use(cors(
  {
    origin: ['https://keeper-khaki.vercel.app'],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true
  }
));

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
