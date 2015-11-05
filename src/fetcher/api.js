import restify from 'restify';
import {stats} from './instagram/index';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/stats', function (req, res, next) {

  stats().get(10).then((stats) => {
    res.send(stats);
  });

  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
