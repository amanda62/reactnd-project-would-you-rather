import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PollDetail from "./PollDetail";
import AppProvider from "../AppProvider";
import { vote } from "../redux/actions";
import { useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

//GOALS: make sure <PollDetail/> is
//1) rendering the current question
//2) saving the user input

jest.mock("../redux/actions", () => ({ vote: jest.fn() }));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
  useRouteMatch: jest.fn()
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const ourRender = jsx => render(<AppProvider>{jsx}</AppProvider>);

describe("PollDetail", () => {
  it("should render the currentQuestion", () => {
    useParams.mockReturnValueOnce({ questionId: "a" });
    useRouteMatch.mockReturnValueOnce({ url: "/questions/a" });
    useSelector.mockReturnValueOnce({
      id: "a",
      answer: null,
      optionOne: {
        text: "have horrible short term memory"
      },
      optionTwo: {
        text: "have horrible long term memory"
      }
    });

    const { queryByText } = ourRender(<PollDetail />);
    const firstOption = queryByText(/have horrible short term memory/i);
    expect(firstOption).toBeInTheDocument();
  });
  it("should save the user input for option1", () => {
    useParams.mockReturnValueOnce({ questionId: "c" });
    useRouteMatch.mockReturnValueOnce({ url: "/questions/c" });
    useSelector.mockReturnValueOnce({
      id: "c",
      answer: null,
      optionOne: {
        text: "be telekinetic"
      },
      optionTwo: {
        text: "be telepathic"
      }
    });

    const { getByText } = ourRender(<PollDetail />);
    const clickQuestion = getByText(/be telekinetic/i);
    fireEvent.click(clickQuestion);
    expect(vote).toHaveBeenCalledWith("c", "optionOne");
  });
  it("should save the user input for option2", () => {
    useParams.mockReturnValueOnce({ questionId: "c" });
    useRouteMatch.mockReturnValueOnce({ url: "/questions/c" });
    useSelector.mockReturnValueOnce({
      id: "c",
      answer: null,
      optionOne: {
        text: "be telekinetic"
      },
      optionTwo: {
        text: "be telepathic"
      }
    });

    const { getByText } = ourRender(<PollDetail />);
    const clickQuestion = getByText(/be telepathic/i);
    fireEvent.click(clickQuestion);
    expect(vote).toHaveBeenCalledWith("c", "optionTwo");
  });
});
