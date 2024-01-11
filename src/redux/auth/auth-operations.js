import axios from 'axios';
import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  noToken,
  getUserByGoogleAuthRequest,
  getUserByGoogleAuthSuccess,
  getUserByGoogleAuthError,
} from './auth-actions';

axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.defaults.baseURL = 'https://project-planning-rest-api.herokuapp.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

const signup = payload => async dispatch => {
  dispatch(signupRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/signup', payload);

    dispatch(signupSuccess(data));

    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

const login = payload => async dispatch => {
  dispatch(loginRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/login', payload);

    dispatch(loginSuccess(data));
    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logout = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.post(`/users/logout`);

    dispatch(logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    dispatch(noToken());
    return;
  }

  token.set(persistedToken);
  dispatch(getCurrentUserRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/users/current');
    dispatch(getCurrentUserSuccess(data));

    return data;
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

const getUserByGoogleAuth = () => async dispatch => {
  dispatch(getUserByGoogleAuthRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/users/google-user');
    dispatch(getUserByGoogleAuthSuccess(data));

    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(getUserByGoogleAuthError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  signup,
  login,
  logout,
  getCurrentUser,
  getUserByGoogleAuth,
};
