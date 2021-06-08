import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
// import TweetScreen from "./screens/TweetScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import SearchScreen from "./screens/SearchScreen";

function App() {
  return (
    <Router>
      <main>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/" component={HomeScreen} exact />
        {/* <Container>
        <Route path="/profile/:id?" component={ProfileScreen} />
          <Route path="/search" component={SearchScreen} />
          <Route path="/tweets/:id" component={TweetScreen} />
        </Container> */}
      </main>
    </Router>
  );
}

export default App;
