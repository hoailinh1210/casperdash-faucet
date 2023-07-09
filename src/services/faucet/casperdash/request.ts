import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const casperDashRequest = axios.create({
  baseURL: 'https://testnet-api.casperdash.io',
  timeout: 100 * 1000,
  paramsSerializer: {
    serialize: (params: Record<string, unknown>) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

casperDashRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      alert(message);
    }

    return Promise.reject(error);
  }
);

export default casperDashRequest;
