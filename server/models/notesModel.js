import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    id: Number,
    text: String,
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;