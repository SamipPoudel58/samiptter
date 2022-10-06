import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

function App() {
  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  return (
    <Router>
      <main className={`${darkMode ? 'dark' : ''}`}>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
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
        </div>
      </main>
    </Router>
  );
}

export default App;
