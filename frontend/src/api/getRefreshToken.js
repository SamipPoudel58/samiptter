import { TOKEN_REFRESH_FAIL } from '../constants/userConstants';
import store from '../store';
import { apiInstance } from './apiInstances';

const getRefreshToken = async () => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await apiInstance.post(
      '/api/users/refresh_token',
      { refreshToken: true },
      config
    );

    return data;
  } catch (error) {
    store.dispatch({
      type: TOKEN_REFRESH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export default getRefreshToken;
