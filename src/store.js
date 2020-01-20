import { createStore } from "redux";
import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getUsersCompleted":
      return { ...state, users: action.payload };
    case "getQuestionsCompleted":
      return { ...state, questions: action.payload };
    case "saveQuestionAnswerCompleted":
      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUser.id]: {
            ...state.users[state.currentUser.id],
            answers: {
              ...state.users[state.currentUser.id].answers,
              [action.payload.questionId]: action.payload.option
            }
          }
        },
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
                state.currentUser.id
              ]
            }
          }
        }
      };
    case "saveQuestionCompleted":
      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUser.id]: {
            ...state.users[state.currentUser.id],
            questions: [
              ...state.users[state.currentUser.id].questions,
              action.payload.id
            ]
          }
        },
        questions: {
          ...state.questions,
          [action.payload.id]: action.payload
        }
      };

    case "login":
      return {
        ...state,
        currentUser: action.payload
      };
    case "logout":
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default createStore(rootReducer);
