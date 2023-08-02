import mongoose from 'mongoose';

const widgetSchema = new mongoose.Schema({
  name: String,
  imgUrl: String,
  show: Boolean,
  round: Boolean,
});

const Widget = mongoose.model('Widget', widgetSchema);

export default Widget;
