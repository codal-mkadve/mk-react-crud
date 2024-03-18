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
  BULK_CREATE_USERS_FAILURE
} from "../constants/actionTypes";


const initialState = {
  userDetail: null,
  usersList: [],
  error: null,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, usersList: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: [...state.users, action.payload],
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      console.log("action.payload", action.payload);
      return { ...state, loading: false, userDetail: action.payload };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userDetail: null,
      };
    case BULK_CREATE_USERS_REQUEST:
      return { ...state, loading: true };
    case BULK_CREATE_USERS_SUCCESS:
      return { ...state, loading: false };
    case BULK_CREATE_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
