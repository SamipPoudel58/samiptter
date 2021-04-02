import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const TweetScreen = ({ match }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>1 of 3</Col>
          <Col className="newsFeed" md={7}>
            <Tweet tweet={tweet} />
          </Col>
          <Col>3 of 3</Col>
        </Row>
      )}
    </>
  );
};

export default TweetScreen;
