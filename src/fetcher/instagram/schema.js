import Mongoose from '../config';
const Schema = Mongoose.Schema;

const instagramSchema = new Schema({
  user: Number,
  stats: {
    media: Number,
    followed_by: Number,
    follows: Number
  },
  time: Number
});

const Instagram = Mongoose.model('Instagram', instagramSchema);
export default Instagram;
