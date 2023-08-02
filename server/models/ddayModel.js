import mongoose from 'mongoose';

const ddaySchema = new mongoose.Schema({
  owner: { type: String, required: true, unique: true },
  start: { type: Number, required: true },
  text: String,
  end: Number,
});

const Dday = mongoose.model('Dday', ddaySchema);

export default Dday;
