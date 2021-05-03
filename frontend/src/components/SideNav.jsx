import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Image, Nav } from "react-bootstrap";
import "../styles/sideNav.scss";
import { logout } from "../actions/userActions";
import TweetComposer from "./TweetComposer";
import { useHistory } from "react-router-dom";

const SideNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [backDrop, setBackDrop] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <section className="sideNav">
      {backDrop && (
        <>
          <div className="backdrop" onClick={() => setBackDrop(false)}></div>
          <TweetComposer setBackDrop={setBackDrop} buttonText="Tweet" />
        </>
      )}
      <h1 className="primary my-font logo">Samiptter</h1>
      <nav className="sideNav__nav">
        <LinkContainer className="sideNav__navlink" to="/">
          <Nav.Link>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer className="sideNav__navlink" to="/search">
          <Nav.Link>
            <i className="fas fa-search"></i>
            <span>Search</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer className="sideNav__navlink" to="/profile">
          <Nav.Link>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Nav.Link>
        </LinkContainer>
        <button onClick={() => setBackDrop(true)} className="sideNav__cta">
          Tweet
        </button>
        <button
          onClick={() => setBackDrop(true)}
          className="sideNav__cta sideNav__cta-responsive"
        >
          <i className="fas fa-feather-alt"></i>
        </button>
      </nav>
      {userInfo && (
        <Row
          onClick={() => setPopUp((prevValue) => !prevValue)}
          className="mt-auto profileRow"
        >
          <Col className="pr-0 profileRow__col">
            <Image
              className="pr-0 profilePic"
              src={userInfo.image}
              alt={userInfo.name}
              fluid
            />
          </Col>
          <Col md={10}>
            <Row>
              <strong className="mt-1 font-weight-bold text-primary font-f-os">
                {userInfo.name}
              </strong>
            </Row>
            <Row>
              <span className="loggedInText">Logged In</span>
            </Row>
          </Col>
          {popUp && (
            <div className="profileRow__popup">
              <p onClick={() => logOutHandler()} className="profileRow__logout">
                Log Out
              </p>
            </div>
          )}
        </Row>
      )}
    </section>
  );
};

export default SideNav;
