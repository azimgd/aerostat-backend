import Aerostat from 'aerostat';
import moment from 'moment';
import {fetcher, collector} from './worker';

/**
 *
 */
const Fetcher = () => ({
  onSuccess: (res) => {
    const btcfetcher = fetcher();
    const data = btcfetcher.parse(res.response.response.data);
    const price = btcfetcher.getBitcoinPrice(data);

    if(price) {
      const btccollector = collector();
      const preparedData = btccollector.prepare(price, moment().unix());
      btccollector.store(preparedData).then(console.log, console.log);
    }
  }
});

export const bitcoinSubscriber = (Aerostat) => {
  const jobName = 'bitcoin';
  const jobConsumer = Aerostat.consumer(jobName);

  Aerostat.config.baseUrl = 'https://api.coinbase.com/v2';
  Aerostat.config.delay = 120000;

  Aerostat.producer(jobName, {
    url: '/prices/buy?currency=USD'
  }).create();

  jobConsumer.onSuccess(Fetcher().onSuccess);
  jobConsumer.consume(jobConsumer.callback);
};
