import { 
  LOADING,
  SET_ENTRIES 
} from './types';

export const setEntries = (data) => {
  return {
    type: SET_ENTRIES,
    payload: data
  }  
}

export const setLoading = () => {
  return {
    type: LOADING
  }  
}