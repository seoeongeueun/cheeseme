import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    owner: {type: String, requried: true},
    date: {type: Number, required: true, unique: true},
    text: String,
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;