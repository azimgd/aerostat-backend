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
      if (response.meta.code !== 200) {
        return false;
      }

      return response.data;
    },

    getUserCounts: function getUserCounts(user) {
      return user.counts || false;
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

    prepare: function prepare(user, time, stats) {
      return {
        user: user,
        time: time,
        stats: stats
      };
    },

    store: function store(stats) {
      return _q2['default'].ninvoke(_schema2['default'], 'findOneAndUpdate', { time: stats.time }, stats, { upsert: true, 'new': true });
    }
  };
};
exports.collector = collector;