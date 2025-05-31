export const initialState = {
  comments: [],
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, comments: action.payload };
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((_, idx) => idx !== action.payload),
      };
    default:
      return state;
  }
};
