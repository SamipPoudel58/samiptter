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
  getProfileReducer,
  getRecommendedUsersReducer,
  toggleVerifyReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { uiThemeReducer } from "./reducers/uiReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addFriend: addFriendReducer,
  getRecommendedUsers: getRecommendedUsersReducer,
  tweetList: tweetListReducer,
  tweetDetails: tweetDetailsReducer,
  tweetCreate: tweetCreateReducer,
  tweetDelete: tweetDeleteReducer,
  commentCreate: commentCreateReducer,
  commentDelete: commentDeleteReducer,
  userProfile: getProfileReducer,
  editProfile: editProfileReducer,
  uiTheme: uiThemeReducer,
  toggleVerify: toggleVerifyReducer,
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
