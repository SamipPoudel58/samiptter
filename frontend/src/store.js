import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  commentCreateReducer,
  commentDeleteReducer,
  tweetCreateReducer,
  tweetDeleteReducer,
  tweetDetailsReducer,
  tweetListReducer,
} from "./reducers/tweetReducers";
import {
  addFriendReducer,
  editProfileReducer,
  getNotificationsReducer,
  getProfileReducer,
  getRecommendedUsersReducer,
  getUnreadNotificationsReducer,
  toggleVerifyReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { previewReducer, uiThemeReducer } from "./reducers/uiReducer";
import { getDashboardReducer } from "./reducers/dashboardReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addFriend: addFriendReducer,
  getRecommendedUsers: getRecommendedUsersReducer,
  tweetList: tweetListReducer,
  userList: userListReducer,
  tweetDetails: tweetDetailsReducer,
  tweetCreate: tweetCreateReducer,
  tweetDelete: tweetDeleteReducer,
  commentCreate: commentCreateReducer,
  commentDelete: commentDeleteReducer,
  userProfile: getProfileReducer,
  editProfile: editProfileReducer,
  uiTheme: uiThemeReducer,
  preview: previewReducer,
  toggleVerify: toggleVerifyReducer,
  getDashboard: getDashboardReducer,
  getNotif: getNotificationsReducer,
  getUnreadNotif: getUnreadNotificationsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const darkMode = localStorage.getItem("darkModeOn")
  ? JSON.parse(localStorage.getItem("darkModeOn"))
  : false;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  uiTheme: { darkMode: darkMode },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
