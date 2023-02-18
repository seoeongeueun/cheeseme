import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    owner: {type: String, required: true, unique: true }
    reminders: [
        {
            date: Number,
            text: String,
            check: Boolean,
            color: String,
        }
    ]
});

const Reminder = mongoose.model("Reminder", todosSchema);

export default Reminder;