'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _aerostat = require('aerostat');

var _aerostat2 = _interopRequireDefault(_aerostat);

var _instagramIndex = require('./instagram/index');

var _bitcoinIndex = require('./bitcoin/index');

//starting web interface
_aerostat2['default'].init().start();
_aerostat2['default'].config.delay = 1200;

(0, _instagramIndex.instagramSubscriber)();
(0, _bitcoinIndex.bitcoinSubscriber)();