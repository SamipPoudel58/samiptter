import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ReactComponent as Rocket } from "../assets/rocket.svg";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

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
    if (password.length < 6) {
      setMessage("Password should be at least 6 characters.");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <section className="authScreen">
      <div className="authScreen__content">
        <h1 className="logo-text">Samiptter</h1>
        <div className="authScreen__formContainer">
          <h2 className="heading-md">Create an account</h2>
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="form__group mt-3">
              <label className="form__label mb-1">Full Name</label>
              <input
                className="form__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Create Account
            </button>
            <p className="mt-1 form__question">
              Already have an account ?{" "}
              <Link className="minor-link" to="/login">
                Sign In
              </Link>
            </p>
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

export default RegisterScreen;
