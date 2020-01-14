import { createStore } from "redux";
import initialState from "./initialState";
import uuid from "uuid/v4";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "vote":
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: {
            ...state.questions[action.payload.questionId],
            [action.payload.option]: {
              ...state.questions[action.payload.questionId][
                action.payload.option
              ],
              votes: [
                ...state.questions[action.payload.questionId][
                  action.payload.option
                ].votes,
                state.currentUser.user
              ]
            }
          }
        }
      };
    case "createNewQuestion":
      const id = uuid();
      return {
        ...state,
        questions: {
          ...state.questions,
          [id]: {
            id,
            timestamp: new Date().getTime(),
            author: state.currentUser.user,
            optionOne: {
              votes: [],
              text: action.payload.optionOne
            },
            optionTwo: {
              votes: [],
              text: action.payload.optionTwo
            }
          }
        }
      };

    case "login":
      return {
        ...state,
        currentUser: action.payload.currentUser
      };
    case "logout":
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default createStore(rootReducer);
