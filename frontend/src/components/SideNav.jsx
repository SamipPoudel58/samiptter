import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
// import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Image, Nav } from "react-bootstrap";
import "../styles/sideNav.scss";
import TweetComposer from "./TweetComposer";

const SideNav = () => {
  const [backDrop, setBackDrop] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <section className="sideNav">
      {backDrop && (
        <>
          <div className="backdrop" onClick={() => setBackDrop(false)}></div>
          <TweetComposer
            onClick={(e) => e.stopPropagation()}
            setBackDrop={setBackDrop}
            buttonText="Tweet"
          />
        </>
      )}
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
      </nav>
      {userInfo.image && (
        <Row className="mt-auto profileRow">
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
        </Row>
      )}
    </section>
  );
};

export default SideNav;
