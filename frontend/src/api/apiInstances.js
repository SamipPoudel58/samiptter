import axios from 'axios';
import getRefreshToken from './getRefreshToken';
import store from '../store';
import { TOKEN_REFRESH_SUCCESS } from '../constants/userConstants';

const devInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const apiInstance =
  process.env.NODE_ENV === 'development' ? devInstance : axios.create();

const axiosPrivate = apiInstance;
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const data = await getRefreshToken();
      store.dispatch({ type: TOKEN_REFRESH_SUCCESS, payload: data });
      prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate };
