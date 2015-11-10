import Aerostat from 'aerostat';
import moment from 'moment';
import {fetcher, collector} from './worker';

/**
 *
 */
const Fetcher = () => ({
  onSuccess: (res) => {
    const igfetcher = fetcher();
    const user = igfetcher.parse(res.response.response.data);
    const stats = igfetcher.getUserCounts(user);

    if(stats) {
      const igcollector = collector();
      const preparedStats = igcollector.prepare(user.id, moment().unix(), stats);
      igcollector.store(preparedStats).then(console.log, console.log);
    }
  }
});

export const instagramSubscriber = () => {
  const jobName = 'instagram';
  const jobConsumer = Aerostat.consumer(jobName);

  Aerostat.producer(jobName, {
    url: 'https://api.instagram.com/v1/users/13460080?access_token=557596280.1677ed0.e0748a013d3f4ed9825612be0d8cceef'
  }).create();

  jobConsumer.onSuccess(Fetcher().onSuccess);
  jobConsumer.consume(jobConsumer.callback);
};
