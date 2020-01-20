import store from "../store";

export const getUsersCompleted = users =>
  store.dispatch({ type: "getUsersCompleted", payload: users });

export const getQuestionsCompleted = questions =>
  store.dispatch({ type: "getQuestionsCompleted", payload: questions });

export const saveQuestionAnswerCompleted = questionAnswer =>
  store.dispatch({
    type: "saveQuestionAnswerCompleted",
    payload: questionAnswer
  });

export const saveQuestionCompleted = newQuestion =>
  store.dispatch({
    type: "saveQuestionCompleted",
    payload: newQuestion
  });

export const login = currentUser =>
  store.dispatch({ type: "login", payload: currentUser });

export const logout = () => store.dispatch({ type: "logout" });
