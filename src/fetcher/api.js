import restify from 'restify';
import {stats as instagramStats} from './instagram/worker';
import {stats as bitcoinStats} from './bitcoin/worker';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/stats/instagram', function (req, res, next) {
  const count = req.params['count'] ? parseInt(req.params['count']) : 20;

  instagramStats().getRecent(count).then((stats) => {
    res.send(stats);
  });

  return next();
});


server.get('/stats/bitcoin', function (req, res, next) {
  const count = req.params['count'] ? parseInt(req.params['count']) : 20;

  bitcoinStats().getRecent(count).then((stats) => {
    res.send(stats);
  });

  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
