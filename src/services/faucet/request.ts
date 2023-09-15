import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const faucetRequest = axios.create({
  baseURL: 'http://localhost:4003/v1',
  timeout: 100 * 1000,
  paramsSerializer: {
    serialize: (params: Record<string, unknown>) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

faucetRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default faucetRequest;
