'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var Schema = _config2['default'].Schema;

var bitcoinSchema = new Schema({
  price: {
    amount: Number,
    currency: String
  },
  time: Number
});

var Bitcoin = _config2['default'].model('Bitcoin', bitcoinSchema);
exports['default'] = Bitcoin;
module.exports = exports['default'];