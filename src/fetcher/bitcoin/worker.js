import BitcoinModel from './schema';
import Q from 'q';

/**
 *
 */
export const fetcher = () => ({
  parse: (response) => {
    if(response.errors !== undefined) {
      return false;
    }

    return response.data;
  },

  getBitcoinPrice: (data) => {
    if(!data) {
      return false;
    }

    return {
      amount: data.amount,
      currency: data.currency
    }
  },
});

/**
 *
 */
export const collector = () => ({
  validate: (stats) => {

  },

  prepare: (price, time) => {
    return {
      price: price,
      time: time
    };
  },

  store: (data) => {
    return Q.ninvoke(BitcoinModel, 'findOneAndUpdate', { time: data.time }, data, { upsert: true, new: true });
  }
});

export const stats = () => ({
  get: (limit) => {
    return BitcoinModel.find({}).limit(limit).select({ time: 1, stats: 1 }).exec();
  },

  getRecent: (limit) => {
    return BitcoinModel.find({}).limit(limit).select({ time: 1, stats: 1 }).sort('-time').exec();
  },
});
