import axios from 'axios';
import getRefreshToken from './getRefreshToken';
import store from '../store';
import { TOKEN_REFRESH_SUCCESS } from '../constants/userConstants';

const axiosPrivate = axios.create();

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

export default axiosPrivate;
