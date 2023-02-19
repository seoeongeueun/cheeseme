import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    owner: {type: String, required: true, unique: true },
    reminders: [
        {
            date: Number,
            title: String,
            detail: String,
            check: Boolean,
            color: String,
        }
    ]
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;