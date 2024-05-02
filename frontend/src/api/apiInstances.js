import axios from 'axios';
import getRefreshToken from './getRefreshToken';
import store from '../store';
import { TOKEN_REFRESH_SUCCESS } from '../constants/userConstants';

const devInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const apiInstance =
  process.env.NODE_ENV === 'development' ? devInstance : axios.create();

const axiosPrivate = axios.create(apiInstance.defaults);
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      const isTokenRefreshRequest = prevRequest.url.endsWith('refresh_token'); // Assuming your refresh token request URL ends with 'refreshToken'
      console.log(prevRequest.url);
      if (isTokenRefreshRequest) {
        // If the 401 is from invalid access token, attempt to refresh the access token
        prevRequest.sent = true;
        const data = await getRefreshToken();
        store.dispatch({ type: TOKEN_REFRESH_SUCCESS, payload: data });
        prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosPrivate(prevRequest);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, apiInstance };
