import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    date: {type: Number, required: true, unique: true},
    text: String,
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;