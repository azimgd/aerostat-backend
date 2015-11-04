import Mongoose from '../config';
const Schema = Mongoose.Schema;

const commentSchema = new Schema({
  user: Number,
  stats: {
    media: Number,
    followed_by: Number,
    follows: Number
  },
  time: Number
});

const Comment = Mongoose.model('Comment', commentSchema);
export default Comment;
