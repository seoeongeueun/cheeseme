import mongoose from 'mongoose';

const ddaySchema = new mongoose.Schema({
    date: {type: Number, required: true, unique: true},
    text: String,
    start: {type: Number, required: true},
    end: Number
});

const Dday = mongoose.model("Dday", ddaySchema);

export default Dday;