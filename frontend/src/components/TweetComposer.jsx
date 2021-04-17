import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Form, Button, Row, Col } from "react-bootstrap";
import { createComment, createTweet } from "../actions/tweetActions";

const TweetComposer = ({ buttonText, tweet, setBackDrop }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonText === "Comment") {
      return dispatch(createComment(tweet._id, { commentContent: text }));
    }
    dispatch(createTweet({ tweetContent: text }));
    if (setBackDrop) {
      setBackDrop(false);
    }
  };
  return (
    <Row className="py-3 tweetComposer">
      <Col className="pr-0 picture-col">
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
            <Form.Control
              className="px-0 tweetForm"
              placeholder={
                buttonText === "Comment"
                  ? "Write a comment..."
                  : "What's happening?"
              }
              as="textarea"
              type="text"
              rows="auto"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Button className="tweetBtn px-5" type="submit" variant="info">
            {buttonText}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default TweetComposer;
