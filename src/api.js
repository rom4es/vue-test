import axios from 'axios';
import mocks from '@/mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
const getPayments = (process.env.NODE_ENV === 'development') ? mocks : (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
});

export default {
  instance,
  getPayments,
};
