import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Poll from "./Poll";
import AppProvider from "../AppProvider";
import { vote } from "../redux/actions";

//GOALS: make sure <Poll/> is
//1) rendering the current question
//2) saving the user input

jest.mock("../redux/actions", () => ({ vote: jest.fn() }));

const ourRender = jsx => render(<AppProvider>{jsx}</AppProvider>);

describe("Poll", () => {
  it("should render the currentQuestion", () => {
    const { queryByText } = ourRender(
      <Poll
        currentQuestion={{
          id: "a",
          answer: null,
          optionOne: {
            text: "have horrible short term memory"
          },
          optionTwo: {
            text: "have horrible long term memory"
          }
        }}
      />
    );
    const firstOption = queryByText(/have horrible short term memory/i);
    expect(firstOption).toBeInTheDocument();
  });
  it("should save the user input for option1", () => {
    const { getByText } = ourRender(
      <Poll
        currentQuestion={{
          id: "c",
          answer: null,
          optionOne: {
            text: "be telekinetic"
          },
          optionTwo: {
            text: "be telepathic"
          }
        }}
      />
    );
    const clickQuestion = getByText(/be telekinetic/i);
    fireEvent.click(clickQuestion);
    expect(vote).toHaveBeenCalledWith("c", "optionOne");
  });
  it("should save the user input for option2", () => {
    const { getByText } = ourRender(
      <Poll
        currentQuestion={{
          id: "c",
          answer: null,
          optionOne: {
            text: "be telekinetic"
          },
          optionTwo: {
            text: "be telepathic"
          }
        }}
      />
    );
    const clickQuestion = getByText(/be telepathic/i);
    fireEvent.click(clickQuestion);
    expect(vote).toHaveBeenCalledWith("c", "optionTwo");
  });
});
