'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _instagramWorker = require('./instagram/worker');

var _bitcoinWorker = require('./bitcoin/worker');

var server = _restify2['default'].createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(_restify2['default'].acceptParser(server.acceptable));
server.use(_restify2['default'].queryParser());
server.use(_restify2['default'].bodyParser());

server.get('/stats/instagram', function (req, res, next) {
  var count = req.params['count'] ? parseInt(req.params['count']) : 20;

  (0, _instagramWorker.instagramStats)().getRecent(count).then(function (stats) {
    res.send(stats);
  });

  return next();
});

server.get('/stats/bitcoin', function (req, res, next) {
  var count = req.params['count'] ? parseInt(req.params['count']) : 20;

  (0, _bitcoinWorker.bitcoinStats)().getRecent(count).then(function (stats) {
    res.send(stats);
  });

  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});