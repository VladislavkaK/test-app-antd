import axios from 'axios';
import Qs from 'qs';

const API = axios.create({
  baseURL: `${window.location.origin}/opendata`,
});

API.interceptors.request.use(
  async (config: any) => {
    /* eslint-disable no-param-reassign */
    config.paramsSerializer = (params: any) => {
      return Qs.stringify(params, {
        allowDots: true,
        arrayFormat: 'repeat',
      });
    };
    /* eslint-enable no-param-reassign */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { API };
