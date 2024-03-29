'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var Schema = _config2['default'].Schema;

var instagramSchema = new Schema({
  user: Number,
  stats: {
    media: Number,
    followed_by: Number,
    follows: Number
  },
  time: Number
});

var Instagram = _config2['default'].model('Instagram', instagramSchema);
exports['default'] = Instagram;
module.exports = exports['default'];