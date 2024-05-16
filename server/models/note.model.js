import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    content: String,
    time : { type : Date, default: () => new Date(+new Date() + 3*60*60*1000)}, //Israel time update
});


const Note = mongoose.model("Note",noteSchema);


export default Note;