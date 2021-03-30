import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Form, Button, Row, Col } from "react-bootstrap";
import { createTweet } from "../actions/tweetActions";

const TweetComposer = () => {
  const [tweet, setTweet] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTweet({ tweetContent: tweet }));
    // console.log(tweet);
  };
  return (
    <Row className="py-3 tweetComposer">
      <Col className="pr-0">
        {userInfo && (
          <Image
            className="pr-0 profilePic"
            src={userInfo.image}
            alt={userInfo.name}
            fluid
          />
        )}
      </Col>
      <Col className="pl-0 mr-3" md={10}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="tweet">
            {/* <Form.Label>What's happening?</Form.Label> */}
            <Form.Control
              className="px-0 tweetForm"
              placeholder="What's happening?"
              as="textarea"
              type="text"
              rows="auto"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </Form.Group>

          <Button className="tweetBtn px-5" type="submit" variant="info">
            Tweet
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default TweetComposer;
