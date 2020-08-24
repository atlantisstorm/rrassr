import {
  LOADING,  
  SET_ENTRIES
} from "./types";

export default(state, action) => {
  switch(action.type) {
    case LOADING: {
      return { ...state, loading: true };
    }
    case SET_ENTRIES: {
      const payload = action.payload;

      return { ...state, loading: false, entries: payload.entries, pathname: payload.pathname };
    }
    default: return state;
  }
};