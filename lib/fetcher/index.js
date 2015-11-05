'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _aerostat = require('aerostat');

var _aerostat2 = _interopRequireDefault(_aerostat);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _instagramIndex = require('./instagram/index');

/**
 *
 */
var Fetcher = function Fetcher() {
  return {
    onSuccess: function onSuccess(res) {
      var igfetcher = (0, _instagramIndex.fetcher)();
      var user = igfetcher.parse(res.response.response.data);
      var stats = igfetcher.getUserCounts(user);

      if (stats) {
        var igcollector = (0, _instagramIndex.collector)();
        var preparedStats = igcollector.prepare(user.id, (0, _moment2['default'])().unix(), stats);
        igcollector.store(preparedStats).then(console.log, console.log);
      }
    }
  };
};

var jobConsumer = _aerostat2['default'].consumer('message-name');
_aerostat2['default'].init().start();

_aerostat2['default'].config.baseUrl = 'https://api.instagram.com/v1';
_aerostat2['default'].config.delay = 120000;

_aerostat2['default'].producer('message-name', {
  url: '/users/13460080?access_token=557596280.1677ed0.e0748a013d3f4ed9825612be0d8cceef'
}).create();

jobConsumer.onSuccess(Fetcher().onSuccess);
jobConsumer.consume(jobConsumer.callback);