import { SET_SEARCH_INPUT_VALUE } from '../actions/Actions';

const initialState = {
    searchInput: {
      searchInputValue: "",
    },
    // ...
  };
  

  const searchInputReducer = (state = initialState.searchInput, action) => {
    switch (action.type) {
      case SET_SEARCH_INPUT_VALUE:
        return {
          ...state,
          searchInputValue: action.payload,
        };
      default:
        return state;
    }
  };
  

export default searchInputReducer;
