import mongoose from 'mongoose';

const clockSchema = new mongoose.Schema({
  owner: { type: String, required: true, unique: true },
  show: [{ type: Boolean }],
});

const Clock = mongoose.model('Clock', clockSchema);

export default Clock;
