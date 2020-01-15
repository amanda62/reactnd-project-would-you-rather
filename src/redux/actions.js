import store from "../store";

export const setUsers = users =>
  store.dispatch({ type: "setUsers", payload: users });

export const setQuestions = questions =>
  store.dispatch({ type: "setQuestions", payload: questions });

export const vote = (questionId, option) =>
  store.dispatch({
    type: "vote",
    payload: {
      questionId,
      option
    }
  });

export const createNewQuestion = newQuestion =>
  store.dispatch({
    type: "createNewQuestion",
    payload: newQuestion
  });

export const login = currentUser =>
  store.dispatch({ type: "login", payload: { currentUser } });

export const logout = () => store.dispatch({ type: "logout" });
