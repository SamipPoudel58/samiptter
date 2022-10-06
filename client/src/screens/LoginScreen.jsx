import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FullLogo from "../components/FullLogo";
import Head from "../components/Head";
import { ReactComponent as Rocket } from "../assets/rocket.svg";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, true));
  };
  return (
    <section className="authScreen">
      <Head title="Sign In" />
      <div className="authScreen__content">
        <FullLogo />
        <div className="authScreen__formContainer">
          <h2 className="heading-md">Sign In</h2>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="form__group mt-3">
              <label className="form__label mb-1">Email Address</label>
              <input
                className="form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__group mt-3">
              <label className="form__label mb-1">Password</label>
              <input
                className="form__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="form__submitBtn mt-3" type="submit">
              Sign In
            </button>

            <p className="mt-2 form__question">
              Don't have an account ?{" "}
              <Link className="minor-link" to="/register">
                Sign Up
              </Link>
            </p>
            <div className="separator">OR</div>

            <button
              onClick={guestLoginHandler}
              className="form__submitBtn form__submitBtn-guest"
            >
              Continue as a Guest
            </button>
          </form>
        </div>
      </div>
      <div className="authScreen__decor">
        <div className="authScreen__background">
          <h3 className="authScreen__intro">Let Your Social Life Take Off</h3>
          <Rocket className="authScreen__rocket" />
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
