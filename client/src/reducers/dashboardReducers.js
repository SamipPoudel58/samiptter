import {
  GET_DASHBOARD_FAIL,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
} from '../constants/dashboardConstants';

export const getDashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_DASHBOARD_SUCCESS:
      return {
        loading: false,
        success: true,
        userCount: action.payload.userCount,
        tweetCount: action.payload.tweetCount,
        latestUsers: action.payload.latestUsers,
      };
    case GET_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
