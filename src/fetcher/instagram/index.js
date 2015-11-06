import InstagramModel from './schema';
import Q from 'q';

/**
 *
 */
export const fetcher = () => ({
  parse: (response) => {
    if(response.meta.code !== 200) {
      return false;
    }

    return response.data;
  },

  getUserCounts: (user) => {
    return user.counts || false;
  }
});

/**
 *
 */
export const collector = () => ({
  validate: (stats) => {

  },

  prepare: (user, time, stats) => {
    return {
      user: user,
      time: time,
      stats: stats
    };
  },

  store: (stats) => {
    return Q.ninvoke(InstagramModel, 'findOneAndUpdate', { time: stats.time }, stats, { upsert: true, new: true });
  }
});

export const stats = () => ({
  get: (limit) => {
    return InstagramModel.find({}).limit(limit).select({ time: 1, stats: 1 }).exec();
  },

  getRecent: (limit) => {
    return InstagramModel.find({}).limit(limit).select({ time: 1, stats: 1 }).sort('-time').exec();
  },
});
