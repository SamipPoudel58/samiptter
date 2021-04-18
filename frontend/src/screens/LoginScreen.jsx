import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Header from "../components/Header";

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
  return (
    <>
      <Header />
      <FormContainer>
        <h1 className="mt-3">Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="info">
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
