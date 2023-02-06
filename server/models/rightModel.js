import mongoose from 'mongoose';

const rightSchema = new mongoose.Schema({
    date: {type: Number, required: true, unique: true},
    title: String,
    text: String,
    weather: String,
    like: Boolean,
    bookmark: Boolean,
});

const Right = mongoose.model("Right", rightSchema);

export default Right;