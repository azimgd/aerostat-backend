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
    return data.amount || false;
  },

  getBitcoinCurrency: (data) => {
    return data.currency || false;
  }
});

/**
 *
 */
export const collector = () => ({
  validate: (stats) => {

  },

  prepare: (price, currency, time) => {
    return {
      price: price,
      currency: currency,
      time: time
    };
  },

  store: (data) => {
    return Q.ninvoke(BitcoinModel, 'findOneAndUpdate', { time: data.price }, data, { upsert: true, new: true });
  }
});

export const data = () => ({
  get: (limit) => {
    return BitcoinModel.find({}).limit(limit).select({ time: 1, stats: 1 }).exec();
  },

  getRecent: (limit) => {
    return BitcoinModel.find({}).limit(limit).select({ time: 1, stats: 1 }).sort('-time').exec();
  },
});
