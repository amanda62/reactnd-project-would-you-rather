import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import AppProvider from "./AppProvider";

jest.mock("./initialState", () => ({
  questions: {
    a: {
      id: "a",
      answer: "optionTwo",
      optionOne: {
        text: "have horrible short term memory"
      },
      optionTwo: {
        text: "have horrible long term memory"
      }
    },
    b: {
      id: "b",
      answer: null,
      optionOne: {
        text: "become a superhero"
      },
      optionTwo: {
        text: "become a supervillain"
      }
    },
    c: {
      id: "c",
      answer: null,
      optionOne: {
        text: "be telekinetic"
      },
      optionTwo: {
        text: "be telepathic"
      }
    }
  }
}));

const ourRender = jsx => render(<AppProvider>{jsx}</AppProvider>);

describe("App", () => {
  it("should skip answered polls", () => {
    const { queryByText } = ourRender(<App />);
    const firstOption = queryByText(/have horrible short term memory/i);
    expect(firstOption).toBeNull();
  });
  it("should show the first un-answered poll", () => {
    const { getByText } = ourRender(<App />);
    const firstOption = getByText(/become a superhero/i);
    expect(firstOption).toBeInTheDocument();
  });
  it("should show the next un-answered poll once the first is submitted", () => {
    const { getByText } = ourRender(<App />);
    const clickQuestion = getByText(/become a superhero/i);
    fireEvent.click(clickQuestion);
    const firstOption = getByText(/be telekinetic/i);
    expect(firstOption).toBeInTheDocument();
  });
  it("should show a message when all polls have been answered", () => {
    const { getByText } = ourRender(<App />);
    const clickQuestion2 = getByText(/be telekinetic/i);
    fireEvent.click(clickQuestion2);
    const firstOption = getByText(/ALL QUESTIONS DONE-ZO!/i);
    expect(firstOption).toBeInTheDocument();
  });
});
