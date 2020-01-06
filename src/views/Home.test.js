import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import AppProvider from "../AppProvider";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/*
should display all unanswered questions (and not show answered polls)
which should link to poll detail page
when all questions are answered, display message
*/

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => {
  const push = jest.fn();

  return {
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({ push })
  };
});

const ourRender = jsx => render(<AppProvider>{jsx}</AppProvider>);

const questions = {
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
};

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should skip answered polls", () => {
    useSelector.mockReturnValueOnce(questions);
    const { queryByText } = ourRender(<Home />);
    const firstOption = queryByText(/have horrible short term memory/i);
    expect(firstOption).toBeNull();
  });
  it("should show every un-answered poll", () => {
    useSelector.mockReturnValueOnce(questions);
    const { getByText } = ourRender(<Home />);
    const question1 = getByText(/become a superhero/i);
    const question2 = getByText(/be telekinetic/i);
    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();
  });
  it("should take user to pollDetail page when card is clicked", () => {
    useSelector.mockReturnValueOnce(questions);
    const { getByText } = ourRender(<Home />);
    const card = getByText(/be telekinetic/i);
    fireEvent.click(card);
    const { push } = useHistory();
    expect(push).toHaveBeenCalledWith("/questions/c");
  });
  it("should show a message when all polls have been answered", () => {
    useSelector.mockReturnValueOnce({});
    const { getByText } = ourRender(<Home />);
    const doneText = getByText(/ALL QUESTIONS DONE-ZO!/i);
    expect(doneText).toBeInTheDocument();
  });
});
