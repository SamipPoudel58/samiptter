import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile-edit" component={ProfileEditScreen} exact />
          <Route path="/tweets/:id" component={TweetScreen} />
          <Route path="/profile/:id?" component={ProfileScreen} />
          <Route path="/search" component={SearchScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route component={PageNotFound} />
        </div>
      </main>
    </Router>
  );
}

export default App;
