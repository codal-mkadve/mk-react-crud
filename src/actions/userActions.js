import http from "../Services/http-service";
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  BULK_CREATE_USERS_REQUEST,
  BULK_CREATE_USERS_SUCCESS,
  BULK_CREATE_USERS_FAILURE,
} from "../constants/actionTypes";


export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await http.post("/users", userData); // Use the http instance
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILURE, payload: error.response });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await http.put(`/users/${userId}`, userData); // Use the http instance
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.response });
  }
};

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await http.get("/users");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.response });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    await http.delete(`/users/${userId}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.response });
  }
};

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await http.get(`/users/${userId}`);
    // console.log('response',response);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    return response;
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, payload: error.response });
  }
};

export const bulkCreateUsers = (users) => async (dispatch) => {
  dispatch({ type: BULK_CREATE_USERS_REQUEST });
  try {
    console.log('users',users);
    const response = await http.post(`/users/bulk-create`,users);
    dispatch({ type: BULK_CREATE_USERS_SUCCESS, payload: response.data });
    // Fetch users list again to refresh the data
    dispatch(fetchUsers());
  } catch (error) {
    dispatch({ type: BULK_CREATE_USERS_FAILURE, payload: error.toString() });
  }
};
