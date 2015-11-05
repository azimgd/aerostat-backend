'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var Schema = _config2['default'].Schema;

var commentSchema = new Schema({
  user: Number,
  stats: {
    media: Number,
    followed_by: Number,
    follows: Number
  },
  time: Number
});

var Comment = _config2['default'].model('Comment', commentSchema);
exports['default'] = Comment;
module.exports = exports['default'];