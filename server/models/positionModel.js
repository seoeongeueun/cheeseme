import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    _id: String,
    cal: [{ type: Number, type: Number}],
    todo: [{ type: Number, type: Number}],
    note: [{ type: Number, type: Number}],
    dday: [{ type: Number, type: Number}]
});

const Position = mongoose.model("Position", positionSchema);

export default Position;