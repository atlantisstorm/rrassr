import { createStore } from "redux";
import reducer from "./reducer";

export const DEFAULT_STATE = {
  loading: false,
  pathname: "",
  entries: []
};

export const makeStore = (initialState) => {
  return createStore(reducer, initialState);
}