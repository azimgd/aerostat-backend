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
      var btcfetcher = (0, _worker.fetcher)();
      var data = btcfetcher.parse(res.response.response.data);
      var price = btcfetcher.getBitcoinPrice(data);

      if (price) {
        var btccollector = (0, _worker.collector)();
        var preparedData = btccollector.prepare(price, (0, _moment2['default'])().unix());
        btccollector.store(preparedData).then(console.log, console.log);
      }
    }
  };
};

var bitcoinSubscriber = function bitcoinSubscriber() {
  var jobName = 'bitcoin';
  var jobConsumer = _aerostat2['default'].consumer(jobName);

  _aerostat2['default'].producer(jobName, {
    url: 'https://api.coinbase.com/v2/prices/buy?currency=USD'
  }).create();

  jobConsumer.onSuccess(Fetcher().onSuccess);
  jobConsumer.consume(jobConsumer.callback);
};
exports.bitcoinSubscriber = bitcoinSubscriber;