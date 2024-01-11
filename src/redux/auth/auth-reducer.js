import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

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
  clearError,
  noToken,
  getUserByGoogleAuthSuccess,
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [logoutError]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload.user,
  [getUserByGoogleAuthSuccess]: (_, { payload }) => payload.user,
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
  [getUserByGoogleAuthSuccess]: (_, { payload }) => payload.token,
});

const isAuthorized = createReducer(false, {
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [getUserByGoogleAuthSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
  [logoutRequest]: () => false,
});

const isSignup = createReducer(false, {
  [signupSuccess]: () => true,
});

const isLoading = createReducer(false, {
  [signupRequest]: () => true,
  [signupSuccess]: () => false,
  [signupError]: () => false,

  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,

  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,

  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

const isLoadingUser = createReducer(true, {
  [noToken]: () => false,

  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
  [getCurrentUserRequest]: () => true,
});

const setError = (_, { payload }) => payload;

const errorSignup = createReducer(null, {
  [signupError]: setError,
  [signupRequest]: () => null,
  [clearError]: () => null,
});

const errorLogin = createReducer(null, {
  [loginError]: setError,
  [loginRequest]: () => null,
  [clearError]: () => null,
});

const error = createReducer(null, {
  [logoutError]: setError,
  [logoutRequest]: () => null,
  [getCurrentUserError]: setError,
  [getCurrentUserRequest]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  isSignup,
  isLoading,
  error,
  errorSignup,
  errorLogin,
  isLoadingUser,
});
