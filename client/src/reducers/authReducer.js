import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from '../actions/types';

const getInitialState = () => {
  const token = localStorage.getItem('eec-token');
  const user = JSON.parse(localStorage.getItem('eec-user'));
  if (token) {
    return {
      isAuthenticated: true,
      token,
      user,
      isLoading: false,
    };
  }
  return {
    isAuthenticated: false,
    token: '',
    user: null,
    isLoading: false,
  };
};

export default function(state = getInitialState(), action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('eec-token', action.payload.token);
      localStorage.setItem('eec-user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('eec-token');
      localStorage.removeItem('eec-user');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
