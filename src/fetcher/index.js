import Aerostat from 'aerostat';
import {instagramSubscriber} from './instagram/index';
import {bitcoinSubscriber} from './bitcoin/index';

//starting web interface
Aerostat.init().start();
Aerostat.config.delay = 1200;

instagramSubscriber();
bitcoinSubscriber();
