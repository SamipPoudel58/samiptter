import React from "react";
import { render, screen } from "@testing-library/react";
import TweetComposer from "../components/TweetComposer";
import { Provider, useDispatch } from "react-redux";
import store from "../store";

const MockTweetComposer = ({ buttonText }) => {
  //   const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <TweetComposer buttonText={buttonText} />
    </Provider>
  );
};

describe("TopBar", () => {
  it("should render the button with given text", () => {
    render(<MockTweetComposer buttonText="Post" />);
    const buttonElement = screen.getByRole("button", { name: /post/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
