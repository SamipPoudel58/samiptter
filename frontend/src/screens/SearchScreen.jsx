import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BackButton from "../components/BackButton";
import SideNav from "../components/SideNav";
import "../styles/searchScreen.scss";

const SearchScreen = ({ match, history }) => {
  return (
    <Row>
      <Col>
        <SideNav />
      </Col>
      <Col className="newsFeed" md={7}>
        <Row className="p-3 u-line d-flex align-items-center">
          <BackButton />
          <form className="searchScreen__searchbar ml-3">
            <i className="fas fa-search"></i>
            <input className="searchScreen__searchbar-input" type="search" />
          </form>
        </Row>
      </Col>
      <Col>3 of 3</Col>
    </Row>
  );
};

export default SearchScreen;
