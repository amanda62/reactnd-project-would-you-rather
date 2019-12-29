import { createStore } from "redux";

const rootReducer = (state = "app", action) => {
  return state;
};

const store = createStore(rootReducer);

export default store;
