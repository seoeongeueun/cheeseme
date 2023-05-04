import mongoose from 'mongoose';

const rightSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    date: {type: Number, required: true},
    title: String,
    imgUrl: String,
    text: String,
    weather: String,
    like: Boolean,
    bookmark: Boolean,
    hide: Boolean,
    likes: [ String ],
    plain: Boolean,
    grid: Boolean
});

const Right = mongoose.model("Right", rightSchema);

export default Right;