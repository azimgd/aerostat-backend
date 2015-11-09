'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 *
 */
var fetcher = function fetcher() {
  return {
    parse: function parse(response) {
      if (response.errors !== undefined) {
        return false;
      }

      return response.data;
    },

    getBitcoinPrice: function getBitcoinPrice(data) {
      if (!data) {
        return false;
      }

      return {
        amount: data.amount,
        currency: data.currency
      };
    }
  };
};

exports.fetcher = fetcher;
/**
 *
 */
var collector = function collector() {
  return {
    validate: function validate(stats) {},

    prepare: function prepare(price, time) {
      return {
        price: price,
        time: time
      };
    },

    store: function store(data) {
      return _q2['default'].ninvoke(_schema2['default'], 'findOneAndUpdate', { time: data.time }, data, { upsert: true, 'new': true });
    }
  };
};

exports.collector = collector;
var data = function data() {
  return {
    get: function get(limit) {
      return _schema2['default'].find({}).limit(limit).select({ time: 1, stats: 1 }).exec();
    },

    getRecent: function getRecent(limit) {
      return _schema2['default'].find({}).limit(limit).select({ time: 1, stats: 1 }).sort('-time').exec();
    }
  };
};
exports.data = data;