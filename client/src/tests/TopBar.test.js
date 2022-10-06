import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useHistory } from "react-router-dom";
import TopBar from "../components/TopBar";

const MockTopBar = ({ title }) => {
  const history = useHistory();
  return (
    <BrowserRouter>
      <TopBar title={title} />
    </BrowserRouter>
  );
};

describe("TopBar", () => {
  it("should render same text passed into title prop", () => {
    render(<MockTopBar title="Profile" />);
    const headingElement = screen.getByText(/profile/i);
    expect(headingElement).toBeInTheDocument();
  });
});
