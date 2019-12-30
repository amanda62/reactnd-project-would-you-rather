import { createStore } from "redux";
import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "vote":
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: {
            ...state.questions[action.payload.questionId],
            answer: [action.payload.option]
          }
        }
      };
    default:
      return state;
  }
};

export default createStore(rootReducer);
