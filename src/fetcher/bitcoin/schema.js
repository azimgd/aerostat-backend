import Mongoose from '../config';
const Schema = Mongoose.Schema;

const bitcoinSchema = new Schema({
  price: Number,
  time: Number
});

const Bitcoin = Mongoose.model('Bitcoin', bitcoinSchema);
export default Bitcoin;
