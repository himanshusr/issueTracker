import {
  ADD_ISSUE,
  GET_ISSUES,
  ISSUE_ERROR,
  DELETE_ISSUE,
  UPDATE_ISSUE,
} from '../actions/types';

const initialState = {
  issues: [],
  loading: true,
  error: {},
};

const issue = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ISSUES:
      return {
        ...state,
        issues: payload,
        loading: false,
      };
    case ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, payload],
        loading: false,
      };
    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter((issue) => issue._id !== payload),
      };
    case UPDATE_ISSUE:
      return {
        ...state,
        issues: state.issues.map((issue) => {
          if (issue._id === payload._id) {
            return {
              ...issue,
              ...payload,
            };
          } else {
            return {
              ...issue,
            };
          }
        }),
      };
    case ISSUE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default issue;
