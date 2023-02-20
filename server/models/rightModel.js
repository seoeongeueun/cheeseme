import mongoose from 'mongoose';

const rightSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    date: {type: Number, required: true, unique: true},
    title: String,
    text: String,
    weather: String,
    like: Boolean,
    bookmark: Boolean,
    hide: Boolean,
    likes: [ String ]
});

const Right = mongoose.model("Right", rightSchema);

export default Right;