'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _aerostat = require('aerostat');

var _aerostat2 = _interopRequireDefault(_aerostat);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _worker = require('./worker');

/**
 *
 */
var Fetcher = function Fetcher() {
  return {
    onSuccess: function onSuccess(res) {
      var igfetcher = (0, _worker.fetcher)();
      var user = igfetcher.parse(res.response.response.data);
      var stats = igfetcher.getUserCounts(user);

      if (stats) {
        var igcollector = (0, _worker.collector)();
        var preparedStats = igcollector.prepare(user.id, (0, _moment2['default'])().unix(), stats);
        igcollector.store(preparedStats).then(console.log, console.log);
      }
    }
  };
};

var instagramSubscriber = function instagramSubscriber() {
  var jobName = 'instagram';
  var jobConsumer = _aerostat2['default'].consumer(jobName);

  _aerostat2['default'].producer(jobName, {
    url: 'https://api.instagram.com/v1/users/13460080?access_token=557596280.1677ed0.e0748a013d3f4ed9825612be0d8cceef'
  }).create();

  jobConsumer.onSuccess(Fetcher().onSuccess);
  jobConsumer.consume(jobConsumer.callback);
};
exports.instagramSubscriber = instagramSubscriber;