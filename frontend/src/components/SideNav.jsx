import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import ProfileInfo from "./ProfileInfo";
// import { LinkContainer } from "react-router-bootstrap";
// import { Row, Col, Image, Nav } from "react-bootstrap";
// import TweetComposer from "./TweetComposer";

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
      <nav className="sideNav__nav">
        <h1 className="logo-text mb-4">Samiptter</h1>
        <ul className="sideNav__navlinks">
          <NavLink
            to="/"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-home mr-1"></i> Home
            </li>
          </NavLink>
          <NavLink
            to="/search"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-search mr-1"></i> Search
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-user mr-1"></i> Profile
            </li>
          </NavLink>
        </ul>
        <div className="sideNav__profileInfo">
          <ProfileInfo />
        </div>
      </nav>
    </section>
    // <section className="sideNav">
    //   {backDrop && (
    //     <>
    //       <div className="backdrop" onClick={() => setBackDrop(false)}></div>
    //       <TweetComposer setBackDrop={setBackDrop} buttonText="Tweet" />
    //     </>
    //   )}
    //   <h1 className="primary my-font logo">Samiptter</h1>
    //   <nav className="sideNav__nav">
    //     <LinkContainer className="sideNav__navlink" to="/">
    //       <Nav.Link>
    //         <i className="fas fa-home"></i>
    //         <span>Home</span>
    //       </Nav.Link>
    //     </LinkContainer>
    //     <LinkContainer className="sideNav__navlink" to="/search">
    //       <Nav.Link>
    //         <i className="fas fa-search"></i>
    //         <span>Search</span>
    //       </Nav.Link>
    //     </LinkContainer>
    //     <LinkContainer className="sideNav__navlink" to="/profile">
    //       <Nav.Link>
    //         <i className="fas fa-user"></i>
    //         <span>Profile</span>
    //       </Nav.Link>
    //     </LinkContainer>
    //     <button onClick={() => setBackDrop(true)} className="sideNav__cta">
    //       Tweet
    //     </button>
    //     <button
    //       onClick={() => setBackDrop(true)}
    //       className="sideNav__cta sideNav__cta-responsive"
    //     >
    //       <i className="fas fa-feather-alt"></i>
    //     </button>
    //   </nav>
    //   {userInfo && (
    //     <Row
    //       onClick={() => setPopUp((prevValue) => !prevValue)}
    //       className="mt-auto profileRow"
    //     >
    //       <Col className="pr-0 profileRow__col">
    //         <Image
    //           className="pr-0 profilePic"
    //           src={userInfo.image}
    //           alt={userInfo.name}
    //           fluid
    //         />
    //       </Col>
    //       <Col md={10}>
    //         <Row>
    //           <strong className="mt-1 font-weight-bold text-primary font-f-os">
    //             {userInfo.name}
    //           </strong>
    //         </Row>
    //         <Row>
    //           <span className="loggedInText">Logged In</span>
    //         </Row>
    //       </Col>
    //       {popUp && (
    //         <div className="profileRow__popup">
    //           <p onClick={() => logOutHandler()} className="profileRow__logout">
    //             Log Out
    //           </p>
    //         </div>
    //       )}
    //     </Row>
    //   )}
    // </section>
  );
};

export default SideNav;
