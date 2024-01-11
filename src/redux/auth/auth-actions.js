import { createAction } from '@reduxjs/toolkit';

export const signupRequest = createAction('auth/signupRequest');
export const signupSuccess = createAction('auth/signupSuccess');
export const signupError = createAction('auth/signupError');

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginError = createAction('auth/loginError');

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');
export const logoutError = createAction('auth/logoutError');

export const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
export const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
export const getCurrentUserError = createAction('auth/getCurrentUserError');

export const clearError = createAction('auth/clearError');
export const noToken = createAction('auth/noToken');

export const getUserByGoogleAuthRequest = createAction(
  'auth/getUserByGoogleAuthRequest',
);
export const getUserByGoogleAuthSuccess = createAction(
  'auth/getUserByGoogleAuthSuccess',
);
export const getUserByGoogleAuthError = createAction(
  'auth/getUserByGoogleAuthError',
);
