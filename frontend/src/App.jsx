import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TweetScreen from './screens/TweetScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileEditScreen from './screens/ProfileEditScreen';
import DashboardScreen from './screens/DashboardScreen';
import PageNotFound from './screens/404-page';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationScreen from './screens/NotificationScreen';
import { getUnreadNotifications, refreshToken } from './actions/userActions';
import { ReactComponent as Logo } from './assets/logo.svg';
import EmailConfrimationScreen from './screens/EmailConfirmationScreen';

function App() {
  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  const userLogin = useSelector((state) => state.userLogin);
  const { tokenLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    const fetchNotifications = () => {
      dispatch(getUnreadNotifications());
    };

    if (userInfo && userInfo.accessToken) {
      fetchNotifications();
      // fetch notifications every 3 minutes
      intervalId = setInterval(fetchNotifications, 300000);
    } else {
      dispatch(refreshToken());
    }

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

  return (
    <Router>
      <main className={`${darkMode ? 'dark' : ''}`}>
        <div className="mainContainer">
          {!tokenLoading ? (
            <Switch>
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route
                exact
                path="/confirmation/:token"
                component={EmailConfrimationScreen}
              />
              <AdminRoute exact path="/dashboard" component={DashboardScreen} />
              <ProtectedRoute
                exact
                path="/profile-edit"
                component={ProfileEditScreen}
              />
              <ProtectedRoute path="/tweets/:id" component={TweetScreen} />
              <ProtectedRoute path="/profile/:id?" component={ProfileScreen} />
              <ProtectedRoute
                exact
                path="/notifications"
                component={NotificationScreen}
              />
              <ProtectedRoute exact path="/search" component={SearchScreen} />
              <ProtectedRoute exact path="/" component={HomeScreen} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          ) : (
            <div className="token-loading">
              <Logo className="token-loading-logo" />
            </div>
          )}
        </div>
      </main>
    </Router>
  );
}

export default App;
