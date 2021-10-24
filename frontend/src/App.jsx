import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import TweetScreen from "./screens/TweetScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PageNotFound from "./screens/404-page";

function App() {
  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  return (
    <Router>
      <main className={`${darkMode ? "dark" : ""}`}>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/dashboard" component={DashboardScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/profile-edit" component={ProfileEditScreen} />
            <Route path="/tweets/:id" component={TweetScreen} />
            <Route path="/profile/:id?" component={ProfileScreen} />
            <Route exact path="/search" component={SearchScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
