import axiosPrivate from '../api/axiosPrivate';
import {
  GET_DASHBOARD_FAIL,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
} from '../constants/dashboardConstants';

export const getDashboard = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DASHBOARD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axiosPrivate.get('/api/dashboard', config);

    dispatch({
      type: GET_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
