import store from "../store";

export const vote = (questionId, option) => {
  store.dispatch({
    type: "vote",
    payload: {
      questionId,
      option
    }
  });
};

export const createNewQuestion = newQuestion => {
  store.dispatch({
    type: "createNewQuestion",
    payload: {
      newQuestion
    }
  });
};
