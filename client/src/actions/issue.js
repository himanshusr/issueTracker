import axios from 'axios';
import {
  GET_ISSUES,
  DELETE_ISSUE,
  ADD_ISSUE,
  ISSUE_ERROR,
  UPDATE_ISSUE,
} from './types';

//get Issues

export const getIssues = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/issue');
    dispatch({
      type: GET_ISSUES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ISSUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add an Issue
export const addIssue = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/issue', formData, config);

    dispatch({
      type: ADD_ISSUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ISSUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update an Issue
export const updateIssue = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/issue/${id}`, formData, config);

    dispatch({
      type: UPDATE_ISSUE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ISSUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete an Issue
export const deleteIssue = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/issue/${id}`);

    dispatch({
      type: DELETE_ISSUE,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: ISSUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
